/**
 * Email delivery helper — Nodemailer + Gmail SMTP.
 *
 * Production wiring: set the env vars below in `.env.local` (or in
 * Vercel Project Settings → Environment Variables).
 *
 *   SMTP_HOST          smtp.gmail.com
 *   SMTP_PORT          465
 *   SMTP_USER          your.address@gmail.com
 *   SMTP_PASS          a 16-char Gmail App Password (NOT your password)
 *   CONTACT_FROM_EMAIL same value as SMTP_USER (Gmail requires this)
 *   CONTACT_TO_EMAIL   where submissions land (usually = SMTP_USER)
 *
 * NEVER commit real credentials. SMTP_PASS must be a Gmail App
 * Password, not your account password — enable 2-Step Verification
 * first, then create one at https://myaccount.google.com/apppasswords.
 *
 * If env vars are missing we fall back to a safe dev log so the form
 * still works in previews without leaking the message body.
 */
import nodemailer from "nodemailer";

interface SendContactEmailArgs {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
}

let cachedTransport: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter | null {
  if (cachedTransport) return cachedTransport;

  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // No credentials configured → caller falls back to dev log.
  if (!host || !portRaw || !user || !pass) return null;

  const port = Number(portRaw);
  if (!Number.isFinite(port) || port <= 0) return null;

  cachedTransport = nodemailer.createTransport({
    host,
    port,
    // 465 → implicit TLS; 587 → STARTTLS upgrade.
    secure: port === 465,
    auth: { user, pass },
    // Tight timeouts so a stuck SMTP server never wedges the request.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return cachedTransport;
}

export async function sendContactEmail(
  args: SendContactEmailArgs,
): Promise<{ delivered: boolean }> {
  const transport = getTransport();

  // Dev / preview fallback: no SMTP credentials configured.
  if (!transport) {
    if (process.env.NODE_ENV !== "production") {
      // Do NOT log the full message body even in dev — only metadata.
      console.log(
        `[contact] (dev fallback — no SMTP env) would send to ${args.to} from ${args.from} replyTo=${args.replyTo} subject="${args.subject}"`,
      );
    }
    return { delivered: false };
  }

  // Gmail requires the From address to match the authenticated account.
  // If CONTACT_FROM_EMAIL differs from SMTP_USER we override it to the
  // authenticated address and move the requested from into the Reply-To
  // so the recruiter can still reply to the visitor.
  const authUser = process.env.SMTP_USER;
  const fromHeader = authUser ? `Portfolio Contact <${authUser}>` : args.from;
  const replyToHeader = `${args.replyTo}`;

  const info = await transport.sendMail({
    from: fromHeader,
    to: args.to,
    replyTo: replyToHeader,
    subject: args.subject,
    text: args.text,
    // Lightweight HTML mirror so the message reads cleanly in Gmail.
    html: [
      `<div style="font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.5;color:#101016">`,
      `<p><strong>New portfolio enquiry.</strong></p>`,
      `<pre style="white-space:pre-wrap;font-family:inherit;background:#F6F1E8;border:1px solid #E8DEC8;padding:12px;border-radius:8px">${escapeHtml(args.text)}</pre>`,
      `<p style="color:#6b6b6b;font-size:12px">Reply directly to this email to respond to the sender at ${escapeHtml(args.replyTo)}.</p>`,
      `</div>`,
    ].join(""),
  });

  return { delivered: Boolean(info.messageId) };
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

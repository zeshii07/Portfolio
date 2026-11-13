import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { contactSchema } from "@/lib/portfolio/validation";
import { rateLimit } from "@/lib/portfolio/rate-limit";
import { sendContactEmail } from "@/lib/portfolio/email";

export const dynamic = "force-dynamic";

function getClientIp(headersList: Headers): string {
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return headersList.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const headersList = await headers();
  const ip = getClientIp(headersList);

  // Rate limit
  const rl = rateLimit(`contact:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)),
        },
      },
    );
  }

  // Parse JSON body safely
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Validate against schema (this also enforces the honeypot field)
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    // Return a single, safe error message plus per-field details for UX.
    const firstError =
      Object.values(fieldErrors).flat()[0] ?? "Please check the form and try again.";
    return NextResponse.json(
      { ok: false, error: firstError, fields: fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: if `company` is non-empty, silently succeed to confuse bots
  // without revealing that they were caught.
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST;

  if (!toEmail || !fromEmail) {
    // Server misconfiguration. Do not leak the specifics to the client.
    console.error("[contact] Missing CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL env vars.");
    return NextResponse.json(
      { ok: false, error: "Could not deliver your message right now. Please email me directly." },
      { status: 503 },
    );
  }

  if (!smtpHost || !smtpUser || !smtpPass) {
    if (process.env.NODE_ENV === "production") {
      // SMTP not configured in production — email will not be delivered.
      // Log loudly so the deployer notices; return a graceful error so
      // the visitor is not told "sent" when nothing was sent.
      console.error(
        "[contact] SMTP env vars missing (SMTP_HOST/SMTP_USER/SMTP_PASS). Email will not be delivered.",
      );
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email delivery is not configured on the server yet. Please email me directly at the address shown on this page.",
        },
        { status: 503 },
      );
    }
    // In dev/preview, fall through so the email helper's safe dev log
    // path runs and the form flow can be exercised end-to-end.
  }

  try {
    await sendContactEmail({
      to: toEmail,
      from: fromEmail,
      replyTo: data.email,
      subject: `[Portfolio] ${data.subject}`,
      text: [
        `New enquiry from ${data.name} <${data.email}>`,
        `Type: ${data.enquiryType}`,
        "",
        data.message,
      ].join("\n"),
    });

    return NextResponse.json(
      { ok: true, message: "Thanks — your message was received. I'll reply by email." },
      { status: 200 },
    );
  } catch (err) {
    // Log operational error without leaking personal message content.
    console.error("[contact] sendContactEmail failed:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong while sending your message. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405 },
  );
}

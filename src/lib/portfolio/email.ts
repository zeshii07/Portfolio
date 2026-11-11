/**
 * Email delivery helper.
 *
 * In production, swap the no-op logger for a real transactional email
 * provider call (e.g. Resend, Postmark, SendGrid) using the configured
 * environment variables. The signature here matches what such a call
 * would look like so the API route does not need to change.
 */

interface SendContactEmailArgs {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
}

export async function sendContactEmail(args: SendContactEmailArgs): Promise<{ delivered: boolean }> {
  const apiKey = process.env.EMAIL_API_KEY;
  const provider = process.env.EMAIL_PROVIDER;

  // When no provider is configured, we log the message safely so the
  // contact flow still works in development and in previews. This MUST
  // be replaced with a real provider call in production.
  if (!apiKey || !provider) {
    if (process.env.NODE_ENV !== "production") {
      // Avoid logging the full message body in any persistent log even in dev.
      console.log(
        `[contact] (dev fallback) email would be sent to ${args.to} from ${args.from} replyTo=${args.replyTo} subject="${args.subject}"`,
      );
    }
    return { delivered: false };
  }

  // Example integration shape (Resend-style). Implement the actual call
  // for your chosen provider when wiring production email.
  //
  // const res = await fetch("https://api.resend.com/emails", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${apiKey}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     from: args.from,
  //     to: args.to,
  //     reply_to: args.replyTo,
  //     subject: args.subject,
  //     text: args.text,
  //   }),
  // });
  // return { delivered: res.ok };

  // Placeholder until provider wiring is added.
  return { delivered: false };
}

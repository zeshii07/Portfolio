import { z } from "zod";

/**
 * Shared contact form schema.
 * Used both client-side (for UX) and server-side (as the source of truth).
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(80, { message: "Name is too long." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." })
    .max(120, { message: "Email is too long." }),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters." })
    .max(120, { message: "Subject is too long." }),
  message: z
    .string()
    .min(10, { message: "Please tell me a bit more — at least 10 characters." })
    .max(2000, { message: "Message is too long (max 2000 characters)." }),
  /** Honeypot field. Must be empty for a real submission. */
  company: z
    .string()
    .max(0, { message: "Spam detected." })
    .optional()
    .or(z.literal("")),
  /** Optional context */
  enquiryType: z
    .enum(["general", "role", "freelance", "support"])
    .optional()
    .default("general"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const enquiryTypeLabels: Record<ContactInput["enquiryType"], string> = {
  general: "General enquiry",
  role: "Job / role opportunity",
  freelance: "Freelance project",
  support: "Support / question",
};

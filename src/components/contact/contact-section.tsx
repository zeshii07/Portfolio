"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Container } from "@/components/ui-portfolio/container";
import { SectionHeading } from "@/components/ui-portfolio/section-heading";
import { PortfolioCard } from "@/components/ui-portfolio/card";
import { PortfolioButton } from "@/components/ui-portfolio/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SocialLinks } from "@/components/ui-portfolio/social-links";
import { contactSchema, enquiryTypeLabels, type ContactInput } from "@/lib/portfolio/validation";
import { socialLinks, contactInfo } from "@/data/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      company: "",
      enquiryType: "general",
    },
  });

  const enquiryType = useWatch({ control, name: "enquiryType" });

  const onSubmit = async (values: ContactInput) => {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string; message?: string };
      if (res.ok && data.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setServerError(
          data.error ?? "Something went wrong. Please try again or email me directly.",
        );
      }
    } catch {
      setStatus("error");
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch"
          description="Tell me what you're building, the role you're hiring for, or the question you have. I read every message."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: contact info */}
          <aside className="flex flex-col gap-4 lg:col-span-4">
            <PortfolioCard className="flex flex-col gap-3">
              <span className="font-mono-token text-[11px] uppercase tracking-wide text-secondary">
                Direct
              </span>
              <a
                href={`mailto:${contactInfo.email}`}
                className="font-display text-base font-semibold text-foreground hover:text-primary"
              >
                {contactInfo.email}
              </a>
              <p className="text-sm text-secondary">{contactInfo.location}</p>
            </PortfolioCard>

            <PortfolioCard className="flex flex-col gap-3">
              <span className="font-mono-token text-[11px] uppercase tracking-wide text-secondary">
                Elsewhere
              </span>
              <SocialLinks
                links={socialLinks}
                className="flex items-center gap-2"
                iconClassName="size-4"
              />
              <ul className="mt-1 flex flex-col gap-1 text-sm text-secondary">
                {socialLinks.map((s) => (
                  <li key={s.label} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent-secondary" aria-hidden />
                    {s.label}
                  </li>
                ))}
              </ul>
            </PortfolioCard>

            <PrivacyNotice />
          </aside>

          {/* Right: form */}
          <div className="lg:col-span-8">
            <PortfolioCard className="p-6 sm:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5"
                aria-label="Contact form"
              >
                {/* Honeypot — visually hidden, ignored by humans, tempting for bots */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="company-field">Company (leave empty)</label>
                  <input
                    id="company-field"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("company")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Name" htmlFor="name" error={errors.name?.message}>
                    <Input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name)}
                      className={cn(
                        "h-11 border-token bg-surface text-foreground placeholder:text-secondary",
                        errors.name && "border-[#F16B75]",
                      )}
                      {...register("name")}
                    />
                  </Field>

                  <Field label="Email" htmlFor="email" error={errors.email?.message}>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      className={cn(
                        "h-11 border-token bg-surface text-foreground placeholder:text-secondary",
                        errors.email && "border-[#F16B75]",
                      )}
                      {...register("email")}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Subject" htmlFor="subject" error={errors.subject?.message}>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="A short subject"
                      aria-invalid={Boolean(errors.subject)}
                      className={cn(
                        "h-11 border-token bg-surface text-foreground placeholder:text-secondary",
                        errors.subject && "border-[#F16B75]",
                      )}
                      {...register("subject")}
                    />
                  </Field>

                  <Field
                    label="Enquiry type"
                    htmlFor="enquiryType"
                    error={undefined}
                  >
                    <Select
                      value={enquiryType}
                      onValueChange={(v) =>
                        setValue("enquiryType", v as ContactInput["enquiryType"], {
                          shouldValidate: false,
                        })
                      }
                    >
                      <SelectTrigger
                        id="enquiryType"
                        className="h-11 border-token bg-surface text-foreground"
                        aria-label="Enquiry type"
                      >
                        <SelectValue placeholder="Choose a type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(enquiryTypeLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                <Field label="Message" htmlFor="message" error={errors.message?.message}>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Tell me what you're building, the role, or the question you have."
                    aria-invalid={Boolean(errors.message)}
                    className={cn(
                      "min-h-32 border-token bg-surface text-foreground placeholder:text-secondary",
                      errors.message && "border-[#F16B75]",
                    )}
                    {...register("message")}
                  />
                </Field>

                {/* Submit + status */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-secondary">
                    By submitting, you agree to the privacy notice on the left. No spam, ever.
                  </p>
                  <PortfolioButton
                    type="submit"
                    size="lg"
                    variant="primary"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send aria-hidden />
                        Send message
                      </>
                    )}
                  </PortfolioButton>
                </div>

                {/* Success state */}
                {status === "success" ? (
                  <div
                    role="status"
                    className="flex items-start gap-3 rounded-xl border border-[#35C98A]/40 bg-[#35C98A]/10 px-4 py-3 text-sm text-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 text-[#35C98A]" aria-hidden />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold">Message sent.</span>
                      <span className="text-secondary">
                        Thanks — I&apos;ll reply by email as soon as I can.
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* Error state */}
                {status === "error" && serverError ? (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-[#F16B75]/40 bg-[#F16B75]/10 px-4 py-3 text-sm text-foreground"
                  >
                    <AlertCircle className="mt-0.5 size-4 text-[#F16B75]" aria-hidden />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold">Could not send.</span>
                      <span className="text-secondary">{serverError}</span>
                    </div>
                  </div>
                ) : null}
              </form>
            </PortfolioCard>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      {children}
      {error ? (
        <span
          className="font-mono-token text-[11px] text-[#F16B75]"
          role="alert"
        >
          {error}
        </span>
      ) : null}
    </div>
  );
}

function PrivacyNotice() {
  return (
    <PortfolioCard id="privacy" className="flex flex-col gap-2 border-dashed">
      <span className="font-mono-token text-[11px] uppercase tracking-wide text-accent-secondary">
        Privacy notice
      </span>
      <p className="text-sm leading-relaxed text-secondary">
        The contact form collects your name, email, subject, and message so I can
        reply to your enquiry. Submissions are sent to my professional inbox and used
        only to respond to you. I do not sell or share your details. Email me directly
        if you prefer not to use the form.
      </p>
    </PortfolioCard>
  );
}

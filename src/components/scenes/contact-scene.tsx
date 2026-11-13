"use client";

import * as React from "react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { contactSchema, enquiryTypeLabels, type ContactInput } from "@/lib/portfolio/validation";
import { socialLinks, contactInfo, person } from "@/data/site";
import { Eyebrow } from "@/components/studio/eyebrow";
import { SectionNumber } from "@/components/studio/section-number";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { AmbientGlow } from "@/components/visuals/ambient-glow";
import { NoiseOverlay } from "@/components/visuals/noise-overlay";
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
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactScene() {
  const reduce = useReducedMotion();
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
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setServerError(
          data.error ?? "Something went wrong. Please email me directly.",
        );
      }
    } catch {
      setStatus("error");
      setServerError("Network error. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative isolate overflow-hidden bg-violet text-white"
    >
      <AmbientGlow variant="ultramarine" className="right-[-15%] top-[-20%] h-[520px] w-[520px] opacity-70" />
      <AmbientGlow variant="volt" className="bottom-[-15%] left-[5%] h-[260px] w-[260px] opacity-40" />
      <NoiseOverlay opacity={0.06} />

      {/* Animated background ring */}
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 80, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute right-[10%] top-[20%] hidden size-[440px] rounded-full border border-white/10 lg:block"
      >
        <div className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-volt" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8 lg:py-10">
        {/* Header */}
        <div className="mb-5 flex items-end justify-between gap-6">
          <Eyebrow color="volt">Contact</Eyebrow>
          <SectionNumber value="09" outline={false} className="text-white/30" />
        </div>

        {/* Giant CTA heading */}
        <SplitText
          as="h2"
          text="Have something worth building?"
          className="font-display text-[clamp(2rem,6vw,4rem)] font-bold leading-tight text-white text-balance"
          from="bottom"
          stagger={0.06}
        />

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-12">
          {/* Left: oversized email + social */}
          <div className="lg:col-span-5">
            <Reveal direction="up">
              <p className="text-base leading-relaxed text-white/85">
                Share the problem, your timeline, and any constraints. I&apos;ll
                reply with a short scope and a clear yes or no.
              </p>
            </Reveal>

            <Reveal delay={0.15} direction="up" className="mt-8">
              <a
                href={`mailto:${contactInfo.email}`}
                className="group block"
              >
                <span className="block font-mono-token text-[11px] uppercase tracking-[0.22em] text-white/60">
                  Email
                </span>
                <span className="mt-1 block font-display text-2xl font-semibold text-white underline decoration-volt decoration-2 underline-offset-4 transition-transform group-hover:translate-x-1 sm:text-3xl">
                  {contactInfo.email}
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.25} direction="up" className="mt-10">
              <span className="font-mono-token text-[11px] uppercase tracking-[0.22em] text-white/60">
                Elsewhere
              </span>
              <ul className="mt-3 flex flex-col gap-2">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.icon === "email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border-b border-white/15 py-3 transition-colors hover:border-volt"
                    >
                      <span className="font-display text-lg font-semibold text-white transition-transform group-hover:translate-x-1 sm:text-xl">
                        {s.label}
                      </span>
                      <ArrowUpRight className="size-5 text-white/60 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-volt" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.35} direction="up" className="mt-10">
              <MagneticButton
                as="a"
                href={`mailto:${contactInfo.email}`}
                strength={0.25}
                className="group inline-flex items-center gap-3 rounded-full bg-volt px-6 py-4 font-mono-token text-xs font-semibold uppercase tracking-[0.18em] text-ink"
              >
                Start a conversation
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </MagneticButton>
            </Reveal>
          </div>

          {/* Right: form on bone panel */}
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={0.2}>
              <div className="rounded-2xl border border-white/10 bg-bone p-6 text-ink sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-display text-lg font-semibold text-ink">
                    Send a message
                  </span>
                  <span className="font-mono-token text-[10px] uppercase tracking-[0.22em] text-ink/50">
                    /form
                  </span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5" aria-label="Contact form">
                  {/* honeypot */}
                  <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="company-field">Company (leave empty)</label>
                    <input id="company-field" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
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
                          "h-11 border-ink/15 bg-paper text-ink placeholder:text-ink/40",
                          errors.name && "border-tangerine",
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
                          "h-11 border-ink/15 bg-paper text-ink placeholder:text-ink/40",
                          errors.email && "border-tangerine",
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
                          "h-11 border-ink/15 bg-paper text-ink placeholder:text-ink/40",
                          errors.subject && "border-tangerine",
                        )}
                        {...register("subject")}
                      />
                    </Field>

                    <Field label="Enquiry type" htmlFor="enquiryType" error={undefined}>
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
                          className="h-11 border-ink/15 bg-paper text-ink"
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
                        "min-h-32 border-ink/15 bg-paper text-ink placeholder:text-ink/40",
                        errors.message && "border-tangerine",
                      )}
                      {...register("message")}
                    />
                  </Field>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-ink/60">
                      By submitting, you agree to the privacy notice. No spam, ever.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-mono-token text-xs font-semibold uppercase tracking-[0.18em] text-bone transition-transform hover:-translate-y-0.5 disabled:opacity-50"
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
                    </button>
                  </div>

                  <AnimatePresence>
                    {status === "success" ? (
                      <motion.div
                        role="status"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-3 rounded-xl border border-aqua/40 bg-aqua/15 px-4 py-3 text-sm text-ink"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 text-aqua" aria-hidden />
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold">Message sent.</span>
                          <span className="text-ink/70">
                            Thanks — I&apos;ll reply by email as soon as I can.
                          </span>
                        </div>
                      </motion.div>
                    ) : null}

                    {status === "error" && serverError ? (
                      <motion.div
                        role="alert"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-3 rounded-xl border border-tangerine/40 bg-tangerine/15 px-4 py-3 text-sm text-ink"
                      >
                        <AlertCircle className="mt-0.5 size-4 text-tangerine" aria-hidden />
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold">Could not send.</span>
                          <span className="text-ink/70">{serverError}</span>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </form>

                <p id="privacy" className="mt-6 border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink/60">
                  <span className="font-mono-token uppercase tracking-[0.18em] text-ink/50">
                    Privacy ·{" "}
                  </span>
                  The form collects your name, email, subject, and message. Submissions
                  are sent via Gmail SMTP to my inbox at {contactInfo.email} and used
                  solely to reply to your enquiry. I do not sell or share your details
                  with third parties. Email me directly if you prefer not to use the form.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
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
      <Label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
      </Label>
      {children}
      {error ? (
        <span className="font-mono-token text-[11px] text-tangerine" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

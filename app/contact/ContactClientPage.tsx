"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Github, Linkedin, Send, Twitter } from "lucide-react";

import { siteConfig } from "@/data/config";

type FieldName = "name" | "email" | "message";
type FormErrors = Partial<Record<FieldName, string>>;

const contactMethods = [
  {
    icon: Github,
    title: "GitHub",
    value: "utsavjosh1",
    href: siteConfig.githubUrl,
    external: true,
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "utsavjosh1",
    href: siteConfig.linkedinUrl,
    external: true,
  },
  {
    icon: Twitter,
    title: "X / Twitter",
    value: "@utsavjosh1",
    href: siteConfig.twitterUrl,
    external: true,
  },
];

export default function ContactClientPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as keyof typeof formData;
    setFormData((current) => ({ ...current, [field]: event.target.value }));
    if (field !== "company" && errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    setFormError("");
  };

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name) nextErrors.name = "Enter your name.";
    if (!email) nextErrors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Enter a valid email address.";
    if (!message) nextErrors.message = "Enter a message.";
    else if (message.length < 10)
      nextErrors.message = "Use at least 10 characters.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);
    setFormError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setFormError(
          result?.message ||
            "Your message could not be sent. Please try again.",
        );
        return;
      }

      setIsSubmitted(true);
    } catch {
      setFormError(
        "Your message could not be sent. Check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main
        id="main-content"
        className="flex min-h-screen items-center justify-center p-6 pt-24"
      >
        <div className="max-w-sm space-y-6 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-accent/20 bg-[var(--accent-dim)] text-accent">
            <Check className="size-8" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl text-[var(--text)]">
            Message sent
          </h1>
          <p className="text-[var(--text-2)]">
            Thank you for reaching out. I&apos;ll get back to you soon.
          </p>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-full border border-strong bg-surface px-5 py-2 text-sm hover:border-accent hover:text-accent"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen pb-20 pt-28">
      <div className="mx-auto max-w-2xl px-6 md:px-8">
        <div className="space-y-12">
          <div className="space-y-8">
            <header className="space-y-4">
              <p className="section-label">Contact</p>
              <h1 className="font-display text-4xl text-[var(--text)] md:text-5xl">
                Let&apos;s build something{" "}
                <span className="italic text-accent">useful.</span>
              </h1>
              <p className="max-w-[48ch] text-sm leading-relaxed text-[var(--text-2)]">
                Contact me about software engineering roles, backend
                architecture, full-stack applications, or project
                collaborations.
              </p>
            </header>

            <div className="grid gap-3 sm:grid-cols-3">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Link
                    key={method.title}
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className="group flex min-h-16 items-center gap-4 rounded-xl border border-[var(--border)] bg-surface p-4 hover:border-accent/30"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-3)] text-[var(--text-2)] group-hover:text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-2)]">
                        {method.title}
                      </span>
                      <span className="block truncate text-sm text-[var(--text)]">
                        {method.value}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-surface p-6 shadow-lg md:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="form-label">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="form-control"
                  />
                  {errors.name && (
                    <p id="name-error" className="form-error">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    maxLength={254}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="form-control"
                  />
                  {errors.email && (
                    <p id="email-error" className="form-error">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div
                className="absolute -left-[10000px] h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="company">Company website</label>
                <input
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="form-label">
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={10}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  minLength={10}
                  maxLength={2000}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className="form-control resize-none"
                />
                {errors.message && (
                  <p id="message-error" className="form-error">
                    {errors.message}
                  </p>
                )}
              </div>

              {formError && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300"
                >
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-black hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending…" : "Send message"}
                {!isSubmitting && (
                  <Send className="size-4" aria-hidden="true" />
                )}
              </button>
              <p aria-live="polite" className="sr-only">
                {isSubmitting ? "Sending your message" : ""}
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

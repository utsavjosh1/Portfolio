"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Check,
  Mail,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/config";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Github,
    title: "GitHub",
    value: "utsavjosh1",
    href: siteConfig.githubUrl,
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "utsavjosh1",
    href: siteConfig.linkedinUrl,
  },
  {
    icon: Twitter,
    title: "Twitter",
    value: "utsavjosh1",
    href: siteConfig.twitterUrl,
  },
];

export default function ContactClientPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message too short (min 10 chars)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg)]">
        <div className="text-center space-y-6 max-w-sm animate-fade-up">
          <div className="w-16 h-16 bg-[var(--accent-dim)] text-accent rounded-full flex items-center justify-center mx-auto border border-accent/20">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-display text-[var(--text)]">
            Message Sent
          </h1>
          <p className="text-[var(--text-2)] font-body font-light">
            Thank you for reaching out. I&apos;ll get back to you soon.
          </p>
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--bg)]">
      <div className="page-container max-w-5xl">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          {/* Left: Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <RevealWrapper>
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--text-3)] hover:text-accent transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back
                </button>
              </RevealWrapper>

              <RevealWrapper delay={100}>
                <SectionLabel label="Contact" />
                <h1 className="text-4xl md:text-5xl font-display text-[var(--text)] mt-4">
                  Let&apos;s build the{" "}
                  <span className="italic text-accent">extraordinary.</span>
                </h1>
              </RevealWrapper>
            </div>

            <div className="grid gap-6">
              {contactMethods.map((method, i) => {
                const Icon = method.icon;
                return (
                  <RevealWrapper key={method.title} delay={200 + i * 50}>
                    <Link
                      href={method.href}
                      target="_blank"
                      className="group flex items-center gap-4 p-5 rounded-2xl bg-surface border border-[var(--border)] transition-all hover:border-accent/30 hover:-translate-y-1"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[var(--bg-3)] flex items-center justify-center text-[var(--text-3)] group-hover:text-accent transition-colors border border-[var(--border)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-3)] mb-0.5">
                          {method.title}
                        </p>
                        <p className="text-sm font-body text-[var(--text-2)] group-hover:text-[var(--text)] transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </Link>
                  </RevealWrapper>
                );
              })}
            </div>
          </div>

          {/* Right: Form */}
          <RevealWrapper delay={400}>
            <div className="bg-surface border border-[var(--border)] rounded-3xl p-8 md:p-10 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-3)] ml-1">
                      Your Name
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className={`w-full bg-[var(--bg-3)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-accent transition-colors ${
                        errors.name ? "border-red-500/50" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-400 mt-1 ml-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-3)] ml-1">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      className={`w-full bg-[var(--bg-3)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-accent transition-colors ${
                        errors.email ? "border-red-500/50" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-400 mt-1 ml-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-3)] ml-1">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    className={`w-full bg-[var(--bg-3)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-accent transition-colors resize-none ${
                      errors.message ? "border-red-500/50" : ""
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[10px] text-red-400 mt-1 ml-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  className="w-full h-14 rounded-xl text-base font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending Message..."
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </div>
  );
}

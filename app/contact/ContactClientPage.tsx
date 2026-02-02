"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  MailIcon,
} from "@/components/animated-icons";
import { Send, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

// Use our animated icons for better consistency
const contactMethods = [
  {
    icon: MailIcon,
    title: "Email",
    description: "Send me a direct email",
    value: "hi@joshiutsav.com",
    href: "mailto:hi@joshiutsav.com",
    primary: true,
  },
  {
    icon: GithubIcon,
    title: "GitHub",
    description: "Review my code",
    value: "@utsavjosh1",
    href: "https://github.com/utsavjosh1",
  },
  {
    icon: LinkedinIcon,
    title: "LinkedIn",
    description: "Connect professionally",
    value: "@utsavjosh1",
    href: "https://www.linkedin.com/in/utsavjosh1/",
  },
  {
    icon: TwitterIcon,
    title: "Twitter",
    description: "Follow my updates",
    value: "@utsavjosh1",
    href: "https://twitter.com/utsavjosh1",
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

  const handleBack = () => {
    router.back();
  };

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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center animate-fade-in-up">
          <div className="space-y-6">
            <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Message Received</h1>
              <p className="text-muted-foreground leading-relaxed">
                I'll review your message and get back to you shortly. Usually
                within 24 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="border-primary/20 hover:bg-primary/5"
              >
                Send Another
              </Button>
              <Button onClick={handleBack}>Return Home</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 overflow-x-hidden">
      <div className="page-container relative z-10">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] bg-primary/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none opacity-50 sm:opacity-100" />
        <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] bg-blue-500/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none opacity-50 sm:opacity-100" />

        <div className="space-y-16">
          {/* Header */}
          <div className="space-y-6 max-w-2xl animate-fade-in-up">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="pl-0 hover:bg-transparent hover:text-primary transition-colors group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back
            </Button>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Let's Build Something
              </h1>
              <p className="text-xl text-muted-foreground">
                Whether you have a project in mind or just want to talk shop,
                I'm all ears.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Contact Information */}
            <div className="lg:col-span-4 space-y-8 animate-fade-in-up-delay">
              <div className="space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Find me on
                </h2>
                <div className="grid gap-3">
                  {contactMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <Link
                        key={method.title}
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-4 rounded-xl border bg-card/50 hover:bg-card hover:border-primary/20 transition-all duration-300"
                      >
                        <div
                          className={`p-2.5 rounded-lg bg-background border group-hover:border-primary/20 transition-colors`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {method.title}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {method.description}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8 animate-fade-in-up-delay">
              <div className="rounded-2xl border bg-card/30 backdrop-blur-sm p-6 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`h-12 bg-background/50 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className={`h-12 bg-background/50 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project..."
                      rows={6}
                      className={`resize-none bg-background/50 ${errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto h-12 px-8 rounded-full text-base font-medium shadow-glow-sm hover:shadow-glow transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-inherit mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

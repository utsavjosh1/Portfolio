"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "Send me an email",
    value: "hi@joshiutsav.com",
    href: "mailto:hi@joshiutsav.com",
    primary: true,
  },
  {
    icon: Github,
    title: "GitHub",
    description: "Check out my code",
    value: "@utsavjosh1",
    href: "https://github.com/utsavjosh1",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    description: "Let's connect professionally",
    value: "@utsavjosh1",
    href: "https://www.linkedin.com/in/utsavjosh1/",
  },
  {
    icon: Twitter,
    title: "Twitter",
    description: "Follow me for updates",
    value: "@utsavjosh1",
    href: "https://twitter.com/utsavjosh1",
  },
];

const availability = [
  { label: "Response Time", value: "Within 24 hours" },
  { label: "Time Zone", value: "UTC+5:30 (IST)" },
  { label: "Availability", value: "Monday - Friday" },
  { label: "Status", value: "Available for work", status: "available" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
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
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="space-y-6">
            <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Message Sent!</h1>
              <p className="text-muted-foreground">
                Thank you for reaching out. I&apos;ll get back to you within 24
                hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I&apos;m always excited to discuss new opportunities, interesting
              projects, or just have a chat about technology. Let&apos;s connect!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              {/* Contact Methods */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Contact Methods</h2>
                <div className="space-y-3">
                  {contactMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <Link
                        key={method.title}
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  method.primary
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium">{method.title}</p>
                                <p className="text-sm text-muted-foreground truncate">
                                  {method.value}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Availability</h2>
                <Card>
                  <CardContent className="p-4 space-y-3">
                    {availability.map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm text-muted-foreground">
                          {item.label}
                        </span>
                        <div className="flex items-center gap-2">
                          {item.status === "available" && (
                            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                          )}
                          <span className="text-sm font-medium">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Location</h2>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Remote</p>
                        <p className="text-sm text-muted-foreground">
                          Available worldwide
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send me a message</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and I&apos;ll get back to you as soon as
                    possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        className={errors.subject ? "border-red-500" : ""}
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-500">{errors.subject}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project, question, or just say hello!"
                        rows={6}
                        className={errors.message ? "border-red-500" : ""}
                      />
                      {errors.message && (
                        <p className="text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    What&apos;s your typical response time?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    I typically respond to emails within 24 hours during
                    weekdays. For urgent matters, feel free to mention it in
                    your subject line.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    What type of projects do you work on?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    I specialize in web applications, AI-powered tools,
                    automation systems, and SaaS products. I&apos;m particularly
                    interested in projects that solve real-world problems.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Are you available for freelance work?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes! I&apos;m currently available for freelance projects and
                    consulting. Let&apos;s discuss your requirements and see how I
                    can help.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Do you offer consulting services?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    I provide technical consulting for architecture decisions,
                    code reviews, and technology strategy. Reach out to discuss
                    your needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const whatsappNumber = "919717281944";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);

    // Actual form submission would store the email
    console.log("Email submitted:", email);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi, I'd like to connect with you.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="text-green-500 text-xl font-medium mb-2">
          Thank you!
        </div>
        <p className="text-muted-foreground">
          I'll reach out to you at {email} soon.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            setSubmitted(false);
            setEmail("");
          }}
        >
          Submit another email
        </Button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            className="flex-1"
            disabled={isSubmitting || !email}
          >
            {isSubmitting ? "Submitting..." : "Contact Me"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2 flex-1 text-[#25D366]"
            onClick={openWhatsApp}
          >
            <MessageSquare size={18} />
            <span>WhatsApp Me</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

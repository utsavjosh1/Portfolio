"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      // Connect to the contact API or similar
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message: "Newsletter Subscription Request" }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4 w-full">
      <h3 className="text-sm font-semibold text-center text-[var(--text)]">
        My not so regular newsletter :)
      </h3>
      {status === "success" ? (
        <p className="text-xs text-center text-accent animate-reveal font-mono">
          ✓ Awesome! You are subscribed.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@youremail.com"
            required
            disabled={status === "loading"}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs text-[var(--text)] placeholder-[var(--text-3)] focus:outline-none focus:border-accent/40 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "bg-[var(--accent)] text-black font-semibold text-[10px] uppercase tracking-wider rounded-lg px-4 py-2 hover:opacity-90 transition-all duration-200 disabled:opacity-50 active:scale-95",
              status === "loading" && "animate-pulse"
            )}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-[10px] text-center text-red-500 font-mono">
          ⚠ Oops! Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}

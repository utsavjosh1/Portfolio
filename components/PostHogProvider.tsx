// app/posthog-wrapper.tsx
"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

export default function PostHogProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialized = useRef(false); // Use useRef to track initialization

  useEffect(() => {
    if (!initialized.current) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
        loaded: (ph) => {
          if (process.env.NODE_ENV === "development") ph.opt_out_capturing();
        },
      });
      initialized.current = true; // Mark as initialized
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

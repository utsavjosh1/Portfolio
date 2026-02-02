"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/firebase";

export function FirebaseAnalytics() {
  useEffect(() => {
    // fast refresh or simple import trigger
    // Firebase Analytics automatically tracks page views by default
    // we just need to ensure the code in lib/firebase.ts runs on the client
    if (analytics) {
      // Intentionally empty, just ensuring import side-effects or future manual logging
    }
  }, []);

  return null;
}

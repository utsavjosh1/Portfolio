import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden p-6"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-glow)] opacity-20 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Error 404
          </p>
          <h1 className="font-display text-7xl text-[var(--text)] md:text-8xl">
            Page not found<span className="text-accent">.</span>
          </h1>
        </div>
        <p className="leading-relaxed text-[var(--text-2)]">
          The page may have moved, been archived, or never existed.
        </p>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-strong bg-surface px-6 py-3 text-sm hover:border-accent hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Return home
        </Link>
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-[var(--bg)]">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[var(--accent-glow)] blur-[120px] opacity-20 pointer-events-none" />

      <div className="relative z-10 text-center space-y-8 max-w-md">
        {/* Large 404 */}
        <div className="space-y-2">
          <span className="block font-mono text-xs uppercase tracking-[0.3em] text-accent opacity-0 animate-fade-up">
            Error 404
          </span>
          <h1 className="text-8xl md:text-9xl font-display text-[var(--text)] opacity-0 animate-fade-up-1">
            Void<span className="text-accent">.</span>
          </h1>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-[var(--text-2)] font-body font-light leading-relaxed opacity-0 animate-fade-up-2">
            The page you are looking for has drifted into the digital abyss. It
            likely never existed or has been archived.
          </p>
        </div>

        {/* Action */}
        <div className="pt-4 opacity-0 animate-fade-up-3">
          <Button variant="outline" size="lg" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return to Safety
            </Link>
          </Button>
        </div>

        {/* System Code */}
        <div className="pt-12 opacity-0 animate-fade-up-5">
          <span className="font-mono text-[10px] text-[var(--text-3)] uppercase tracking-widest">
            [ System Status: Offline ]
          </span>
        </div>
      </div>
    </div>
  );
}

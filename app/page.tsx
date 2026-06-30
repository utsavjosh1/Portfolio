import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/config";
import { projects } from "@/data/projects";
import SubscribeForm from "@/components/SubscribeForm";
import RecentWriting from "@/components/RecentWriting";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.bio,
};

export default function Home() {
  // Work projects mapped to custom symbols
  const projectSymbols: Record<string, string> = {
    "Learnest": "🎓",
    "Postly": "🤖",
    "GamingMania": "🎮",
  };

  return (
    <div className="min-h-screen py-20 px-6 md:px-8 max-w-2xl mx-auto space-y-16 animate-reveal">
      {/* 1. Header Area */}
      <header className="space-y-6">
        <Image
          src="/logo.png"
          alt={siteConfig.name}
          width={48}
          height={48}
          priority
          className="rounded-full size-12 object-cover border border-white/10"
        />

        <div className="space-y-4">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--text)]">
            {siteConfig.name}{" "}
            <span className="font-display italic font-normal text-[var(--text-2)] text-lg md:text-xl ml-1">
              aka @utsavjosh1
            </span>
          </h1>

          {/* Navigation Menu */}
          <nav className="flex gap-6 text-sm font-semibold tracking-tight">
            <Link href="/" className="text-[var(--text)] transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors">
              Writing
            </Link>
            <Link href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors">
              Favorites
            </Link>
            <Link href={`mailto:${siteConfig.email}`} className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. Main Bio Paragraphs */}
      <main className="space-y-6 text-sm md:text-base leading-relaxed text-[var(--text)] font-light">
        <p>
          I'm a software engineer at heart, building high-performance systems and SaaS. Over the past few years, I've focused on building clean backend APIs, distributed queues, and real-time gaming engines that scale.
        </p>
        <p>
          Currently, I am architecting the microservices infrastructure for{" "}
          <Link href="https://learnest.asia/" target="_blank" rel="noopener noreferrer" className="underline decoration-accent underline-offset-4 italic hover:text-accent font-medium transition-all">
            Learnest
          </Link>{" "}
          and designing job intelligence matchmaking pipelines using vector search on{" "}
          <Link href="https://postly.learnest.asia/" target="_blank" rel="noopener noreferrer" className="underline decoration-accent underline-offset-4 italic hover:text-accent font-medium transition-all">
            Postly
          </Link>.
        </p>
        <p>
          Always open to interesting conversations about systems, databases, or street food.{" "}
          <Link href={`mailto:${siteConfig.email}`} className="underline decoration-accent underline-offset-4 italic hover:text-accent font-medium transition-all">
            Say hello
          </Link>{" "}
          or follow me on{" "}
          <Link href={siteConfig.githubUrl} target="_blank" rel="noopener" className="underline decoration-accent underline-offset-4 italic hover:text-accent font-medium transition-all">
            GitHub
          </Link>,{" "}
          <Link href={siteConfig.twitterUrl} target="_blank" rel="noopener" className="underline decoration-accent underline-offset-4 italic hover:text-accent font-medium transition-all">
            Twitter
          </Link>, or{" "}
          <Link href={siteConfig.linkedinUrl} target="_blank" rel="noopener" className="underline decoration-accent underline-offset-4 italic hover:text-accent font-medium transition-all">
            LinkedIn
          </Link>.
        </p>
      </main>

      {/* Dots Separator */}
      <div className="flex gap-2 justify-center py-4 select-none">
        <div className="size-2 rounded-full bg-[#ff5f56] opacity-80" />
        <div className="size-2 rounded-full bg-[#ffbd2e] opacity-80" />
        <div className="size-2 rounded-full bg-[#27c93f] opacity-80" />
      </div>

      {/* 3. Work Section */}
      <section className="space-y-6">
        <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-3)] font-semibold">
          Work
        </h2>
        <div className="space-y-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.liveUrl || project.githubUrl || "/"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 py-2.5 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-all duration-200 group"
            >
              <span className="text-xl select-none" role="img" aria-label={project.title}>
                {projectSymbols[project.title] || "⚙"}
              </span>
              <div className="text-sm font-semibold tracking-tight text-[var(--text)] group-hover:text-accent transition-colors flex items-baseline gap-1.5 flex-wrap">
                <span>{project.title}</span>
                <span className="text-[var(--text-3)] font-light">/</span>
                <span className="text-xs text-[var(--text-2)] font-light normal-case">
                  {project.type}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Dots Separator */}
      <div className="flex gap-2 justify-center py-4 select-none">
        <div className="size-2 rounded-full bg-[#ff5f56] opacity-80" />
        <div className="size-2 rounded-full bg-[#ffbd2e] opacity-80" />
        <div className="size-2 rounded-full bg-[#27c93f] opacity-80" />
      </div>

      {/* 4. Writing Section */}
      <RecentWriting />

      {/* Dots Separator */}
      <div className="flex gap-2 justify-center py-4 select-none">
        <div className="size-2 rounded-full bg-[#ff5f56] opacity-80" />
        <div className="size-2 rounded-full bg-[#ffbd2e] opacity-80" />
        <div className="size-2 rounded-full bg-[#27c93f] opacity-80" />
      </div>

      {/* 5. Footer Signature Logo & Subscribe Form */}
      <footer className="space-y-12 pt-8">
        <div className="text-center select-none font-signature text-4xl text-[var(--text)] tracking-wider">
          JoshiUtsav
        </div>

        <SubscribeForm />

        <div className="text-center text-[10px] font-mono text-[var(--text-3)] pt-6 border-t border-white/5">
          Built by Utsav Joshi. Website inspired by{" "}
          <Link href="https://designerdada.com" target="_blank" rel="noopener" className="hover:text-accent transition-colors">
            Akash Bhadange
          </Link>.
        </div>
      </footer>
    </div>
  );
}

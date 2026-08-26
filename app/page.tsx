import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { siteConfig, siteTitle } from "@/data/config";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { getLatestPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: { absolute: siteTitle },
  description: siteConfig.bio,
  alternates: { canonical: "/" },
};

function formatBlogDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .toUpperCase();
}

export default async function Home() {
  const posts = await getLatestPosts(5);

  return (
    <main
      id="main-content"
      className="mx-auto min-h-screen max-w-2xl space-y-16 px-6 pb-16 pt-28 md:px-8 md:pb-20 md:pt-28"
    >
      <header className="space-y-4">
        <Image
          src="/utsav-joshi-avatar.webp"
          alt="Portrait illustration of Utsav Joshi"
          width={48}
          height={48}
          sizes="48px"
          className="size-12 rounded-full border border-white/10 object-cover"
        />

        <h1 className="text-xl font-bold tracking-tight text-[var(--text)] md:text-2xl">
          {siteConfig.name}
          <span className="ml-2 font-display text-lg font-normal italic text-[var(--text-2)] md:text-xl">
            — {siteConfig.role}
          </span>
        </h1>
      </header>

      <section
        aria-label="About Utsav Joshi"
        className="space-y-4 text-sm leading-relaxed text-[var(--text)] md:text-base"
      >
        <p>
          I&apos;m a software engineer in India focused on scalable backend
          systems, APIs, and full-stack SaaS applications. I work primarily with
          Go, TypeScript, React, Next.js, and PostgreSQL.
        </p>
        <p>
          I currently build fintech software at Nextbill and architect the
          microservices behind Learnest. Recent work includes tax-compliance
          systems, distributed job queues, real-time applications, and semantic
          search pipelines for Postly.
        </p>
        <p>
          I&apos;m always open to thoughtful conversations about software
          systems, databases, and useful products. You can{" "}
          <Link href="/contact" className="text-link">
            contact me
          </Link>
          , browse my{" "}
          <Link
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            GitHub
          </Link>
          , or connect on{" "}
          <Link
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            LinkedIn
          </Link>
          .
        </p>
      </section>

      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="space-y-6 scroll-mt-8"
      >
        <h2 id="projects-heading" className="section-heading">
          Selected work
        </h2>
        <div className="space-y-8">
          {projects.map((project) => (
            <article
              key={project.slug}
              tabIndex={0}
              className={`project-card relative space-y-3 overflow-hidden rounded-lg border ${
                project.featured
                  ? "border-accent/20 bg-[var(--accent-dim)] p-5 hover:border-accent/35 md:p-6"
                  : "border-white/5 bg-[rgba(9,9,11,0.35)] p-4 hover:border-white/10 hover:bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              {project.featured && (
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                  <span className="font-semibold text-accent">
                    Flagship project
                  </span>
                  {project.status && (
                    <span className="flex items-center gap-1.5 text-[var(--text-2)]">
                      <span
                        className="size-1.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {project.status}
                    </span>
                  )}
                </div>
              )}
              <div className="flex items-start gap-3">
                <span
                  className={`select-none ${project.featured ? "text-2xl" : "text-xl"}`}
                  aria-hidden="true"
                >
                  {project.symbol}
                </span>
                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-semibold tracking-tight text-[var(--text)] ${project.featured ? "text-lg" : ""}`}
                  >
                    {project.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--text-2)]">
                    {project.type}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-2)]">
                {project.description}
              </p>
              <div className="project-details">
                <div className="project-details-inner space-y-3 pt-1">
                  {project.note && (
                    <p className="border-l-2 border-accent/60 pl-3 text-xs italic leading-relaxed text-[var(--text)]">
                      {project.note}
                    </p>
                  )}
                  <ul
                    aria-label={`${project.title} technologies`}
                    className="flex flex-wrap gap-1.5"
                  >
                    {project.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-[var(--text-2)]"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                  {(project.liveUrl || project.sourceUrl) && (
                    <div className="flex flex-wrap gap-4 pt-1 text-xs font-semibold">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link"
                        >
                          View live project <span aria-hidden="true">↗</span>
                        </Link>
                      )}
                      {project.sourceUrl && (
                        <Link
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link"
                        >
                          View source <span aria-hidden="true">↗</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="space-y-6 scroll-mt-8"
      >
        <h2 id="experience-heading" className="section-heading">
          Experience
        </h2>
        <div className="space-y-7">
          {experiences.map((experience) => (
            <article
              key={`${experience.company}-${experience.role}`}
              className="space-y-2"
            >
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <h3 className="text-sm font-semibold text-[var(--text)]">
                  {experience.role} · {experience.company}
                </h3>
                <span className="shrink-0 font-mono text-[10px] text-[var(--text-2)]">
                  {experience.period}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-2)]">
                {experience.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="space-y-6 scroll-mt-8"
      >
        <h2 id="skills-heading" className="section-heading">
          Technical focus
        </h2>
        <dl className="space-y-4 text-sm">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4"
            >
              <dt className="font-semibold text-[var(--text)]">
                {category.title}
              </dt>
              <dd className="leading-relaxed text-[var(--text-2)]">
                {category.skills.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {posts.length > 0 && (
        <section aria-labelledby="writing-heading" className="space-y-6">
          <h2 id="writing-heading" className="section-heading">
            Writing
          </h2>
          <div className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex min-h-11 items-center justify-between gap-6 rounded-lg px-3 py-2.5 -mx-3 hover:bg-white/5"
              >
                <span className="line-clamp-1 text-sm font-semibold tracking-tight text-[var(--text)] group-hover:text-accent">
                  {post.title}
                </span>
                <time
                  dateTime={post.createdAt.toISOString()}
                  className="whitespace-nowrap font-mono text-[10px] text-[var(--text-2)]"
                >
                  {formatBlogDate(post.createdAt)}
                </time>
              </Link>
            ))}
          </div>
          <Link
            href="/blog"
            className="inline-block py-2 font-mono text-xs text-[var(--text-2)] hover:text-accent"
          >
            View all writing →
          </Link>
        </section>
      )}

      <footer className="space-y-10 pt-4 text-center">
        <div>
          <h2 className="font-display text-2xl italic text-[var(--text)]">
            Have a project or role in mind?
          </h2>
          <p className="mt-2 text-sm text-[var(--text-2)]">
            Tell me what you&apos;re building and where I can help.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex min-h-11 items-center rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black hover:opacity-90"
          >
            Contact me
          </Link>
        </div>
        <div className="select-none font-display text-4xl italic tracking-wide text-[var(--text)]">
          JoshiUtsav
        </div>
        <p className="border-t border-white/5 pt-6 font-mono text-[10px] text-[var(--text-2)]">
          Made with <span aria-label="love">❤️</span> by Utsav Joshi.
        </p>
      </footer>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfilePage",
              "@id": `${siteConfig.url}/#profile-page`,
              url: siteConfig.url,
              name: siteTitle,
              description: siteConfig.bio,
              inLanguage: "en",
              mainEntity: { "@id": `${siteConfig.url}/#person` },
              isPartOf: { "@id": `${siteConfig.url}/#website` },
            },
            {
              "@type": "ItemList",
              "@id": `${siteConfig.url}/#projects`,
              name: "Selected software projects by Utsav Joshi",
              itemListElement: projects.map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "CreativeWork",
                  name: project.title,
                  description: project.description,
                  creator: { "@id": `${siteConfig.url}/#person` },
                  keywords: project.technologies.join(", "),
                  ...(project.liveUrl ? { url: project.liveUrl } : {}),
                  ...(project.sourceUrl
                    ? { codeRepository: project.sourceUrl }
                    : {}),
                },
              })),
            },
          ],
        }}
      />
    </main>
  );
}

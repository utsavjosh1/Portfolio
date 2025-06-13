import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="flex justify-center">
        <div className="w-[40%] min-w-[320px] px-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">{siteConfig.name}</h3>
              <p className="text-sm text-muted-foreground max-w-xs">{siteConfig.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Links</h3>
              <nav className="flex flex-col space-y-1">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/experience"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Experience
                </Link>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </nav>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Connect</h3>
              <div className="flex space-x-4">
                <Link href={siteConfig.links.github} aria-label="GitHub profile">
                  <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
                <Link href={siteConfig.links.linkedin} aria-label="LinkedIn profile">
                  <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
                <Link href={siteConfig.links.twitter} aria-label="Twitter profile">
                  <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
                <Link href={`mailto:${siteConfig.email}`} aria-label="Email contact">
                  <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-4">
            <p className="text-xs text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

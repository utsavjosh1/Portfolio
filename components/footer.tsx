"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { name: "GitHub", href: "https://github.com/utsavjosh1", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/utsavjosh1/", icon: Linkedin },
  { name: "Email", href: "mailto:hi@joshiutsav.com", icon: Mail },
  { name: "Twitter", href: "https://twitter.com/utsavjosh1", icon: Twitter },
]

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
]

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">UJ</span>
              </div>
              <span className="font-semibold text-lg">Utsav Joshi</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Software Engineer building AI & automation tools that solve real-world problems.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Get in Touch</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Ready to work together?</p>
              <Button size="sm" asChild>
                <Link href="/contact">Start a conversation</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 Utsav Joshi. All rights reserved.
          </p>
          <Button variant="ghost" size="sm" onClick={scrollToTop} className="flex items-center space-x-2">
            <ArrowUp className="h-4 w-4" />
            <span>Back to top</span>
          </Button>
        </div>
      </div>
    </footer>
  )
}
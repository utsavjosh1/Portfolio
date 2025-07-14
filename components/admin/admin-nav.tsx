"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MessageSquare, BarChart3, LogOut, Shield, Mail, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function AdminNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated by trying to access a protected endpoint
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check-auth', {
          credentials: 'include'
        })
        setIsAuthenticated(response.ok)
      } catch {
        setIsAuthenticated(false)
      }
    }

    // Only check auth if we're on an admin page (not login)
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
      checkAuth()
    }
  }, [pathname])

  // Don't show navigation on login page or if not authenticated
  if (pathname === '/admin/login' || !isAuthenticated) {
    return null
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        toast.success('Logged out successfully')
        router.push('/admin/login')
      } else {
        toast.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout failed')
    }
  }

  const navItems = [
    {
      href: "/admin/contact",
      label: "Contact Submissions",
      icon: MessageSquare,
    },
    {
      href: "/admin/newsletter",
      label: "Newsletter",
      icon: Mail,
    },
    {
      href: "/admin/upload/images",
      label: "Upload Images",
      icon: Upload,
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      icon: BarChart3,
    },
  ]

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="w-full px-6">
        <div className="flex items-center justify-between py-3">
          {/* Admin Brand - Compact */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground">Admin</h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>

          {/* Navigation Items - Compact */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-foreground bg-primary/10 border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  title={item.label}
                >
                  <Icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{item.label.split(' ')[0]}</span>
                </Link>
              )
            })}
          </div>

          {/* Logout Button - Compact */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium hover:bg-foreground hover:text-background transition-all duration-200"
          >
            <LogOut className="h-3 w-3" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  )
} 
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { toast } from "sonner"

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      })
      
      if (response.ok) {
        toast.success('Logged out successfully')
        // Force a hard refresh to ensure middleware picks up the cleared cookie
        window.location.href = '/admin/login'
      } else {
        toast.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleLogout}
      disabled={isLoading}
      className="gap-2"
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      Logout
    </Button>
  )
} 
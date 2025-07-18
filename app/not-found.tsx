"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <FileQuestion className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go home
                </Link>
              </Button>
              <Button variant="outline" onClick={() => window.history.back()} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Go back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

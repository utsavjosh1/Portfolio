"use client"

import type React from "react"

import { useState } from "react"
import { Send, Mail, MapPin, Clock, Github, Linkedin, ExternalLink, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { ContactService, type ContactFormData } from "@/lib/services/contact"

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactClientPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name is too long'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.length > 200) {
      newErrors.subject = 'Subject is too long'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.length > 2000) {
      newErrors.message = 'Message is too long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await ContactService.submitContact(formData)
      
      if (response.success) {
        toast.success(response.message)
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        if (response.errors) {
          // Handle validation errors from server
          const serverErrors: FormErrors = {}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          response.errors.forEach((error: any) => {
            if (error.path && error.path[0]) {
              serverErrors[error.path[0] as keyof FormErrors] = error.message
            }
          })
          setErrors(serverErrors)
        }
        toast.error(response.message)
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error("Failed to send message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setErrors({})
  }

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className="text-center space-y-8">
          <div className="w-16 h-16 mx-auto bg-green-50 dark:bg-green-950/20 rounded-full flex items-center justify-center border border-green-200 dark:border-green-800/30">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-light">Message sent successfully</h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
                             Thank you for reaching out. I&apos;ll get back to you within 24 hours.
            </p>
          </div>
          <Button 
            onClick={resetForm}
            variant="outline" 
            className="mt-8"
          >
            Send another message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      {/* Header */}
      <div className="text-center space-y-6 mb-20">
        <h1 className="text-5xl md:text-6xl font-light tracking-tight">Contact</h1>
        <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
          I&apos;m always open to discussing new opportunities and interesting projects.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-16">
        {/* Contact Information */}
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Email</span>
              </div>
              <Link 
                href="mailto:hi@joshiutsav.com" 
                className="text-xl hover:text-muted-foreground transition-colors duration-200 block"
              >
                hi@joshiutsav.com
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Location</span>
              </div>
              <p className="text-xl">Remote Worldwide</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Response Time</span>
              </div>
              <p className="text-xl">Usually within 24 hours</p>
            </div>
          </div>

          <div className="h-px bg-border"></div>

          <div className="space-y-4">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Connect</span>
            <div className="flex gap-6">
              <Link
                href="https://github.com/utsavjosh1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/utsavjosh1/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`h-14 border-0 border-b border-border bg-transparent rounded-none focus:border-foreground transition-colors duration-200 ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                  required
                />
                {errors.name && (
                  <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`h-14 border-0 border-b border-border bg-transparent rounded-none focus:border-foreground transition-colors duration-200 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                  required
                />
                {errors.email && (
                  <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                className={`h-14 border-0 border-b border-border bg-transparent rounded-none focus:border-foreground transition-colors duration-200 ${errors.subject ? 'border-red-500 focus:border-red-500' : ''}`}
                required
              />
              {errors.subject && (
                <div className="flex items-center gap-2 text-sm text-red-500 mt-2">
                  <AlertCircle className="h-4 w-4" />
                  {errors.subject}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or just say hello..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`border-0 border-b border-border bg-transparent rounded-none resize-none focus:border-foreground transition-colors duration-200 ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                required
              />
              <div className="flex justify-between items-center pt-2">
                {errors.message ? (
                  <div className="flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {errors.message}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Minimum 10 characters</span>
                )}
                <span className={`text-sm ${formData.message.length > 1800 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                  {formData.message.length}/2000
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full md:w-auto h-14 px-12 bg-foreground hover:bg-foreground/90 text-background"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    Send Message
                    <Send className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

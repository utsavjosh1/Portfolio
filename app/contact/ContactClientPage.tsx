"use client"

import type React from "react"

import { useState } from "react"
import { Send, Mail, MessageSquare, User, AlertCircle, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Contact</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Get in touch with me for work inquiries, collaborations, or just to say hello.
          </p>
        </div>

        <Card className="border-border shadow-lg animate-in fade-in-50 duration-500">
          <CardContent className="p-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground">Message Sent Successfully!</h2>
              <p className="text-muted-foreground leading-relaxed">
                Thank you for reaching out. I'll get back to you as soon as possible, usually within 24 hours.
              </p>
            </div>
            <Button 
              onClick={resetForm}
              variant="outline" 
              className="mt-6"
            >
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 animate-in fade-in-50 duration-300">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Contact</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Get in touch with me for work inquiries, collaborations, or just to say hello.
        </p>
      </div>

      <Card className="border-border shadow-lg animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-200">
        <CardHeader className="pb-8">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-foreground" />
            </div>
            Send a Message
          </CardTitle>
          <CardDescription className="text-base">
            Fill out the form below and I'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 p-8 pt-0">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className={`h-12 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-border'}`}
                required
              />
              {errors.name && (
                <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`h-12 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-border'}`}
                required
              />
              {errors.email && (
                <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                placeholder="What is this regarding?"
                value={formData.subject}
                onChange={handleChange}
                className={`h-12 ${errors.subject ? 'border-red-500 focus:border-red-500' : 'border-border'}`}
                required
              />
              {errors.subject && (
                <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.subject}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="message" className="text-sm font-medium text-foreground">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project, question, or just say hello..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-border'}`}
                required
              />
              <div className="flex justify-between items-center">
                {errors.message ? (
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    {errors.message}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Minimum 10 characters
                  </div>
                )}
                <div className="text-sm text-muted-foreground">
                  {formData.message.length}/2000
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-8 pt-0">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full h-12 text-base font-medium hover:scale-105 transition-all duration-200"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending Message...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  Send Message
                  <Send className="h-5 w-5" />
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Resend } from "resend";
import { ContactFormEmail } from "@/components/emails/contact-form-email";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

// POST - Create new contact submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // 1. Create contact submission in Firestore
    const docRef = await addDoc(collection(db, "contact_submissions"), {
      ...validatedData,
      createdAt: serverTimestamp(),
    });

    // 2. Send Emails (Fire and forget, or await if critical)
    try {
      if (process.env.RESEND_API_KEY) {
        // Email to Admin (You)
        await resend.emails.send({
          from: "Portfolio <onboarding@resend.dev>", // Or your verified domain
          to: "hello@joshiutsav.com", // Your email
          subject: `New Message from ${validatedData.name}`,
          react: ContactFormEmail({
            name: validatedData.name,
            email: validatedData.email,
            message: validatedData.message,
            type: "admin",
          }),
        });

        // Email to User (Acknowledgment)
        await resend.emails.send({
          from: "Utsav Joshi <onboarding@resend.dev>",
          to: validatedData.email,
          subject: "Thanks for getting in touch!",
          react: ContactFormEmail({
            name: validatedData.name,
            email: validatedData.email,
            message: validatedData.message,
            type: "user",
          }),
        });
      } else {
        console.warn("RESEND_API_KEY is missing. Emails not sent.");
      }
    } catch (emailError) {
      console.error("Failed to send emails:", emailError);
      // Don't fail the request if emails fail, DB save is more important
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
        id: docRef.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 },
    );
  }
}

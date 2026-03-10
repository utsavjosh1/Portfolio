import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Resend } from "resend";
import { ContactFormEmail } from "@/components/emails/contact-form-email";
import { waitUntil } from "@vercel/functions";
import { env } from "@/lib/env";

// Initialize Resend
const resend = new Resend(env.resendApiKey);

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

    // 1. Instant Validation (The only thing that blocks the response)
    const validatedData = contactSchema.parse(body);

    // 2. Offload heavy network IO to background tasks
    // This allows us to return a response to the user in < 50ms
    waitUntil(
      (async () => {
        try {
          // Parallelize Database and Email operations in the background
          const dbPromise = addDoc(collection(db, "contact_submissions"), {
            ...validatedData,
            createdAt: serverTimestamp(),
          });

          const emailPromises = [];
          if (process.env.RESEND_API_KEY) {
            // Email to Admin
            emailPromises.push(
              resend.emails.send({
                from: "Portfolio <no-reply@joshiutsav.com>",
                to: process.env.contactEmail || "",
                subject: `New Message from ${validatedData.name}`,
                react: ContactFormEmail({
                  name: validatedData.name,
                  email: validatedData.email,
                  message: validatedData.message,
                  type: "admin",
                }),
              }),
            );

            // Email to User
            emailPromises.push(
              resend.emails.send({
                from: "Utsav Joshi <no-reply@joshiutsav.com>",
                to: validatedData.email,
                subject: "Thanks for getting in touch!",
                react: ContactFormEmail({
                  name: validatedData.name,
                  email: validatedData.email,
                  message: validatedData.message,
                  type: "user",
                }),
              }),
            );
          }

          // Await all background tasks to ensure they complete
          await Promise.all([
            dbPromise,
            ...emailPromises.map((p) =>
              p.catch((e) => console.error("Background Email error:", e)),
            ),
          ]);
        } catch (bgError) {
          console.error("Background processing failed:", bgError);
        }
      })(),
    );

    // 3. Immediate Response (Under 50ms)
    return NextResponse.json(
      {
        success: true,
        message: "Message received! I'll get back to you soon.",
      },
      { status: 201 },
    );
  } catch (error) {
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

    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process request. Please try again.",
      },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { waitUntil } from "@vercel/functions";

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

    // 1. Instant Validation
    const validatedData = contactSchema.parse(body);

    // 2. Offload DB write to background
    waitUntil(
      (async () => {
        try {
          await addDoc(collection(db, "contact_submissions"), {
            ...validatedData,
            createdAt: serverTimestamp(),
          });
        } catch (bgError) {
          console.error("Background processing failed:", bgError);
        }
      })(),
    );

    // 3. Immediate Response
    return NextResponse.json(
      {
        success: true,
        message: "Message received. I'll get back to you soon.",
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

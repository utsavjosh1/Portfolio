import { addDoc, collection, serverTimestamp } from "firebase/firestore/lite";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getDatabase, isFirebaseConfigured } from "@/lib/firebase";

const maxBodyBytes = 10_000;
const contactSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(254),
    message: z.string().trim().min(10).max(2000),
    company: z.string().max(200).optional().default(""),
  })
  .strict();

function jsonResponse(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  const contentLength = Number(request.headers.get("content-length") || 0);

  if (!contentType.toLowerCase().startsWith("application/json")) {
    return jsonResponse(
      { success: false, message: "Expected a JSON request." },
      415,
    );
  }

  if (contentLength > maxBodyBytes) {
    return jsonResponse(
      { success: false, message: "Request is too large." },
      413,
    );
  }

  try {
    const body: unknown = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return jsonResponse(
        { success: false, message: "Check the form fields and try again." },
        400,
      );
    }

    // Silently accept bot submissions that fill the honeypot field.
    if (parsed.data.company) {
      return jsonResponse({ success: true, message: "Message received." }, 201);
    }

    if (!isFirebaseConfigured()) {
      return jsonResponse(
        {
          success: false,
          message:
            "The contact form is temporarily unavailable. Please email me instead.",
        },
        503,
      );
    }

    await addDoc(collection(getDatabase(), "contact_submissions"), {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      createdAt: serverTimestamp(),
    });

    return jsonResponse(
      {
        success: true,
        message: "Message received. I'll get back to you soon.",
      },
      201,
    );
  } catch (error) {
    console.error("Contact form submission failed", error);
    return jsonResponse(
      {
        success: false,
        message: "Your message could not be sent. Please try again.",
      },
      500,
    );
  }
}

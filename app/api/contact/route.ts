import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { safePrisma } from "@/lib/prisma";

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

// POST - Create new contact submission
export async function POST(request: NextRequest) {
  try {
    const prisma = safePrisma();
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // Create contact submission in database
    const submission = await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        status: "UNREAD",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
        id: submission.id,
      },
      { status: 201 }
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
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve contact submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    const prisma = safePrisma();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where = status ? { status: status as any } : {};

    const [submissions, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
        select: {
          id: true,
          name: true,
          email: true,
          subject: true,
          message: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: submissions,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Failed to fetch contact submissions:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch submissions",
      },
      { status: 500 }
    );
  }
}

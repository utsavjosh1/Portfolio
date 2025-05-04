import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename") || "";

  if (!filename) {
    return NextResponse.json({ error: "Missing filename" }, { status: 400 });
  }

  const body = request.body;

  if (!body) {
    return NextResponse.json({ error: "Missing file body" }, { status: 400 });
  }

  const blob = await put(filename, body, {
    access: "public",
  });

  return NextResponse.json(blob);
} 
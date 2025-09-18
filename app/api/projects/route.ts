import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/lib/query/projects";

const PAGE_SIZE = 6;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "0");

    const all = await ProjectService.getAllProjects();
    const start = page * PAGE_SIZE;
    const paginated = all.slice(start, start + PAGE_SIZE);

    return NextResponse.json({ data: paginated });
  } catch (error) {
    console.error("[API] Failed to fetch projects", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { TechnologyService } from "@/lib/services/technology";

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Get category filter from query params if provided
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let technologies;
    let cacheStatus = 'MISS';

    if (category) {
      technologies = await TechnologyService.getTechnologiesByCategory(category);
    } else {
      technologies = await TechnologyService.getTechnologies();
    }

    // Check if this was served from cache (rough estimation)
    const responseTime = Date.now() - startTime;
    if (responseTime < 50) {
      cacheStatus = 'HIT';
    }

    const response = NextResponse.json({
      data: technologies,
      count: technologies.length,
      meta: {
        cached: cacheStatus === 'HIT',
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
      }
    });

    // Enhanced caching headers
    response.headers.set(
      "Cache-Control",
      "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
    );
    response.headers.set("X-Cache", cacheStatus);
    response.headers.set("X-Response-Time", `${responseTime}ms`);
    response.headers.set("Vary", "Accept-Encoding");
    
    // Add CORS headers if needed
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");

    console.log(`🚀 API Response: ${responseTime}ms, Cache: ${cacheStatus}, Count: ${technologies.length}`);

    return response;

  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`❌ API Error (${responseTime}ms):`, error);

    return NextResponse.json(
      { 
        error: "Failed to fetch technologies",
        message: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
        meta: {
          responseTime: `${responseTime}ms`,
          timestamp: new Date().toISOString(),
        }
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// Configuration for Next.js
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
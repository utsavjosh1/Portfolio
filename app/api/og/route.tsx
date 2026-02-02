import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// runtime = 'edge' removed for cacheComponents compatibility

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Params
    const title = searchParams.get("title") || "Utsav Joshi";
    const subtitle = searchParams.get("subtitle") || "Software Engineer";
    const description =
      searchParams.get("description") || "Building high-performance systems.";
    const style = searchParams.get("style") || "bento"; // 'terminal' | 'bento' | 'abstract'
    const tags = (
      searchParams.get("tags") || "Engineering,System Design,Next.js"
    ).split(",");

    // Shared config
    const width = 1200;
    const height = 630;

    // --- STYLES ---

    // 1. TERMINAL STYLE
    if (style === "terminal") {
      return new ImageResponse(
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#0a0a0a",
            color: "#22c55e",
            fontFamily: "monospace",
            padding: "40px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#6b7280",
              }}
            >
              <span>root@portfolio</span>
              <span>~/{searchParams.get("type") || "project"}</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <span
                style={{ color: "#fff", fontSize: "60px", fontWeight: "bold" }}
              >
                {">"} {title}
              </span>
              <span
                style={{
                  color: "#9ca3af",
                  fontSize: "30px",
                  marginTop: "10px",
                }}
              >
                {subtitle}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #374151",
              paddingTop: "20px",
            }}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              {tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  style={{
                    background: "#1f2937",
                    padding: "5px 15px",
                    borderRadius: "4px",
                    color: "#e5e7eb",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#22c55e",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              ></div>
              <span>System Operational</span>
            </div>
          </div>
        </div>,
        { width, height },
      );
    }

    // 2. ABSTRACT STYLE
    if (style === "abstract") {
      return new ImageResponse(
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Gradient Orb */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "600px",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 70%)",
              borderRadius: "50%",
              filter: "blur(40px)",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              zIndex: 10,
              gap: "20px",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#a1a1aa",
              }}
            >
              {subtitle}
            </span>
            <span
              style={{
                fontSize: "80px",
                fontWeight: "900",
                letterSpacing: "-2px",
                lineHeight: "1",
              }}
            >
              {title}
            </span>
            <div
              style={{
                width: "100px",
                height: "2px",
                background: "white",
                marginTop: "20px",
              }}
            ></div>
          </div>
        </div>,
        { width, height },
      );
    }

    // 3. BENTO STYLE (Default)
    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#050505",
          color: "white",
          padding: "40px",
          gap: "20px",
        }}
      >
        {/* Left Panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 2,
            background: "#121212",
            borderRadius: "24px",
            padding: "40px",
            border: "1px solid #262626",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "20px",
                color: "#a1a1aa",
                marginBottom: "10px",
              }}
            >
              {subtitle}
            </div>
            <div
              style={{
                fontSize: "60px",
                fontWeight: "bold",
                lineHeight: "1.1",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: "24px",
                color: "#d4d4d4",
                marginTop: "20px",
                opacity: 0.8,
              }}
            >
              {description}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {tags.map((tag, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 16px",
                  borderRadius: "100px",
                  border: "1px solid #404040",
                  background: "rgba(255,255,255,0.05)",
                  fontSize: "16px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            background: "#121212",
            borderRadius: "24px",
            border: "1px solid #262626",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative Grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(#262626 1px, transparent 1px), linear-gradient(90deg, #262626 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              opacity: 0.2,
            }}
          ></div>

          <div
            style={{
              fontSize: "120px",
              fontWeight: "900",
              background: "linear-gradient(to bottom right, #fff, #666)",
              backgroundClip: "text",
              color: "transparent",
              zIndex: 10,
            }}
          >
            UJ
          </div>
        </div>
      </div>,
      { width, height },
    );
  } catch (error) {
    return new ImageResponse(
      <div
        style={{
          background: "black",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Error
      </div>,
      { width: 1200, height: 630 },
    );
  }
}

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Utsav Joshi";
    const subtitle = searchParams.get("subtitle") || "Software Engineer";
    const description =
      searchParams.get("description") || "Building systems that scale.";
    const tags = (
      searchParams.get("tags") || "Backend,AI,Automation"
    ).split(",");

    const width = 1200;
    const height = 630;

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#09090b",
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
            background: "#111113",
            borderRadius: "20px",
            padding: "40px",
            border: "1px solid #252529",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "18px",
                color: "#9c9c96",
                marginBottom: "10px",
                fontFamily: "monospace",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </div>
            <div
              style={{
                fontSize: "56px",
                fontWeight: "bold",
                lineHeight: "1.1",
                color: "#ededec",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: "22px",
                color: "#9c9c96",
                marginTop: "16px",
                opacity: 0.8,
                lineHeight: "1.4",
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
                  border: "1px solid #252529",
                  background: "rgba(200,255,0,0.06)",
                  fontSize: "14px",
                  color: "#c8ff00",
                  fontFamily: "monospace",
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
            background: "#111113",
            borderRadius: "20px",
            border: "1px solid #252529",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(#252529 1px, transparent 1px), linear-gradient(90deg, #252529 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              opacity: 0.15,
            }}
          ></div>

          <div
            style={{
              fontSize: "120px",
              fontWeight: "900",
              background: "linear-gradient(to bottom right, #c8ff00, #5c5c58)",
              backgroundClip: "text",
              color: "transparent",
              zIndex: 10,
              fontFamily: "monospace",
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
          background: "#09090b",
          color: "#ededec",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
        }}
      >
        Error
      </div>,
      { width: 1200, height: 630 },
    );
  }
}

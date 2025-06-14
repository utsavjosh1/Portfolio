import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Extract parameters
  const title = searchParams.get('title') || 'Utsav Joshi';
  const subtitle = searchParams.get('subtitle') || 'Full Stack Developer & Software Engineer';
  const type = searchParams.get('type') || 'default'; // default, project, blog, experience
  const tags = searchParams.get('tags')?.split(',') || ['React', 'Next.js', 'TypeScript'];
  const description = searchParams.get('description');
  const date = searchParams.get('date');
  const readingTime = searchParams.get('readingTime');

  // Dynamic background based on type
  const getBackground = (type: string) => {
    switch (type) {
      case 'project':
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case 'blog':
        return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
      case 'experience':
        return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
      default:
        return "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)";
    }
  };

  // Dynamic icon based on type
  const getIcon = (type: string) => {
    switch (type) {
      case 'project':
        return '🚀';
      case 'blog':
        return '📝';
      case 'experience':
        return '💼';
      default:
        return '👨‍💻';
    }
  };

  const response = new ImageResponse(
    (
      <div
        style={{
          background: getBackground(type),
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "60px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "40px",
            }}
          >
            {getIcon(type)}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#ffffff",
              opacity: 0.9,
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: "600",
            }}
          >
            {type === 'default' ? 'Portfolio' : type}
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 1,
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 30 ? "48px" : "64px",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "20px",
              lineHeight: 1.1,
              maxWidth: "90%",
            }}
          >
            {title}
          </h1>
          
          {subtitle && (
            <h2
              style={{
                fontSize: "32px",
                color: "#ffffff",
                opacity: 0.8,
                marginBottom: description ? "20px" : "40px",
                fontWeight: "400",
                maxWidth: "90%",
              }}
            >
              {subtitle}
            </h2>
          )}

          {description && (
            <p
              style={{
                fontSize: "24px",
                color: "#ffffff",
                opacity: 0.7,
                marginBottom: "40px",
                lineHeight: 1.4,
                maxWidth: "90%",
              }}
            >
              {description.length > 120 ? description.substring(0, 120) + '...' : description}
            </p>
          )}

          {/* Meta information for blog posts */}
          {(date || readingTime) && (
            <div
              style={{
                display: "flex",
                gap: "30px",
                marginBottom: "30px",
                fontSize: "20px",
                color: "#ffffff",
                opacity: 0.7,
              }}
            >
              {date && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  📅 {new Date(date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              )}
              {readingTime && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  ⏱️ {readingTime}
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              maxWidth: "90%",
            }}
          >
            {tags.slice(0, 4).map((tag, index) => (
              <div
                key={index}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "25px",
                  color: "#ffffff",
                  fontSize: "18px",
                  fontWeight: "500",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {tag.trim()}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              👨‍💻
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  color: "#ffffff",
                  fontWeight: "600",
                }}
              >
                Utsav Joshi
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "#ffffff",
                  opacity: 0.7,
                }}
              >
                joshiutsav.com
              </div>
            </div>
          </div>

          {/* Social links indicator */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              opacity: 0.6,
            }}
          >
            <div style={{ fontSize: "24px" }}>🔗</div>
            <div style={{ fontSize: "24px" }}>💼</div>
            <div style={{ fontSize: "24px" }}>📧</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    }
  );

  return response;
}

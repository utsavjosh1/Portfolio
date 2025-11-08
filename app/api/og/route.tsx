import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract and validate all parameters
    const title = searchParams.get("title") || "Utsav Joshi";
    const subtitle = searchParams.get("subtitle") || "Software Engineer";
    const type = searchParams.get("type") || "default";
    const description =
      searchParams.get("description") || "Building the future with code";
    const date = searchParams.get("date");
    const readingTime = searchParams.get("readingTime");

    // Handle tags properly
    const tagsParam = searchParams.get("tags");
    const tags = tagsParam
      ? tagsParam.split(",").filter((t) => t && t.trim())
      : ["React", "Next.js", "TypeScript", "Full-Stack"];

    // Ultra-modern color schemes
    const getColorScheme = (type: string) => {
      switch (type) {
        case "contact":
          return {
            bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            text: "#ffffff",
            textSecondary: "#fef3c7",
            accent: "#ec4899",
            accentGlow: "rgba(236, 72, 153, 0.5)",
            border: "rgba(255, 255, 255, 0.2)",
            pattern: "rgba(255, 255, 255, 0.05)",
            glow1: "#f59e0b",
            glow2: "#ef4444",
          };
        default:
          return {
            bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            text: "#ffffff",
            textSecondary: "#e0e7ff",
            accent: "#fbbf24",
            accentGlow: "rgba(251, 191, 36, 0.5)",
            border: "rgba(255, 255, 255, 0.2)",
            pattern: "rgba(255, 255, 255, 0.05)",
            glow1: "#a78bfa",
            glow2: "#ec4899",
          };
      }
    };

    const colors = getColorScheme(type);

    return new ImageResponse(
      (
        <div
          style={{
            background: colors.bg,
            width: "100%",
            height: "100%",
            display: "flex",
            position: "relative",
            overflow: "hidden",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Animated Background Effects */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
            }}
          >
            {/* Grid Pattern */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundImage: `linear-gradient(${colors.pattern} 2px, transparent 2px), linear-gradient(90deg, ${colors.pattern} 2px, transparent 2px)`,
                backgroundSize: "60px 60px",
                opacity: 0.4,
                transform: "rotate(-12deg) scale(1.5)",
              }}
            />

            {/* Glowing Orbs */}
            <div
              style={{
                position: "absolute",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${colors.glow1} 0%, transparent 70%)`,
                top: "-200px",
                right: "-100px",
                opacity: 0.6,
                filter: "blur(60px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${colors.glow2} 0%, transparent 70%)`,
                bottom: "-150px",
                left: "-50px",
                opacity: 0.5,
                filter: "blur(50px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
                top: "50%",
                left: "50%",
                opacity: 0.3,
                filter: "blur(70px)",
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Geometric Shapes */}
            <div
              style={{
                position: "absolute",
                width: "150px",
                height: "150px",
                border: `3px solid ${colors.border}`,
                borderRadius: "30px",
                top: "80px",
                right: "100px",
                opacity: 0.3,
                transform: "rotate(25deg)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "100px",
                height: "100px",
                border: `2px solid ${colors.border}`,
                borderRadius: "50%",
                bottom: "120px",
                right: "250px",
                opacity: 0.2,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "80px",
                height: "80px",
                background: colors.accentGlow,
                borderRadius: "20px",
                top: "200px",
                left: "150px",
                opacity: 0.2,
                transform: "rotate(-15deg)",
              }}
            />
          </div>

          {/* Main Content Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              padding: "64px 72px",
              position: "relative",
              zIndex: 10,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "48px",
              }}
            >
              {/* Glowing Badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 28px",
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: `2px solid ${colors.border}`,
                  borderRadius: "50px",
                  fontSize: "16px",
                  color: colors.text,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontWeight: "700",
                  boxShadow: `0 0 30px ${colors.accentGlow}`,
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: colors.accent,
                    marginRight: "12px",
                    boxShadow: `0 0 20px ${colors.accentGlow}`,
                  }}
                />
                {type === "default" ? "Portfolio" : type}
              </div>

              {/* Logo Dots */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: colors.accent,
                    boxShadow: `0 0 20px ${colors.accentGlow}`,
                  }}
                />
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: colors.text,
                    opacity: 0.7,
                  }}
                />
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: colors.text,
                    opacity: 0.4,
                  }}
                />
              </div>
            </div>

            {/* Hero Content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                justifyContent: "center",
              }}
            >
              {/* Accent Lines */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "8px",
                    background: colors.accent,
                    borderRadius: "4px",
                    boxShadow: `0 0 30px ${colors.accentGlow}`,
                  }}
                />
                <div
                  style={{
                    width: "40px",
                    height: "8px",
                    background: colors.accent,
                    borderRadius: "4px",
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    width: "20px",
                    height: "8px",
                    background: colors.accent,
                    borderRadius: "4px",
                    opacity: 0.3,
                  }}
                />
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: title.length > 35 ? "58px" : "76px",
                  fontWeight: "900",
                  color: colors.text,
                  marginBottom: "20px",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  maxWidth: "95%",
                  textShadow: `0 4px 20px rgba(0, 0, 0, 0.3)`,
                }}
              >
                {title}
              </h1>

              {/* Subtitle */}
              {subtitle && (
                <h2
                  style={{
                    fontSize: "36px",
                    color: colors.accent,
                    marginBottom: "24px",
                    fontWeight: "700",
                    letterSpacing: "-0.01em",
                    textShadow: `0 0 30px ${colors.accentGlow}`,
                  }}
                >
                  {subtitle}
                </h2>
              )}

              {/* Description */}
              {description && (
                <p
                  style={{
                    fontSize: "24px",
                    color: colors.textSecondary,
                    marginBottom: "40px",
                    lineHeight: 1.6,
                    maxWidth: "85%",
                  }}
                >
                  {description.length > 120
                    ? description.substring(0, 120) + "..."
                    : description}
                </p>
              )}

              {/* Meta Pills */}
              {(date || readingTime) && (
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    marginBottom: "36px",
                  }}
                >
                  {date && (
                    <div
                      style={{
                        padding: "10px 20px",
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "50px",
                        border: `1px solid ${colors.border}`,
                        fontSize: "16px",
                        color: colors.text,
                        fontWeight: "600",
                      }}
                    >
                      {new Date(date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  )}
                  {readingTime && (
                    <div
                      style={{
                        padding: "10px 20px",
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "50px",
                        border: `1px solid ${colors.border}`,
                        fontSize: "16px",
                        color: colors.text,
                        fontWeight: "600",
                      }}
                    >
                      {readingTime}
                    </div>
                  )}
                </div>
              )}

              {/* Tech Tags */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {tags.slice(0, 5).map((tag: string, index: number) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px 24px",
                      background: "rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(10px)",
                      border: `2px solid ${colors.border}`,
                      borderRadius: "12px",
                      color: colors.text,
                      fontSize: "16px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
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
                paddingTop: "40px",
                borderTop: `2px solid ${colors.border}`,
              }}
            >
              {/* Author */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.glow1})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    fontWeight: "900",
                    color: colors.text,
                    border: `3px solid ${colors.border}`,
                    boxShadow: `0 0 30px ${colors.accentGlow}`,
                  }}
                >
                  UJ
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "22px",
                      color: colors.text,
                      fontWeight: "800",
                    }}
                  >
                    Utsav Joshi
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: colors.textSecondary,
                      fontWeight: "600",
                    }}
                  >
                    www.joshiutsav.com
                  </div>
                </div>
              </div>

              {/* CTA Arrow */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    color: colors.text,
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  View More
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: colors.accent,
                      boxShadow: `0 0 20px ${colors.accentGlow}`,
                    }}
                  />
                  <div
                    style={{
                      width: "40px",
                      height: "4px",
                      background: colors.accent,
                      borderRadius: "2px",
                    }}
                  />
                  <div
                    style={{
                      width: "0",
                      height: "0",
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      borderLeft: `15px solid ${colors.accent}`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG Image Error:", error);

    // Return a fallback error image
    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: "700",
            color: "#ffffff",
          }}
        >
          Error generating image
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
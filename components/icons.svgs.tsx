import React, { memo } from "react";
import { cn } from "@/utils/cn";

export type IconName =
  | "github"
  | "graph"
  | "external-link"
  | "x"
  | "briefcase"
  | "tournament"
  | "user-circle"
  | "music"
  | "home"
  | "brand-twitch"
  | "brand-instagram"
  | "mail"
  | "brand-linkedin"
  | "sun"
  | "moon"
  | "layout-navbar-collapse"
  | "check"
  | "chevron-right"
  | "circle"
  | "arrow-left"
  | "arrow-right"
  | "close"
  | "brand-fiverr"
  | "calendar"
  | "clock"
  | "clock-1"
  | "clock-2"
  | "clock-3"
  | "clock-4"
  | "clock-alarm"
  | "clock-check"
  | "clock-pause"
  | "clock-play"
  | "clock-stop"
  | "clock-reset"
  | "hourglass"
  | "timer"
  | "stopwatch";

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  title?: string;
  color?: string;
  strokeWidth?: number;
}

const iconPaths: Record<IconName, React.ReactNode> = {
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  "clock-1": (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 8 14" />
    </>
  ),
  "clock-2": (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 16" />
    </>
  ),
  "clock-3": (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 7 12" />
    </>
  ),
  "clock-4": (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 10" />
    </>
  ),
  "clock-alarm": (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2" />
      <path d="M5 3L2 6" />
      <path d="M22 6l-3-3" />
      <path d="M6 19l-2 2" />
      <path d="M18 19l2 2" />
    </>
  ),
  "clock-check": (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
      <path d="M22 4L12 14l-3-3" />
    </>
  ),
  "clock-pause": (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="10" y1="9" x2="10" y2="15" />
      <line x1="14" y1="9" x2="14" y2="15" />
    </>
  ),
  "clock-play": (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </>
  ),
  "clock-stop": (
    <>
      <circle cx="12" cy="12" r="10" />
      <rect x="9" y="9" width="6" height="6" />
    </>
  ),
  "clock-reset": (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
      <path d="M4 4v7h7" />
    </>
  ),
  hourglass: (
    <>
      <path d="M22 6H2v4l8 4-8 4v4h20v-4l-8-4 8-4V6z" />
      <path d="M12 10v8" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 3" />
      <path d="M12 2v4" />
      <path d="M12 14h4" />
    </>
  ),
  stopwatch: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2" />
      <path d="M12 2v4" />
      <path d="M4 13h2" />
      <path d="M18 13h2" />
      <path d="M12 17v2" />
    </>
  ),
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0c-2.4-1.6-3.5-1.3-3.5-1.3a4.2 4.2 0 00-.1 3.2 4.6 4.6 0 00-1.3 3.2c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2v3.5" />
  ),
  graph: (
    <>
      <path d="M4 19h16" />
      <path d="M4 15l4-6 4 2 4-5 4 4" />
    </>
  ),
  "external-link": (
    <>
      <path d="M11 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-5" />
      <path d="M10 14l10-10" />
      <path d="M15 4h5v5" />
    </>
  ),
  x: (
    <>
      <path d="M4 4l11.733 16h4.267L8.267 4z" />
      <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
    </>
  ),
  briefcase: (
    <>
      <path d="M3 9a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </>
  ),
  tournament: (
    <>
      <path d="M5 4h4a1 1 0 011 1v4a1 1 0 01-1 1H5V4z" />
      <path d="M5 14h4a1 1 0 011 1v4a1 1 0 01-1 1H5v-6z" />
      <path d="M10 7h4a1 1 0 011 1v8a1 1 0 01-1 1h-4V7z" />
      <path d="M15 12h4a1 1 0 011 1v6a1 1 0 01-1 1h-4v-8z" />
      <path d="M5 5v3M5 15v3M10 8v6M15 13v5" />
      <path d="M5 9h5M5 19h5M10 14h5M15 19h5" />
    </>
  ),
  "user-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.168 18.849A4 4 0 0110 16h4a4 4 0 013.834 2.855" />
    </>
  ),
  music: (
    <>
      <circle cx="6" cy="17" r="3" />
      <circle cx="16" cy="17" r="3" />
      <path d="M9 17V4h10v13" />
      <path d="M9 8h10" />
    </>
  ),
  home: <path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />,
  "brand-twitch": (
    <path d="M4 5v11a1 1 0 001 1h2v4l4-4h5.584c.266 0 .52-.105.707-.293l2.415-2.414c.187-.188.293-.442.293-.708V5a1 1 0 00-1-1h-14a1 1 0 00-1 1zm12 3v4M9 8v4" />
  ),
  "brand-instagram": (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3" />
      <path d="M16.5 7.5v.001" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  "brand-fiverr": (
    <path d="M15.3 5.3c0-2.1-1.7-3.8-3.8-3.8-1.8 0-3.3 1.3-3.7 2.9H2.6C1.2 4.4 0 5.6 0 7s1.2 2.6 2.6 2.6h5.2c.4 1.6 1.9 2.9 3.7 2.9 2.1 0 3.8-1.7 3.8-3.8 0-.7-.2-1.4-.6-2 .4-.6.6-1.3.6-2zM11.5 3c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3S10.2 3 11.5 3zM2.6 8.1c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1h4.7c0 .2-.1.4-.1.6 0 .6.1 1.1.3 1.6H2.6zm8.9 2.9c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3z" />
  ),
  "brand-linkedin": (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 11v5M8 8v.01M12 16v-5" />
      <path d="M16 16v-3a2 2 0 00-4 0" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M3 12h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7" />
    </>
  ),
  moon: <path d="M12 3h.393a7.5 7.5 0 007.92 12.446A9 9 0 1112 2.992z" />,
  "layout-navbar-collapse": (
    <>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  "chevron-right": <polyline points="9 18 15 12 9 6" />,
  circle: <circle cx="12" cy="12" r="10" />,
  "arrow-left": <path d="M19 12H5M12 19l-7-7 7-7" />,
  "arrow-right": <path d="M5 12h14M12 5l7 7-7 7" />,
  close: <path d="M18 6L6 18M6 6l12 12" />,
};

export const Icon: React.FC<IconProps> = memo(
  ({ name, className, size = 24, title, color, strokeWidth = 2 }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cn("inline-block", className)}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth}
        stroke={color || "currentColor"}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden={title ? "false" : "true"}
        role={title ? "img" : "presentation"}
      >
        {title && <title>{title}</title>}
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        {iconPaths[name]}
      </svg>
    );
  }
);

Icon.displayName = "Icon";

export default Icon;

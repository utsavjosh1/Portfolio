"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons.svgs";
import { motion } from "framer-motion";

export default function CalendarButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isCalApiLoaded, setIsCalApiLoaded] = useState(false);

  useEffect(() => {
    // Load Cal API script dynamically
    const script = document.createElement("script");
    script.src = "https://cal.com/embed.js";
    script.async = true;
    script.onload = () => setIsCalApiLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSchedule = () => {
    if (typeof window !== "undefined" && (window as any).Cal) {
      (window as any).Cal("ui", {
        styles: { branding: { brandColor: "#3366FF" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      (window as any).Cal("openDefaultSchedulePage");
    }
  };

  return (
    <motion.div initial="idle" animate={isHovered ? "hovered" : "idle"}>
      <Button
        onClick={handleSchedule}
        variant="default"
        size="lg"
        className={`relative overflow-visible transition-colors duration-300 ${
          isHovered
            ? "bg-[#3366FF] hover:bg-[#3366FF]/90"
            : "bg-primary hover:bg-primary/90"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={!isCalApiLoaded}
      >
        <motion.div
          className="flex items-center space-x-2 px-4 py-2"
          variants={{
            idle: { x: 0 },
            hovered: { x: -10 },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <span className="font-medium whitespace-nowrap">
            Schedule Meeting
          </span>
          <motion.div
            variants={{
              idle: { rotate: 0 },
              hovered: { rotate: 360 },
            }}
            transition={{ duration: 0.5 }}
          >
            <Icon name="calendar" className="w-6 h-6" />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute right-2"
          variants={{
            idle: { x: 20, opacity: 0 },
            hovered: { x: 0, opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Icon name="arrow-right" className="w-6 h-6" />
        </motion.div>
      </Button>
    </motion.div>
  );
}

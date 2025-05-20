"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

interface StatItemProps {
  icon: ReactNode;
  text: string;
}

export function StatItem({ icon, text }: StatItemProps) {
  return (
    <motion.div
      className="flex items-center gap-2 text-sm text-muted-foreground"
      whileHover={{
        scale: 1.02,
        color: "var(--primary)",
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      <span className="text-primary">{icon}</span>
      <span>{text}</span>
    </motion.div>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/icons.svgs";
import { Button } from "@/components/ui/button";

const FreelanceConnect: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial="idle"
      whileHover="hovered"
      animate={isHovered ? "hovered" : "idle"}
    >
      <Button
        asChild
        variant="default"
        size="lg"
        className={`relative overflow-visible transition-colors duration-300 ${
          isHovered
            ? "bg-[#1dbf73] hover:bg-[#1dbf73]/90"
            : "bg-primary hover:bg-primary/90"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a
          href="https://www.fiverr.com/joshiutsav"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2"
        >
          <motion.div
            className="flex items-center space-x-1 whitespace-nowrap"
            variants={{
              idle: { x: 0 },
              hovered: { x: -20 },
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className="font-medium">Hire Me on Fiverr</span>
          </motion.div>
          <motion.div
            className="absolute right-2"
            variants={{
              idle: { x: 30, opacity: 0 },
              hovered: { x: 0, opacity: 1 },
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Icon name="arrow-right" className="w-6 h-6" />
          </motion.div>
        </a>
      </Button>
    </motion.div>
  );
};

export default FreelanceConnect;

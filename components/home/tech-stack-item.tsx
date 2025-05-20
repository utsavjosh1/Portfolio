"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface TechStackItemProps {
  name: string;
  icon: string;
  index: number;
}

export function TechStackItem({ name, icon, index }: TechStackItemProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-3 rounded-lg border border-border bg-white transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        y: isLoaded ? 0 : 20,
        transition: {
          delay: index * 0.05,
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      }}
      whileHover={{
        scale: 1.05,
      }}
    >
      <div className="relative h-12 w-12 mb-2">
        <Image
          src={icon || "/placeholder.svg"}
          alt={`${name} icon`}
          width={48}
          height={48}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <span className="text-sm text-black font-medium">{name}</span>
    </motion.div>
  );
}

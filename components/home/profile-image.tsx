"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProfileImageProps {
  avatar: string;
}

export function ProfileImage({ avatar }: ProfileImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden border-2 border-primary/50"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 15,
          mass: 1,
        },
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 15px rgba(var(--primary-rgb), 0.5)",
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      <Image
        src={avatar || "/placeholder.svg"}
        alt="Profile picture"
        width={128}
        height={128}
        priority
        className={`object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setIsLoaded(true)}
      />
    </motion.div>
  );
}

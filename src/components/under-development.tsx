"use client";
import React from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function SpotlightPreview({ text }: { text: string }) {
  const router = useRouter();

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { yoyo: Infinity, duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="h-screen w-full flex items-center justify-center bg-white dark:bg-[#111111] antialiased relative text-black dark:text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="currentColor" // Adjusting the fill color for light/dark mode
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full flex flex-col items-center justify-center">
        <motion.h1
          className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-black dark:from-neutral-50 to-gray-400 dark:to-neutral-400 bg-opacity-50 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {text}
        </motion.h1>
        <div className="mt-6 flex justify-center gap-4">
          <motion.button
            onClick={() => router.push("/")}
            className="bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            whileHover="hover"
            variants={buttonVariants}
          >
            Go to Home
          </motion.button>
          <motion.button
            onClick={() => router.push("/about")}
            className="bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            whileHover="hover"
            variants={buttonVariants}
          >
            About Me
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

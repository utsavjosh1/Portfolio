"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";

const Banner = ({ text }: { text: string  }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="fixed top-0 left-0 w-full bg-black text-white text-center flex items-center"
      >
        <span className="flex-grow">{text}</span>
        <button
          onClick={handleClose}
          className="text-white bg-transparent border-none p-2 ml-4"
          aria-label="Close"
        >
          <IconX />
        </button>
      </motion.div>
    )
  );
};

export default Banner;

"use client";

import React from "react";
import { motion } from "framer-motion";

const NotOpen = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
        style={{ zIndex: 10 }}
      >
        <span className="text-white text-lg font-semibold">Not Available for now</span>
      </motion.div>
      <motion.div
        className="relative z-20"   
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default NotOpen;

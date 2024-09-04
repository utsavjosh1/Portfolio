import React from "react";
import { motion } from "framer-motion";
import IITMLogo from "../../../public/IITM.png";
import Image from "next/image";

const work = () => {
  return (
    <motion.section
      className="mb-12 w-full text-black dark:text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-left">Work</h2>
      <p className="mb-6 text-left">
        I started my career freelancing for client&apos;s, building web apps.
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <Image src={IITMLogo} alt="IITM Logo" className="w-8 h-8 mr-4" />
          <div className="flex-1">
            <p className="font-semibold">Backend Intern</p>
            <p className="text-sm text-gray-500">IIT Madras</p>
          </div>
          <p className="text-gray-400"> Present</p>
        </div>
      </div>
    </motion.section>
  );
};

export default work;

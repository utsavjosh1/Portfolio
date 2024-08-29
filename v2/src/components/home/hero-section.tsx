"use client";

import React from "react";
import Image from "next/image";
import {
  IconBrandGithub,
  IconGraph,
  IconExternalLink,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col items-center md:items-start justify-start w-full md:w-[50%] dark:bg-[#111111] dark:text-white">
      {/* Name Section */}
      <motion.div
        className="text-2xl md:text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        Utsav Joshi
      </motion.div>

      {/* Subtitle Section */}
      <motion.div
        className="flex justify-center md:justify-start items-center space-x-2 mt-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
      >
        <span>Diligence</span>
        <span>&#8226;</span>
        <span>Developer</span>
        <span>&#8226;</span>
        <span>Dynamism </span>
      </motion.div>

      {/* Image and Stats Section */}
      <motion.div
        className="flex lg:flex-row md:flex-col items-center justify-center mt-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
      >
        <Image
          src="https://avatars.githubusercontent.com/u/98454866?v=4"
          alt="logo"
          width={100}
          height={100}
          className="rounded-full border mb-5 md:mb-0"
          quality={100}
          loading="lazy"
        />
        <div className="flex flex-col items-center md:items-start justify-start gap-5 md:ml-7">
          <div className="flex gap-4 items-start justify-center md:justify-start">
            <IconBrandGithub stroke={2} />
            <span>41 repository on GitHub</span>
          </div>
          <div className="flex gap-4 items-start justify-center md:justify-start">
            <IconGraph stroke={2} />
            <span>500 views on blogs</span>
          </div>
        </div>
      </motion.div>

      {/* Quote and Links Section */}
      <motion.div
        className="mt-5 text-center md:text-left"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
      >
        <blockquote className="text-lg italic border-l-4 pl-4 mt-2 border-gray-300 dark:bg-gray-800 p-3">
          Coding since birth, now, till death.
        </blockquote>
        <Link href={"/links"}>
          <span className="inline-flex items-center gap-2 mt-5 rounded-md transition-colors duration-300">
            <IconExternalLink />
            <span className="text-lg">More ways to connect</span>
          </span>
        </Link>
      </motion.div>
    </div>
  );
};

export default HeroSection;

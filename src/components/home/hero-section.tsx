"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  IconBrandGithub,
  IconGraph,
  IconExternalLink,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getImages } from "@/config/firebase";

const HeroSection = () => {
  const [Logo, setLogo] = useState("");

  useEffect(() => {
    getImages("Me.jpg")
      .then((url) => {
        setLogo(url);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  return (
    <div>
      {/* Name Section */}
      <motion.div
        className="text-2xl md:text-3xl font-bold text-left w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        Utsav Joshi
      </motion.div>

      {/* Subtitle Section */}
      <motion.div
        className="flex flex-wrap justify-start items-center w-full space-x-2 mt-2 text-left"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
      >
        <span>Diligence</span>
        <span>&#8226;</span>
        <span>Developer</span>
        <span>&#8226;</span>
        <span>Dynamism</span>
      </motion.div>

      {/* Image and Stats Section */}
      <motion.div
        className="flex flex-col lg:flex-row items-start lg:items-center justify-start w-full mt-5 text-left lg:text-left"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
      >
        {/* Render the image only if the URL is available */}
        <Image
          src={Logo}
          alt="logo"
          width={100}
          height={100}
          className="rounded-full mb-5 lg:mb-0"
          quality={100}
          priority={true}
        />
        <div className="flex flex-col items-start gap-5 lg:ml-7">
          <div className="flex gap-4 items-center text-sm md:text-base">
            <IconBrandGithub stroke={2} />
            <span>41 repositories on GitHub</span>
          </div>
          <div className="flex gap-4 items-center text-sm md:text-base">
            <IconGraph stroke={2} />
            <span>500 views on blogs</span>
          </div>
        </div>
      </motion.div>

      {/* Quote and Links Section */}
      <motion.div
        className="mt-5 text-left w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
      >
        <blockquote className="text-lg italic border-l-4 pl-4 mt-2 border-gray-300 dark:border-gray-700 p-3">
          Coding since birth, now, till death.
        </blockquote>
        <Link href={"/links"}>
          <span className="inline-flex items-center gap-2 mt-5 rounded-md transition-colors duration-300 md:text-lg lg:text-base">
            <IconExternalLink />
            <span>More ways to connect</span>
          </span>
        </Link>
      </motion.div>
    </div>
  );
};

export default HeroSection;

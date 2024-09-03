"use client";

import React from "react";
import ImageGridSection from "@/components/image-grid";
import ConnectSection from "@/app/about/connect";
import { motion } from "framer-motion";
import Link from "next/link";
import Work from "@/app/about/work";



const AboutMe = () => (
  <div className="relative flex flex-col items-start pt-14 w-full max-w-screen-lg mx-auto dark:bg-[#111111] dark:text-white transition-colors duration-300 px-4 sm:px-6 lg:px-8">
    {/* Image Grid Section */}
    <ImageGridSection />

    {/* About Section */}
    <motion.section
      className="mb-12 w-full mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
    >
      <h2 className="text-4xl font-bold mb-4 text-left">Hey, I&apos;m Utsav!</h2>
      <p className="text-gray-600 mb-6 text-left">
        <span className="font-semibold">IPA /ʊt̪.səʋ/ •</span>
        <span className="mx-2">ಉತ್ಸವ •</span>
        <span className="mx-2">উৎসব •</span>
        <span className="mx-2">ウツァフ</span>
      </p>
      <p className="mb-4 text-left">
        But I go by joKeR for short. joKeR is my favorite movie. You&apos;ll
        probably remember it.
      </p>
      <p className="mb-4 text-left">
        I love building cool things with code, and I&apos;m passionate about
        engineering, history, and hardware.
      </p>
      <p className="mb-4 text-left">
        I write on my{" "}
        <Link href="/content" className="underline text-blue-500">
          blog
        </Link>{" "}
        about computers, life, and anything that piques my interest.
      </p>
      <p className="text-left">
        When I&apos;m not at my desk, I&apos;m probably listening to{" "}
        <Link href="/music" className="underline text-blue-500">
          music,
        </Link>
        reading books, or exploring with no specific destination in mind{" "}
        {":)"}
      </p>
    </motion.section>

    {/* Work Section */}
    <Work />

    {/* Connect Section */}
    <ConnectSection />
  </div>
);

export default AboutMe;

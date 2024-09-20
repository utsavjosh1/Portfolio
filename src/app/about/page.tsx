"use client";

import React from "react";
import ImageGridSection from "@/components/image-grid";
import ConnectSection from "@/app/about/connect";
import { motion } from "framer-motion";
import Link from "next/link";
import Work from "@/app/about/work";


const AboutMe = () => (
  <div className="relative flex flex-col items-start justify-start pt-14 h-full w-full mx-auto text-black dark:bg-[#111111] dark:text-[#E0E0E0] px-4 sm:px-6 lg:px-8 max-w-2xl">
    {/* Image Grid Section */}
    <ImageGridSection />

    {/* About Section */}
    <motion.section
      className="mb-12 w-full mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
    >
      <h2 className="text-4xl font-bold mb-4 text-left">
        Hey, I&apos;m Utsav!
      </h2>
      <p className="text-gray-600 mb-6 text-left">
        <span className="font-semibold">IPA /ʊt̪.səʋ/ •</span>
        <span className="mx-2">ಉತ್ಸವ •</span>
        <span className="mx-2">উৎসব •</span>
        <span className="mx-2">ウツァフ</span>
      </p>
      <p className="mb-4 text-left">
        Online, I go by <span className="font-semibold">joKeR</span>. It&lsquo;s been
        my online persona for a while, and yes, it&lsquo;s partly inspired by my
        favorite movie! Chances are, you&lsquo;ll remember it too.
      </p>
      <p className="mb-4 text-left">
        I&lsquo;m passionate about building cool things with code, exploring
        cutting-edge technology, and diving deep into GenAI. It&lsquo;s what drives me
        every day.
      </p>
      <p className="mb-4 text-left">
        On my{" "}
        <Link href="/content" className="underline text-blue-500">
          blog
        </Link>
        , I share my thoughts on technology, life, and anything that sparks my
        curiosity.
      </p>
      <p className="text-left">
        When I&lsquo;m not coding, you&lsquo;ll find me listening to{" "}
        <Link href="/music" className="underline text-blue-500">
          music
        </Link>{" "}
        with a scenic view, reading a good book, or wandering without a specific
        destination in mind. {":)"}
      </p>
    </motion.section>

    {/* Work Section */}
    <Work />

    {/* Connect Section */}
    <ConnectSection />
  </div>
);

export default AboutMe;

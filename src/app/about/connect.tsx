"use client";

import { motion } from "framer-motion";
import React from "react";
import { Icon } from "@/components/icons.svgs";
import Link from "next/link";

const ConnectSection = () => (
  <motion.section
    className="w-full  text-black dark:text-[#E0E0E0]"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeInOut", delay: 0.8 }}
  >
    <h2 className="text-xl font-semibold mb-4 text-left">Connect</h2>
    <p className="mb-6 text-left">
      Have a question or just want to chat? Feel free to{" "}
      <Link
        href="mailto:utsavjoshi602@gmail.com"
        className="underline text-blue-500 dark:text-blue-400"
      >
        text me
      </Link>
      . Try finding me anywhere else at @joshiUtsav.
    </p>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 group">
      <div className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition group-hover:opacity-50 hover:!opacity-100 dark:border-gray-600">
        <Link
          href="mailto:utsavjoshi602@gmail.com"
          className="flex items-center"
        >
          <Icon name="mail" className="mr-2" />
          <span>Email</span>
        </Link>
      </div>
      <div className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition group-hover:opacity-50 hover:!opacity-100 dark:border-gray-600">
        <Link
          href="https://www.linkedin.com/in/joshi-utsav/"
          className="flex items-center"
        >
          <Icon name="brand-linkedin" className="mr-2" />
          <span>LinkedIn</span>
        </Link>
      </div>
      <div className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition group-hover:opacity-50 hover:!opacity-100 dark:border-gray-600">
        <Link
          href="https://instagram.com/joshi___utsav/"
          className="flex items-center"
        >
          <Icon name="brand-instagram" className="mr-2" />
          <span>Instagram</span>
        </Link>
      </div>
      <div className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition group-hover:opacity-50 hover:!opacity-100 dark:border-gray-600">
        <Link href="https://twitch.tv/1xki11er/" className="flex items-center">
          <Icon name="brand-twitch" className="mr-2" />
          <span>Twitch</span>
        </Link>
      </div>
    </div>
  </motion.section>
);

export default ConnectSection;

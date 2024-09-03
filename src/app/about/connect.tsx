"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  IconBrandTwitch,
  IconBrandInstagram,
  IconMail,
  IconBrandGithub,
} from "@tabler/icons-react";
import Link from "next/link";

const ConnectSection = () => (
  <motion.section
    className="mt-8 w-full mb-24"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeInOut", delay: 0.8 }}
  >
    <h2 className="text-xl font-semibold mb-4 text-left">Connect</h2>
    <p className="mb-6 text-left">
      Have a question or just want to chat? Feel free to {" "}
      <Link
      href="mailto:utsavjoshi602@gmail.com"
        className="underline text-blue-500"
      >
        text me
      </Link>
      . Try finding me anywhere else at @joshiUtsav.
    </p>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Link
        href="mailto:utsavjoshi602@gmail.com"
        className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-100 transition"
      >
        <IconMail className="mr-2" /> Email
      </Link>
      <Link
        href="https://github.com/joshiUtsav/"
        className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-100 transition"
      >
        <IconBrandGithub className="mr-2" /> GitHub
      </Link>
      <Link
        href="https://instagram.com/joshi___utsav/"
        className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-100 transition"
      >
        <IconBrandInstagram className="mr-2" /> Instagram
      </Link>
      <Link
        href="https://twitch.tv/1xki11er/"
        className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-100 transition"
      >
        <IconBrandTwitch className="mr-2" /> Twitch
      </Link>
    </div>
  </motion.section>
);

export default ConnectSection;

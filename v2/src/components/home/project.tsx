"use client";

import React from "react";
import { LinkPreview } from "@/components/ui/link-provider";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";

// Project details array
const ProjectsDetails = [
  {
    name: "Foundme",
    description: "A Chatbot that queries details of the founders.",
    url: "https://foundme.vercel.app/",
  },
  {
    name: "Conversa",
    description:
      "A Conversa Chatbot where you create chatroom with your friends.",
    url: "https://conversa.vercel.app/",
  },
  {
    name: "Constcode",
    description: "A course management web application.",
    url: "https://constcode.vercel.app/",
  },
  {
    name: "Upay",
    description:
      "An online payment system for underaged students connected with parents.",
    url: "https://upay.vercel.app/",
  },
  {
    name: "Portfolio",
    description:
      "My personal portfolio where I showcase my projects, skills, and experience.",
    url: "https://joshiutsav.vercel.app/",
  },
];

export function Project() {
  return (
    <div className="flex flex-col justify-start items-start h-auto w-full md:w-[50%] py-10 px-6 md:px-0">
      <motion.div
        className="text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-white font-semibold flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.8 }}
      >
        <span>Building</span>
        <motion.span
          className="ml-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            duration: 1,
            delay: 1.4,
          }}
        >
          <span className="text-xl">.</span>
          <span className="text-xl">.</span>
          <span className="text-xl">.</span>
        </motion.span>
      </motion.div>

      <div className="mt-8 space-y-6 max-h-[24rem] overflow-y-auto">
        {ProjectsDetails.slice(0, 3).map((project, index) => (
          <motion.div
            key={project.name}
            className="text-neutral-600 dark:text-neutral-400 text-lg sm:text-xl max-w-3xl text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: 1.0 + index * 0.2,
            }}
          >
            <LinkPreview url={project.url}>
              <span className="flex items-center gap-2 hover:text-gray-800 dark:hover:text-white transition-colors duration-300">
                <span className="font-bold">{project.name}</span>
                <span className="mx-2 text-gray-500 dark:text-neutral-300">
                  &#8226;
                </span>
                <span className="text-gray-500 dark:text-neutral-300">
                  {project.description}
                </span>
              </span>
            </LinkPreview>
          </motion.div>
        ))}
        <Link
          href="/projects"
          className="text-gray-700 hover:text-blue-700 transition-colors duration-300"
        >
          <Button variant={"link"}>View All Projects</Button>
        </Link>
      </div>
    </div>
  );
}

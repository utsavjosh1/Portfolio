"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconBriefcase2,
  IconTournament,
  IconUserCircle,
  IconMusic,
} from "@tabler/icons-react";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Work",
      icon: (
        <IconBriefcase2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/work",
    },
    {
      title: "Content",
      icon: (
        <IconTournament className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/content",
    },
    {
      title: "Music",
      icon: (
        <IconMusic className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/music",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://twitter.com/joshi__utsav/",
    },
    {
      title: "Github",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/joshiUtsav/",
    },
    {
      title: "Me",
      icon: (
        <IconUserCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/about",
    },
  ];
  return (
    <div className="flex items-center justify-center">
      <FloatingDock mobileClassName="translate-y-0" items={links} />
    </div>
  );
}

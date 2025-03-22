"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  Icon
} from "@/components/icons.svgs";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Me",
      icon: (
        <Icon name="user-circle" className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/me",
    },
    {
      title: "Projects",
      icon: (
        <Icon name="briefcase" className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/projects",
    },
    {
      title: "Twitter",
      icon: (
        <Icon name="x" className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://twitter.com/joshi__utsav/",
    },
    {
      title: "Github",
      icon: (
        <Icon name="github" className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/joshiUtsav/",
    },
  ];
  return (
    <div className="flex items-center justify-center">
      <FloatingDock items={links} />
    </div>
  );
}

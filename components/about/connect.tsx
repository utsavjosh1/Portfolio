"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Icon, IconName } from "@/components/icons.svgs";
import { cn } from "@/utils/cn";
import { ANIMATION_DELAY, ANIMATION_DURATION } from "@/config/animation";

type SocialLink = {
  name: string;
  href: string;
  icon: IconName;
};

const SOCIAL_LINKS: SocialLink[] = [
  { name: "Email", href: "mailto:hi@joshiutsav.com", icon: "mail" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/utsavjosh1/",
    icon: "brand-linkedin",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/utsavjosh1/",
    icon: "brand-instagram",
  },
  { name: "Twitch", href: "https://twitch.tv/1xki11er/", icon: "brand-twitch" },
];

interface SocialLinkProps extends SocialLink {
  className?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  name,
  href,
  icon,
  className,
}) => (
  <li
    className={cn(
      "group-hover:opacity-50 hover:!opacity-100 dark:border-gray-600",
      className
    )}
  >
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center p-3 border rounded-lg",
        "hover:bg-gray-100 dark:hover:bg-gray-700 transition",
        "w-full"
      )}
      aria-label={name}
      target="_blank"
    >
      <Icon name={icon} className="mr-2" aria-hidden="true" />
      <span>{name}</span>
    </Link>
  </li>
);

export default function ConnectSection() {
  return (
    <motion.section
      className="w-full text-black dark:text-[#E0E0E0]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION_DURATION,
        ease: "easeInOut",
        delay: ANIMATION_DELAY,
      }}
    >
      <h2 className="text-xl font-semibold mb-4 text-left">Connect</h2>
      <p className="mb-6 text-left">
        Have a question or just want to chat? Feel free to{" "}
        <Link
          href="mailto:hi@joshiutsav.com"
          className="underline text-blue-500 dark:text-blue-400"
        >
          text me
        </Link>
        . Try finding me anywhere else at @utsavjosh1.
      </p>
      <ul className="grid grid-cols-2 gap-4 group">
        {SOCIAL_LINKS.map((link) => (
          <SocialLink key={link.name} {...link} />
        ))}
      </ul>
    </motion.section>
  );
}

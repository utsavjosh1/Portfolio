"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons.svgs";
import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
  HoverMotion,
} from "@/components/animation/motion-wrapper";

const LinkData = [
  {
    name: "Email(General)",
    url: "mailto:utsavjohshi602@gmail.com",
    icon: "mail",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/utsavjosh1/",
    icon: "instagram",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/utsavjosh1/",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/utsavjosh1",
    icon: "github",
  },
];

const SocialLink = () => {
  return (
    <div
      className="relative flex flex-col items-center h-full w-full mx-auto text-black dark:text-white"
      itemScope
      itemType="https://schema.org/Person"
    >
      <MotionWrapper
        className="flex flex-col items-center max-w-md"
        variant="fade-down"
        duration={0.8}
      >
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <HoverMotion scale={1.1} duration={0.5}>
            <Image
              src="https://avatars.githubusercontent.com/u/98454866?v=4"
              alt="Utsav Joshi - Software Engineer & Full Stack Developer"
              width={120}
              height={120}
              className="rounded-full border-2 border-primary/20 shadow-lg object-cover z-10 relative"
              quality={90}
              priority
              itemProp="image"
            />
          </HoverMotion>
        </div>

        <div
          className="text-2xl md:text-3xl font-bold my-4 text-black dark:text-white"
          itemProp="name"
        >
          <MotionWrapper variant="fade-up" delay={0.1}>
            Utsav Joshi
          </MotionWrapper>
        </div>

        <div
          className="text-lg text-center text-black dark:text-white mb-8 max-w-sm"
          itemProp="description"
        >
          <MotionWrapper variant="fade-up" delay={0.2}>
            Implements my thought on code. Find me elsewhere @utsavjosh1
          </MotionWrapper>
        </div>

        <StaggerContainer
          className="w-full space-y-4 mb-28"
          staggerChildren={0.1}
          delayChildren={0.3}
        >
          {LinkData.map((link, index) => (
            <StaggerItem key={index} variant="fade-up">
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                itemProp="sameAs"
              >
                <HoverMotion y={-5} className="group">
                  <div className="flex items-center justify-between bg-gray-200 dark:bg-[#222222] rounded-md text-black dark:text-white p-5 hover:bg-gray-300 dark:hover:bg-[#333333] transition-colors duration-300 shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </div>
                    <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                      <Icon name="external-link" className="w-5 h-5" />
                    </div>
                  </div>
                </HoverMotion>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </MotionWrapper>
    </div>
  );
};

export default SocialLink;

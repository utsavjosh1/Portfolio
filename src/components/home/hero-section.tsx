"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/icons.svgs";
import { getImage } from "@/app/api/firebase";
import gs from "github-scraper";

const ANIMATION_DURATION = 0.6;
const ANIMATION_DELAY_INCREMENT = 0.2;

interface SelectedData {
  name: string;
  avatar: string;
  repos: number;
}

const HeroSection: React.FC = () => {
  const [obj, setObj] = useState<SelectedData>({
    name: "",
    avatar: "",
    repos: 0,
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = "joshiutsav";
    gs(url, function (err, data) {
      if (err) {
        console.error(err);
      } else {
        const { name, avatar, repos } = data;
        setObj({ name, avatar, repos });
      }
    });
  }, []);

  const renderAnimatedSection = (
    content: React.ReactNode,
    delay: number = 0
  ) => (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DURATION, ease: "easeInOut", delay }}
    >
      {content}
    </motion.div>
  );

  return (
    <div className="space-y-5">
      {renderAnimatedSection(
        <h1 className="text-2xl md:text-3xl font-bold">{obj.name}</h1>
      )}

      {renderAnimatedSection(
        <div className="flex flex-wrap items-center space-x-2 text-sm md:text-base">
          {["Diligent", "Developer", "Dynamism"].map((trait, index) => (
            <React.Fragment key={trait}>
              {index > 0 && <span aria-hidden="true">•</span>}
              <span>{trait}</span>
            </React.Fragment>
          ))}
        </div>,
        ANIMATION_DELAY_INCREMENT
      )}

      {renderAnimatedSection(
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-5 lg:space-y-0 lg:space-x-7">
          {obj.avatar ? (
            <Image
              src={obj.avatar}
              alt="Utsav Joshi"
              width={100}
              height={100}
              className="rounded-full"
              quality={100}
              priority
            />
          ) : error ? (
            <div className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center text-red-500">
              Error
            </div>
          ) : (
            <div className="w-[100px] h-[100px] bg-gray-200 rounded-full animate-pulse" />
          )}
          <div className="space-y-3">
            <StatItem
              icon={<Icon name="github" />}
              text={`${obj.repos} repositories on GitHub`}
            />
            <StatItem icon={<Icon name="graph" />} text="500 views on blogs" />
          </div>
        </div>,
        ANIMATION_DELAY_INCREMENT * 2
      )}

      {renderAnimatedSection(
        <>
          <blockquote className="text-lg italic border-l-4 pl-4 border-gray-300 dark:border-gray-700 p-3">
            Coding since birth, now, till death.
          </blockquote>
          <Link
            href="/links"
            className="inline-flex items-center gap-2 mt-5 text-base md:text-lg transition-colors duration-300 hover:text-blue-500"
          >
            <Icon name="external-link" />
            <span>More ways to connect</span>
          </Link>
        </>,
        ANIMATION_DELAY_INCREMENT * 3
      )}
    </div>
  );
};

const StatItem: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => (
  <div className="flex items-center space-x-4 text-sm md:text-base">
    {icon}
    <span>{text}</span>
  </div>
);

export default HeroSection;

"use client";

import React, { useState, useEffect, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Icon } from "@/components/icons.svgs";
import fetchGithubData from "@/components/githubProfile";
import { GithubData } from "@/types/github";
import HeroSectionLoader from "@/components/home/hero-section-loader";
import { Button } from "@/components/ui/button";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Memoized StatItem component to prevent unnecessary re-renders
const StatItem = memo(({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <motion.div
    className="group flex items-center gap-4 text-base"
    whileHover={{ x: 4 }}
    transition={{ type: "spring", stiffness: 300, damping: 10 }}
  >
    <span className="text-muted-foreground group-hover:text-primary transition-colors duration-200">
      {icon}
    </span>
    <span className="font-medium group-hover:text-primary transition-colors duration-200">
      {text}
    </span>
  </motion.div>
));

StatItem.displayName = "StatItem";

// Profile Image component
const ProfileImage = memo(({ avatar }: { avatar: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300, damping: 10 }}
    className="relative group"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500" />
    <Image
      src={avatar}
      alt="Profile Picture"
      width={120}
      height={120}
      className="rounded-full border-2 border-background relative"
      quality={90}
      priority
    />
  </motion.div>
));

ProfileImage.displayName = "ProfileImage";

const HeroSection: React.FC = () => {
  const [githubData, setGithubData] = useState<GithubData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const data = await fetchGithubData({ username: "joshiutsav" });
        if (isMounted) {
          setGithubData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      {/* Profile Section */}
      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
      >
        {githubData?.avatar ? (
          <ProfileImage avatar={githubData.avatar} />
        ) : (
          <div className="w-[120px] h-[120px] bg-muted rounded-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        <div className="space-y-4">
          <StatItem
            icon={<Icon name="github" className="w-6 h-6" />}
            text={`${githubData?.repos || 0} repositories on GitHub`}
          />
          <StatItem
            icon={<Icon name="graph" className="w-6 h-6" />}
            text="500 views on blogs"
          />
        </div>
      </motion.div>

      {/* Quote Section */}
      <motion.div variants={item}>
        <blockquote className="pl-6 border-l-4 border-primary/50 italic text-xl font-medium text-muted-foreground">
          {githubData?.bio || "No bio available"}
        </blockquote>
      </motion.div>

      {/* Connect Button */}
      <motion.div variants={item}>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="group hover:bg-primary/5 transition-all duration-300"
        >
          <Link
            href="/socials"
            className="inline-flex items-center gap-3 text-lg"
          >
            <Icon
              name="external-link"
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5"
            />
            <span className="font-medium">More ways to connect</span>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
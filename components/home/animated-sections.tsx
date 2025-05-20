'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Icon } from '@/components/icons.svgs';
import { Button } from '@/components/ui/button';
import { ProfileImage } from '@/components/home/profile-image';
import { StatItem } from '@/components/home/stat-item';
import { TechStackItem } from '@/components/home/tech-stack-item';

import { PROFILE_DATA, TECH_STACK } from '@/config/constants';
import {
  fadeInUp,
  staggerContainer,
  techStackItem,
  buttonHover,
  linkUnderline,
} from '@/config/animations';

export function AnimatedHero() {
  return (
    <motion.section
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div 
        className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
        variants={fadeInUp}
      >
        <ProfileImage avatar={PROFILE_DATA.avatarUrl} />
        <Link href="https://github.com/utsavjosh1">
          <motion.div 
            className="space-y-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <StatItem
              icon={<Icon name="github" className="w-6 h-6" />}
              text={`${PROFILE_DATA.repoCount} repositories on GitHub`}
            />
            <StatItem
              icon={<Icon name="graph" className="w-6 h-6" />}
              text="500 views on blogs"
            />
          </motion.div>
        </Link>
      </motion.div>

      <motion.blockquote
        className="pl-6 border-l-4 border-primary/50 italic text-xl font-medium text-muted-foreground"
        variants={fadeInUp}
      >
        {PROFILE_DATA.bio}
      </motion.blockquote>

      <motion.div variants={fadeInUp}>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="group"
        >
          <Link href="/socials" className="inline-flex items-center gap-3 text-lg">
            <motion.div
              className="flex items-center gap-3"
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
            >
              <Icon name="external-link" className="w-5 h-5" />
              <span className="font-medium relative">
                More ways to connect
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  variants={linkUnderline}
                  initial="rest"
                  whileHover="hover"
                />
              </span>
            </motion.div>
          </Link>
        </Button>
      </motion.div>
    </motion.section>
  );
}

export function AnimatedTechStack() {
  return (
    <motion.section
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.h2 
        className="text-2xl font-bold"
        variants={fadeInUp}
      >
        Tech Stack
      </motion.h2>

      <motion.div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6"
        variants={staggerContainer}
      >
        {TECH_STACK.map((tech, index) => (
          <motion.div
            key={tech.name}
            custom={index}
            variants={techStackItem}
            whileHover="hover"
          >
            <TechStackItem
              name={tech.name}
              icon={tech.icon}
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export function AnimatedProjectsHeader() {
  return (
    <motion.div
      className="flex items-center justify-between"
      variants={fadeInUp}
    >
      <h2 className="text-2xl font-bold">Featured Projects</h2>
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="group"
      >
        <Link href="/projects" className="flex items-center gap-1">
          <motion.div
            className="flex items-center gap-1"
            variants={buttonHover}
            initial="rest"
            whileHover="hover"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </Link>
      </Button>
    </motion.div>
  );
} 
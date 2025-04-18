"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type AnimationVariant = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "zoom-in" 
  | "zoom-out" 
  | "bounce" 
  | "pulse";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: AnimationVariant;
  once?: boolean;
  threshold?: number;
}

export const MotionWrapper = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  variant = "fade-up",
  once = true,
  threshold = 0.1,
}: MotionWrapperProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(false);
  
  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Define animation variants
  const variants = {
    "fade-up": {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    "fade-down": {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 },
    },
    "fade-left": {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    },
    "zoom-in": {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    "zoom-out": {
      hidden: { opacity: 0, scale: 1.05 },
      visible: { opacity: 1, scale: 1 },
    },
    "bounce": {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
        }
      },
    },
    "pulse": {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: 0.5,
          repeat: 1,
          repeatType: "reverse" as const,
          repeatDelay: 0.2,
        }
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount:threshold }}
      variants={variants[variant]}
      transition={{ 
        duration, 
        delay, 
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
};

// Staggered container for creating staggered animations for children
export const StaggerContainer = ({
  children,
  className = "",
  delay = 0,
  staggerChildren = 0.1,
  delayChildren = 0,
  once = true,
  threshold = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
  threshold?: number;
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount:threshold }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delay,
            staggerChildren,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Item to be used inside StaggerContainer
export const StaggerItem = ({
  children,
  className = "",
  variant = "fade-up",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Define animation variants
  const variants = {
    "fade-up": {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    "fade-down": {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 },
    },
    "fade-left": {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    },
    "zoom-in": {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    "zoom-out": {
      hidden: { opacity: 0, scale: 1.05 },
      visible: { opacity: 1, scale: 1 },
    },
    "bounce": {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
        }
      },
    },
    "pulse": {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: 0.5,
          repeat: 1,
          repeatType: "reverse" as const,
          repeatDelay: 0.2,
        }
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants[variant]}
    >
      {children}
    </motion.div>
  );
};

// Hover animation wrapper
export const HoverMotion = ({
  children,
  className = "",
  scale = 1.05,
  rotate = 0,
  y = 0,
  x = 0,
  duration = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  rotate?: number;
  y?: number;
  x?: number;
  duration?: number;
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        rotate,
        y,
        x,
        transition: { duration },
      }}
    >
      {children}
    </motion.div>
  );
};

// Scroll progress indicator
export const ScrollProgress = ({ color = "bg-primary" }: { color?: string }) => {
  const [scrollYProgress, setScrollYProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / scrollHeight;
      setScrollYProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div 
        className={`h-full ${color}`} 
        style={{ width: `${scrollYProgress * 100}%` }}
      />
    </div>
  );
};

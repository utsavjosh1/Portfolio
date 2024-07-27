"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Renders a Framer Motion component that displays the name "Utsav Joshi" with a cool animation.
 * @returns {React.ReactElement} The rendered Framer Motion component.
 */
const FramerMotionComponent: React.FC = (): React.ReactElement => {
  const name: string = `Utsav Joshi`;

  const defaultAnimations: {
    hidden: {
      opacity: number;
    };
    visible: {
      opacity: number;
      y: number;
      transition: {
        duration: number;
      };
    };
  } = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <div className="pt-0 h-auto px-5 font-bold Name-color">
      <h2 className="text-7xl md:text-8xl">
        <span className="sr-only">{name}</span>
        <motion.span
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          aria-hidden
          ref={ref}
          transition={{ staggerChildren: 0.1 }}
        >
          {name.split(" ").map((word: string, key: number) => (
            <span key={key} className="inline-block">
              {word.split("").map((char: string, index: number) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={defaultAnimations}
                >
                  {char}
                </motion.span>
              ))}
              <span className="inline-block"> &nbsp; </span>
            </span>
          ))}
        </motion.span>
      </h2>
    </div>
  );
};

export default FramerMotionComponent;

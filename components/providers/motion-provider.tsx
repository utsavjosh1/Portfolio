'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { pageTransition } from '@/config/animations';

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.main
        className="space-y-16 relative"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
} 
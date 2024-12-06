"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons.svgs";

export default function NotFound() {
  return (
    <motion.div
      className="flex items-center justify-center py-12 bg-gradient-to-b from-background to-background/80 text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-6 max-w-md">
        <motion.h1
          className="text-6xl font-bold text-primary"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          404
        </motion.h1>
        <motion.h2
          className="text-3xl font-semibold"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          Page Not Found
        </motion.h2>
        <motion.p
          className="text-muted-foreground"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might
          have been moved or deleted.
        </motion.p>
        <motion.div
          className="pt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Link href="/" passHref>
            <Button variant="outline" size="lg" className="group">
              <motion.span
                className="mr-2"
                initial={{ x: 0 }}
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Icon name="arrow-left" />
              </motion.span>
              Return to Homepage
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

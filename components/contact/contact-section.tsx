"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact/contact-form";

export function ContactSection() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <h2 className="text-xl font-bold">Get in touch</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-card rounded-lg shadow-sm p-5 border"
      >
        <ContactForm />

        <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <a
              href="mailto:utsavjoshi602@gmail.com"
              className="hover:text-primary transition-colors"
            >
              utsavjoshi602@gmail.com
            </a>
            <span className="text-green-500">Delhi, India</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

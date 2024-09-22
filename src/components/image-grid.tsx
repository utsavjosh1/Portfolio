import { useState, useEffect } from "react";
import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getImages } from "@/config/firebase";

// Animation variants for the parent container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Slightly reduce stagger to improve perception of speed
    },
  },
};

// Animation variants for each image
const imageVariants = {
  hidden: {
    rotate: -5,
    x: -200,
    opacity: 0,
    willChange: "transform, opacity", 
  },
  visible: {
    rotate: 0,
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }, 
  },
};

const ImageGrid = () => {
  const [Logo, setLogo] = useState("");

  useEffect(() => {
    getImages("Me.jpg")
      .then((url) => {
        setLogo(url);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="relative overflow-hidden rounded-xl shadow-lg"
        variants={imageVariants}
        whileHover={{ scale: 1.05, rotate: 5, x: 0, y: -5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={Logo}
          alt={`Logo`}
          width={300}
          height={300}
          className="rounded-xl"
          priority={true}
        />
      </motion.div>
      {/* ))} */}
    </motion.div>
  );
};

export default memo(ImageGrid);

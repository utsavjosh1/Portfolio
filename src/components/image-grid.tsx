import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageLogo from "../../public/logo.png";
import Me from "../../public/Me.jpg";

// Placeholder images
const images = [Me, ImageLogo, Me, ImageLogo];

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
    willChange: "transform, opacity", // Optimize performance
  },
  visible: {
    rotate: 0,
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }, // Reduce duration for snappier animation
  },
};

const ImageGrid = () => {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {images.map((src, index) => (
        <motion.div
          key={index}
          className="relative overflow-hidden rounded-xl shadow-lg"
          variants={imageVariants}
          whileHover={{ scale: 1.05, rotate: 0, x: 0, y: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={src}
            alt={`Image ${index + 1}`}
            width={300}
            height={300}
            layout="responsive"
            objectFit="cover"
            className="rounded-xl"
            loading="lazy"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default memo(ImageGrid); // Memoize to prevent unnecessary re-renders

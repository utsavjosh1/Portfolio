import { motion } from "framer-motion";
import Image from "next/image";
import ImageLogo from "../../public/logo.png";
import Me from "../../public/Me.jpg";

// Placeholder images
const images = [Me, ImageLogo, Me, ImageLogo];

const ImageGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
      {images.map((src, index) => (
        <motion.div
          key={index}
          className="relative overflow-hidden rounded-xl shadow-lg"
          initial={{
            rotate: index % 2 === 0 ? -5 : 5,
            x: index % 2 === 0 ? -10 : 10,
            y: 0,
          }}
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
    </div>
  );
};

export default ImageGrid;

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
import ImageA from "../../../public/Me.jpg" 

interface Project {
  title: string;
  year: string;
  description: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    title: "Hydra",
    year: "2024",
    description: "A robust distributed task scheduler",
    imageUrl: ImageA,
  },
];

export const ProjectShowcase: React.FC = () => {
  return (
    <div className="max-w-4xl w-full mx-auto py-10">
      <motion.h1
        className="text-xl font-bold mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Build fast, Ship fast.
      </motion.h1>
      <motion.p
        className="text-lg text-gray-600 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Here are some of the projects I've worked on.
      </motion.p>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="overflow-hidden">
              <div className="p-0 flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-48 relative rounded-lg">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-full md:w-1/2 p-6">
                  <h2 className="text-2xl font-semibold mb-1">
                    {project.title}{" "}
                    <span className="text-gray-500">· {project.year}</span>
                  </h2>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import IITMLogo from "../../../public/IITM.png"; // Example image import
import NextbillLogo from "../../../public/NextbillIcon.ico";

const workExperiences = [
  {
    id: 1,
    title: "Backend Intern",
    company: "IIT Madras",
    logo: IITMLogo,
    period: "3 months",
  },
  {
    id: 2,
    title: "Software Engineer intern",
    company: "Nextbill",
    logo: NextbillLogo, 
    period: "Present",
  },
];

const Work = () => {
  return (
    <motion.section
      className="mb-12 w-full text-black dark:text-[#E0E0E0]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-left">Work</h2>
      <p className="mb-6 text-left">
        I started my career freelancing for clients, building web apps.
      </p>
      <div className="flex flex-col gap-4">
        {workExperiences.map((work) => (
          <div key={work.id} className="flex items-center">
            <Image
              src={work.logo}
              alt={`${work.company} Logo`}
              className="w-8 h-8 mr-4"
            />
            <div className="flex-1">
              <p className="font-semibold">{work.title}</p>
              <p className="text-sm text-gray-500">{work.company}</p>
            </div>
            <p className="text-gray-400">{work.period}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Work;

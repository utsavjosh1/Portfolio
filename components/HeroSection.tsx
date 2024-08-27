import FramerMotionComponent from "@/lib/FramerMotion";
import TypeWriterComponent from "@/lib/TypeWriter";
import React from "react";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8 lg:px-12 mt-5 text-center">
      <div className="p-3 px-5 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-color mb-4">
        Hi, I&apos;m
      </div>
      <FramerMotionComponent />
      <TypeWriterComponent />
      <div className="w-full max-w-3xl mx-auto text-slate-200 p-4 sm:p-6 md:p-8 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-justify">
        A Full-Stack Developer based in Delhi. I always aim for the best code
        quality and smooth coding. I&apos;m excited about using new technologies
        in my projects.
      </div>
    </div>
  );
};

export default HeroSection;

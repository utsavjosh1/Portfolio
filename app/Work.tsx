"use client";

import React, { useRef } from "react";
import ProjectCard from "@/components/ProjectCard";
import TitleTag from "@/components/Title";
import { projects } from "@/lib/data";

interface Project {
  p_name: string;
  link: string;
  img: string;
  techUsed: { name: string; img: string }[];
}

/**
 * Renders the "Project" section of the page.
 * @returns {React.ReactElement} The rendered "Project" section.
 */
const Project = (): React.ReactElement => {
  const projectContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (projectContainerRef.current) {
      projectContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (projectContainerRef.current) {
      projectContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const projectElements = projects.map((project: Project, index: number) => (
    <ProjectCard key={index} {...project} />
  ));

  return (
    <div className="mt-[5rem] p-4 md:w-[100%] md:h-full">
      <div className="flex justify-between items-center">
        <TitleTag tagName={"Projects"} />
        <button
          className="ml-4 p-2 bg-slate-800 text-white rounded-md"
          onClick={scrollLeft}
        >
          {"<"}
        </button>
        <button
          className="ml-4 p-2 bg-slate-800 text-white rounded-md"
          onClick={scrollRight}
        >
          {">"}
        </button>
      </div>
      <div
        className="flex md:flex-row overflow-x-auto no-scrollbar"
        ref={projectContainerRef}
      >
        {projectElements}
      </div>
    </div>
  );
};

export default Project;

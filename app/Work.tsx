import React from "react";
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
  const projectElements = projects.map((project: Project, index: number) => (
    <ProjectCard
      key={index}
      {...project}
    />
  ));

  return (
    <div className="mt-[5rem] p-4 md:w-[100%] md:h-full">
      <TitleTag tagName={"Projects"} />
      <div className="flex md:flex-row overflow-x-auto no-scrollbar">
        {projectElements}
      </div>
    </div>
  );
};

export default Project;

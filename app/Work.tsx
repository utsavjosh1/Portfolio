"use client";

import React from "react";
import TitleTag from "@/components/Title";
import Projects from "@/data/Projects-details";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Project as ProjectType } from "@/types";
import ProjectCard from "@/components/ProjectCard";

/**
 * Renders the "Project" section of the page.
 * @returns {React.ReactElement} The rendered "Project" section.
 */

const Project = (): React.ReactElement => {
  const projects: ProjectType[] = Projects;

  const project_items = projects.map((e) => (
    <CarouselItem key={e._id}>
      <ProjectCard
        _id={e._id}
        project_name={e.project_name}
        project_img={e.project_img}
        project_link={e.project_link}
        tech_used={e.tech_used}
        description=""
      />
    </CarouselItem>
  ));

  return (
    <>
      <div className="mt-[5rem] w-full h-full ">
        <TitleTag tagName="Projects" />
        <Carousel>
          <CarouselContent>{project_items}</CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default Project;

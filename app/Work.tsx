import React, { Fragment } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

const Work = () => {
  return (
    <div className="mt-[5rem] h-[auto] w-[360px]  md:w-[720px]">
      <div
        className="stroke-yellow-300 text-[5rem] md:text-[6rem] font-extrabold z-0 opacity-80  text-transparent"
        style={{
          strokeWidth: "1.5px",
          WebkitTextStrokeWidth: "1.9px",
          WebkitTextStrokeColor: "yellow",
        }}
      >
        {"<"}Work{" />"}
      </div>
      <div className="flex flex-col  justify-center m-auto md:flex-row">
        {/* PROJECTs*/}
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            p_name={project.p_name}
            link={project.link}
            img={project.img}
            techUsed={project.techUsed}
          />
        ))}
      </div>
    </div>
  );
};

export default Work;

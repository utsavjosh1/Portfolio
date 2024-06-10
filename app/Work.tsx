import React, { Fragment } from "react";
import Link from "next/link";
import ProjectCard from "../components/ProjectCard";

const Work = () => {
  const projects = [
    {
      p_name: "Course App",
      link: "https://github.com/JoshiUtsav/courseapp-frontend",
      img: "/project1.png",
      techUsed: [
        { name: "React JS", img: "/react.png" },
        { name: "Vercel", img: "/vercel.png" },
        { name: "Tailwind", img: "/tailwind.png" },
        { name: "MongoDB", img: "/mongodb.png" },
        { name: "Nodejs", img: "/node-js.png" },
        { name: "Express", img: "/express.png" },
      ],
    },
    {
      p_name: "Chat App",
      link: "https://github.com/JoshiUtsav/ChatApp",
      img: "/project1.png",
      techUsed: [
        { name: "HTML", img: "/react.png" },
        { name: "Vercel", img: "/vercel.png" },
        { name: "Tailwind", img: "/tailwind.png" },
        { name: "MongoDB", img: "/mongodb.png" },
        { name: "Nodejs", img: "/node-js.png" },
        { name: "Express", img: "/express.png" },
      ],
    },
  ];

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

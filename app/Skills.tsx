import React from "react";
import SkillsU from "../components/Skills";

const Skills = () => {
  const Skills = [
    {
      imgURL: "/js.png",
      Name: "JavaScript",
    },
    {
      imgURL: "/typescript.png",
      Name: "TypeScript",
    },
    {
      imgURL: "/tailwind.png",
      Name: "Tailwind ",
    },
    {
      imgURL: "/nextjs.png",
      Name: "Next JS",
    },
    {
      imgURL: "/react.png",
      Name: "React",
    },
    {
      imgURL: "/express.png",
      Name: "Express",
    },
    {
      imgURL: "/node-js.png",
      Name: "Node JS",
    },
    {
      imgURL: "/mongodb.png",
      Name: "MongoDB",
    },
    {
      imgURL: "/postgres.png",
      Name: "Postgres",
    },
    {
      imgURL: "/prisma.png",
      Name: "Prisma",
    },
    {
      imgURL: "/cloudfare.png",
      Name: "Cloudfare",
    },
    {
      imgURL: "/vercel2.png",
      Name: "Vercel",
    },
    {
      imgURL: "/mui.png",
      Name: "Material UI",
    },
    {
      imgURL: "/shadcn.png",
      Name: "Shadcn",
    },
    {
      imgURL: "/git.png",
      Name: "Git",
    },
    {
      imgURL: "/githubicon.png",
      Name: "GitHub",
    },
    {
      imgURL: "/postman.png",
      Name: "Postman",
    },
    {
      imgURL: "/photoshop.png",
      Name: "Photoshop",
    },
  ];
  return Skills.map((skills, key) => (
    <SkillsU key={key} name={skills.Name} img={skills.imgURL} />
  ));
};

export default Skills;

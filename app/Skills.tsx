"use client";

import { Skills_Details } from "@/lib/data";
import { SkillsUsed } from "@/components/ProjectCard";

const SkillsCard = () => {
  return (
    <div className="flex flex-wrap items-center justify-center">
      {Skills_Details.map((skill, index) => (
        <SkillsUsed key={index} name={skill.Name} img={skill.imgURL} />
      ))}
    </div>
  );
};

export default SkillsCard;

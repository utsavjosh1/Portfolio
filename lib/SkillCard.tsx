"use client";

import Skills_Details from "@/data/Skills-details";
import { SkillsUsed } from "@/components/ProjectCard";

export default function SkillsCard() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {Skills_Details.map((skills) => (
        <SkillsUsed key={skills._id} name={skills.Name} img={skills.imgURL} />
      ))}
    </div>
  );
}

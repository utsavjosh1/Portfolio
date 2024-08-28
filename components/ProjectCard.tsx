import Link from "next/link";
import Image from "next/image";
import type { Project as ProjectType, TechUsed as TechUsedType } from "@/types";

export default function ProjectCard({
  _id,
  project_name,
  project_img,
  project_link,
  tech_used,
  description,
}: ProjectType) {
  return (
    <div className="rounded-lg w-full h-full bg-slate-800 hover:bg-slate-900 duration-300 transition-all cursor-pointer">
      <Link
        target="_blank"
        href={project_link}
        className="text-[17px] text-slate-300 p-4 pb-2 text-center flex justify-center gap-2 "
      >
        <span>{project_name}</span>
        <span>
          <Image
            className="pt-1"
            width={18}
            height={18}
            src="/link.png"
            alt="uprightarrow"
          />
        </span>
      </Link>
      <hr className="w-[90%] mb-4 text-center m-auto text-slate-400 bg-slate-700  border-slate-600 " />
      <Image
        src={project_img}
        className="p-2 cursor-pointer rounded-lg opacity-75 hover:opacity-100 object-cover h-[15rem] w-full transition-all duration-200 "
        alt="img"
        width={500}
        height={500}
      />
      <div className="m-5  text-lg">
        <div className="text-lg text-slate-300 ">TECH USED: </div>
        <div className="flex flex-wrap ">
          {tech_used.map((tech, key) => (
            <SkillsUsed key={key} name={tech.name} img={tech.img} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a component that displays the name and image of a skill used in a project.
 * @param props - An object containing the name and image URL of the skill.
 * @returns A React functional component that displays the name and image of the skill.
 */
export const SkillsUsed: React.FC<TechUsedType> = ({ name, img }) => (
  <div className="bg-slate-100 text-sm rounded-lg w-[150px] flex justify-around items-center m-2 p-2">
    <div className="rounded-md ">
      <Image src={img} alt={name} width={25} height={25} />
    </div>
    <div>{name}</div>
  </div>
);

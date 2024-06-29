import Image from "next/image";

interface SkillsUsedProps {
  name: string;
  img: string;
}

/**
 * Renders a component that displays the name and image of a skill used in a project.
 * @param props - An object containing the name and image URL of the skill.
 * @returns A React functional component that displays the name and image of the skill.
 */
const SkillsUsedInProjects = ({ name, img }: { name: string; img: string }) => (
  <div className="text-black-300 bg-slate-100 text-sm opacity-80 rounded-lg w-[130px] flex justify-around items-center m-3 p-2">
    <div className="rounded-md ">
      <Image src={img} alt={name} width={20} height={20} />
    </div>
    <div>{name}</div>
  </div>
);

export default SkillsUsedInProjects;

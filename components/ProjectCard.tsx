import Link from "next/link";
import Image from "next/image";

interface ProjectsCardsProps {
  p_name: string;
  link: string;
  img: string;
  techUsed: { name: string; img: string }[];
}

const ProjectCard: React.FC<ProjectsCardsProps> = ({
  p_name,
  link,
  img,
  techUsed,
}) => {
  return (
    <div className="rounded-lg w-[330px] min-h-[300px] h-[505px] m-3 p-1 bg-slate-800 hover:bg-slate-900 duration-300 transition-all cursor-pointer">
      <Link target="blank" href={link}>
        <div className="text-[17px] text-slate-300 p-4 pb-2 text-center flex justify-center gap-2 ">
          <span>{p_name}</span>
          <span>
            <Image
              className="pt-1"
              width={18}
              height={18}
              src="/link.png"
              alt="uprightarrow"
            />
          </span>
        </div>
      </Link>
      <hr className="w-[90%] mb-4 text-center m-auto text-slate-400 bg-slate-700  border-slate-600 " />
      <div className="w-[95%] object-cover h-[auto] m-auto">
        <Image
          src={img}
          className="cursor-pointer rounded-md opacity-75 hover:opacity-100 h-[10rem] object-cover transition-all duration-200 "
          alt="img"
          width="500"
          height="18"
        />
      </div>
      <div className="m-2 text-lg ml-4 text-slate-300 mt-8">TECH USED</div>
      <div className="flex flex-wrap w-[400px]">
        {techUsed.map((tech, key) => (
          <SkillsUsed key={key} name={tech.name} img={tech.img} />
        ))}
      </div>
    </div>
  );
};
export default ProjectCard;

interface SkillsUsedProps {
  name: string;
  img: string;
}

/**
 * Renders a component that displays the name and image of a skill used in a project.
 * @param props - An object containing the name and image URL of the skill.
 * @returns A React functional component that displays the name and image of the skill.
 */
export const SkillsUsed: React.FC<SkillsUsedProps> = ({ name, img }) => (
  <div className="text-black-300 bg-slate-100 text-sm opacity-80 rounded-lg w-[130px] flex justify-around items-center m-3 p-2">
    <div className="rounded-md ">
      <Image src={img} alt={name} width={20} height={20} />
    </div>
    <div>{name}</div>
  </div>
);

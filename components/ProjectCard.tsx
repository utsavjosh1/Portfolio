import SkillsUsedInProjects from "./Skills";
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
              src="link.png"
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
        />
      </div>
      <div className="m-2 text-lg ml-4 text-slate-300 mt-8">TECH USED</div>
      <div className="flex flex-wrap w-[400px]">
        {techUsed.map((tech, key) => (
          <SkillsUsedInProjects key={key} name={tech.name} img={tech.img} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;

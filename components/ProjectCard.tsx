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
}: ProjectsCardsProps): JSX.Element => {
  return (
    <div className="rounded-lg w-[330px] min-h-[300px] h-[505px] m-3 p-1 bg-slate-800 hover:bg-slate-900 duration-300 transition-all cursor-pointer">
      <Link href={link} passHref>
        <a target="_blank" rel="noopener noreferrer" className="block">
          <div className="text-[17px] text-slate-300 p-4 pb-2 text-center flex justify-center gap-2">
            <span>{p_name}</span>
            <span className="pt-1">
              <Image
                width={18}
                height={18}
                src="/link.png" // Corrected src attribute
                alt="uprightarrow"
              />
            </span>
          </div>
        </a>
      </Link>
      <hr className="w-[90%] mb-4 text-center mx-auto text-slate-400 bg-slate-700 border-slate-600" />
      <div className="w-[95%] h-[10rem] mx-auto">
        <Image
          src={img}
          width={330}
          height={220} // Adjust height and width as needed
          className="cursor-pointer rounded-md opacity-75 hover:opacity-100 object-cover transition-opacity duration-200"
          alt={p_name}
        />
      </div>
      <div className="m-2 text-lg ml-4 text-slate-300 mt-8">TECH USED</div>
      <div className="flex flex-wrap max-w-[400px] mx-auto">
        {techUsed.map((tech, index) => (
          <SkillsUsedInProjects key={index} {...tech} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;

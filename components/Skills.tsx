import Image from "next/image";

interface SkillsUsedProps {
  name: string;
  img: string;
}

const SkillsUsedInProjects: React.FC<SkillsUsedProps> = ({ name, img }) => {
  return (
    <div className="text-black-300 bg-slate-100 text-sm opacity-80 rounded-lg w-[130px] flex justify-around items-center m-3 p-2">
      <div className="rounded-md ">
        <Image src={img} width={20} alt={name} />
      </div>
      <div>{name}</div>
    </div>
  );
};

export default SkillsUsedInProjects;

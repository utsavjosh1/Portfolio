const Skills: React.FC<SkillsUsedProps> = ({ name, img }) => {
  return (
    <div className="text-black-300 cursor-pointer bg-slate-100 opacity-80 rounded-lg border-[0.5px] border-opacity-40 w-[130px] flex justify-around gap-2 items-center m-3 flex-wrap hover:bg-slate-300 p-2 transition-all duration-200 ">
      <div className="rounded-md ">
        <img src={img} width={20} alt={name} />
      </div>
      <div>{name}</div>
    </div>
  );
};

export default Skills;

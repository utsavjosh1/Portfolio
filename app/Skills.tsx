import SkillsU from "@/components/Skills";
import Skills from "@/lib/data";

const SkillsCard = () => {
  return (
    <div className="flex flex-wrap items-center justify-center">
      {Skills.map((skills, key) => (
        <SkillsU key={key} name={skills.Name} img={skills.imgURL} />
      ))}
    </div>
  );
};

export default SkillsCard;

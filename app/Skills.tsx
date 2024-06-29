import SkillsU from "@/components/Skills";
import Skills from "@/lib/data";

const SkillsCard = () => (
  <div className="flex flex-wrap items-center justify-center">
    {Skills.map(({ Name, imgURL }, key) => (
      <SkillsU key={key} name={Name} img={imgURL} />
    ))}
  </div>
);

export default SkillsCard;

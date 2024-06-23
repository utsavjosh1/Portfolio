import SkillsU from "@/components/Skills";
import Skills from "@/lib/data";

const SkillsCard = () => {
  return Skills.map((skills, key) => (
    <SkillsU key={key} name={skills.Name} img={skills.imgURL} />
  ));
};

export default SkillsCard;

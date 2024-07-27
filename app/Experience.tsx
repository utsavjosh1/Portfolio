import TitleTag from "@/app/components/Title";

const Experience = () => {
  return (
    <div className="mt-[5rem] h-auto w-[405px] m-auto md:w-[720px]">
      <TitleTag tagName={"Experience"} />
      <div className="w-[100%] mt-10 mx-auto border md:p-2 border-opacity-70 rounded-md text-white border-slate-500">
        <div className="flex items-center justify-between">
          <li className="font-bold text-lg m-3">IIT Madras - Remote </li>
          <div className="px-2 text-white"> Jul 2024 - present </div>
        </div>
        <div className="mx-4 px-5 text-base">Backend Developer</div>
      </div>
    </div>
  );
};

export default Experience;

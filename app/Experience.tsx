import TitleTag from "@/components/Title";

const Experience = () => {
  return (
    <div className="mt-[5rem] w-full h-full relative">
      <TitleTag tagName={"Experience"} />
      <div className="w-full h-[80vh] p-2 border rounded-md border-slate-500 items-center justify-center">
        {/* Stream Line */}
        <div className="absolute h-[60vh] left-1/2 top-1/4 transform -translate-x-1/2 w-[2px] bg-gray-300"></div>

        <div className="relative flex items-center justify-center">
          {/* Circle Indicator */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gray-600 rounded-full border-2 border-white"></div>

          {/* Experience Content */}
          <div className="w-full flex flex-col m-16 text-sm text-white">
            <span className="font-extrabold text-lg">IIT Madras - Remote</span>
            <span>Jul 2024 - present</span>
            <div>Backend Developer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;

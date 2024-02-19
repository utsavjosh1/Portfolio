import React, { Fragment } from "react";
import Link from "next/link";

const SkillsUsed = ({ name, img }) => {
  return (
    <div className="text-slate-300 cursor-pointer rounded-lg border-[0.5px] border-opacity-40  border-gray-400 w-[130px] flex justify-around gap-2 items-center m-3 flex-wrap hover:bg-slate-800 p-2 transition-all duration-200 ">
      <div className="rounded-md ">
        <img src={img} width={24} alt={name} />
      </div>
      <div>{name}</div>
    </div>
  );
};

const Work = () => {
  return (
    <div className="mt-[5rem] h-[auto] w-[360px]  md:w-[720px] ">
      <div
        className="stroke-yellow-300 text-[5rem] md:text-[6rem] font-extrabold z-0 opacity-80  text-transparent"
        style={{
          strokeWidth: "1.5px",
          WebkitTextStrokeWidth: "1.9px",
          WebkitTextStrokeColor: "yellow",
        }}
      >
        {"<"}Work {"/>"}
      </div>
      <div className="flex flex-col  justify-center m-auto md:flex-row">
        {/* PROJECT 1 */}
        <div className="border-slate-700   border w-[330px] min-h-[300px] h-[505px] m-3 p-1 hover:bg-slate-900 duration-300 transition-all cursor-pointer  ">
          <div className="text-[17px] text-slate-300 p-4 pb-2 text-center flex justify-center gap-2 ">
            <span>Apna College Clone </span>
            <span>
              <a target="blank" href="https://apnacollege-clone.vercel.app/">
                <img className="pt-1" width={18} src="link.png" alt="" />
              </a>
            </span>
          </div>
          <hr className="w-[70%] mb-4 text-center m-auto text-slate-400 bg-slate-700  border-slate-600 " />
          <div className="w-[95%] object-cover h-[auto] m-auto  ">
            <img
              src="/project1.png"
              className="cursor-pointer opacity-75 hover:opacity-100 h-[10rem] object-cover transition-all duration-200 "
              alt=""
            />
          </div>
          <div className="m-2 text-lg ml-4 text-slate-300 mt-8">TECH USED </div>
          <div className="flex flex-wrap w-[400px]">
            <SkillsUsed name="React JS" img={"/react.png"} />
            <SkillsUsed name="Vercel" img={"/vercel.png"} />
            <SkillsUsed name="Tailwind" img={"/tailwind.png"} />
            <SkillsUsed name="Typescript" img={"/typescript.png"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;

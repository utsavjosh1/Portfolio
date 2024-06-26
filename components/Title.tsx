import React from "react";

interface TitleTagProps {
  tagName: string;
}

const TitleTag: React.FC<TitleTagProps> = ({ tagName }) => {
  return (
    <div
      className="stroke-yellow-300 text-[2rem] md:text-[4rem] w-[88%] font-extrabold opacity-80 text-transparent"
      style={{
        strokeWidth: "1.5px",
        WebkitTextStrokeWidth: "1.9px",
        WebkitTextStrokeColor: "yellow",
      }}
    >
      {"<" + tagName + " />"}
    </div>
  );
};

export default TitleTag;

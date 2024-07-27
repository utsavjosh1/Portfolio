"use client";

import React, { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/lib/ui/tabs";
import TitleTag from "@/app/components/Title";
import Image from "next/image";
import SkillsCard from "@/app/Skills";

/**
 * Renders the About Me section of the page.
 * @returns {React.ReactElement} The rendered About Me section.
 */
const AboutMe = (): React.ReactElement => {
  return (
    <div className="mt-[5rem] h-[auto] p-4">
      <TitleTag tagName={"About Me"} />
      <div className="border w-[100%] md:p-2 rounded-md border-slate-500 items-center justify-center">
        <Tabs defaultValue="1">
          <TabNav />
          <TabsContent value="1">
            <SkillsCard />
          </TabsContent>
          <TabsContent value="2">
            <div className="border-slate-700 border text-slate-300 bg-slate-800 bg-opacity-65 m-4 p-2  text-sm">
              <div className="p-3"> 🧑‍💻 Education</div>
              <div className="px-4 py-2">
                <ul>
                  <li> Bachelor of Computer Applications | 2023-2026</li>
                </ul>
              </div>
              <div className="px-4 py-2">IGNOU | Rajdhani College</div>
            </div>
          </TabsContent>
          <TabsContent value="3">
            <div className="border-slate-700 border bg-slate-800 bg-opacity-70 p-3 md:m-4 md:p-2 text-sm">
              <div className="p-3 text-white"> 🧑‍💻 Resume</div>
              <a href="PDF/RESUME.pdf" target="blank" download={true}>
                <div className="text-slate-300 px-4 py-2 flex gap-2">
                  <div>Download Resume</div>
                  <Image
                    src="/download.png"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    alt="resume-image"
                  />
                </div>
                <div className="m-auto  text-center items-center flex justify-center ">
                  <Image
                    src="/PDF/Iresume.png"
                    alt="resume"
                    width={400}
                    height={500}
                  />
                </div>
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

/**
 * Renders the tab navigation component for the About Me section.
 * @returns {React.ReactElement} The rendered tab navigation component.
 */
const TabNav: React.FC = (): React.ReactElement => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleTabClick = useCallback((value: string): void => {
    setActiveTab(value);
  }, []);

  return (
    <TabsList className="tabs-content bg-transparent transition duration-300  text-slate-400 text-[15px]">
      {["1", "2", "3"].map((value) => (
        <TabsTrigger
          key={value}
          value={value}
          className={`tabs-content ${
            activeTab === value ? "border-b-2 border-yellow-500" : ""
          }`}
          onClick={() => handleTabClick(value)}
        >
          {value === "1" ? "Skills" : value === "2" ? "Education" : "Resume"}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default AboutMe;

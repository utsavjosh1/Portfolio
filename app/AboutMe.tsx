"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TitleTag from "@/components/Title";
import Skills from "./Skills";

const AboutMe = () => {
  return (
    <div className="mt-[5rem] h-[auto] md:m-0 md:w-[100%]">
      <TitleTag tagName={"About Me"} />
      <div className="mt-10 border w-[100%] md:p-2 rounded-md border-slate-500 items-center justify-center">
        <div className="">
          <Tabs defaultValue="1">
            <TabNav />
            <TabsContent value="1">
              <div className="flex flex-wrap items-center justify-center">
                <Skills />
              </div>
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
              <div className="border-slate-700 border bg-slate-800 bg-opacity-65 w-[90%] md:m-4 md:p-2 text-sm">
                <div className="p-3 text-white"> 🧑‍💻 Resume</div>
                <a href="PDF/RESUME.pdf" target="blank" download={true}>
                  <div className="text-slate-300 px-4 py-2 flex gap-2">
                    <div>Download Resume</div>
                    <img
                      src="/download.png"
                      width={20}
                      className="cursor-pointer"
                    ></img>
                  </div>
                  <div className="m-auto  text-center items-center flex justify-center ">
                    <img
                      className="h-[500px] w-[400px]"
                      src="PDF/Iresume.png"
                      alt=""
                    />
                  </div>
                </a>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const TabNav = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <>
      <TabsList className="tabs-content bg-transparent transition duration-300  text-slate-400 text-[15px]">
        <TabsTrigger
          value="1"
          className={`tabs-content  ${
            activeTab === "1" ? "border-b-2 border-yellow-500" : ""
          }`}
          onClick={() => setActiveTab("1")}
        >
          Skills
        </TabsTrigger>
        <TabsTrigger
          value="2"
          className={`tabs-content ${
            activeTab === "2" ? "border-b-2 border-yellow-500" : ""
          }`}
          onClick={() => setActiveTab("2")}
        >
          Education
        </TabsTrigger>
        <TabsTrigger
          value="3"
          className={`tabs-content ${
            activeTab === "3" ? "border-b-2 border-yellow-500" : ""
          }`}
          onClick={() => setActiveTab("3")}
        >
          Resume
        </TabsTrigger>
      </TabsList>
    </>
  );
};

export default AboutMe;

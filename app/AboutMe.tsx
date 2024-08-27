"use client";

import React from "react";
import TitleTag from "@/components/Title";
import Image from "next/image";
import Link from "next/link";
import SkillsCard from "@/app/Skills";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Renders the About Me section of the page.
 * @returns {React.ReactElement} The rendered About Me section.
 */
export default function AboutMe(): React.ReactElement {
  return (
    <div className="mt-[5rem] w-full h-full">
      <TitleTag tagName={"About Me"} />
      <div className="w-ful h-[75vh] p-2 border rounded-md border-slate-500 items-center justify-center">
        <Tabs defaultValue="Skills">
          <TabsList className="bg-transparent text-white">
            <TabsTrigger
              value="Skills"
              className=" data-[state=active]:bg-transparent data-[state=active]:border-b-4"
            >
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="Education"
             className=" data-[state=active]:bg-transparent data-[state=active]:border-b-4"
            >
              🧑‍💻 Education
            </TabsTrigger>
            <TabsTrigger
              value="Resume"
            className=" data-[state=active]:bg-transparent data-[state=active]:border-b-4"
            >
              🧑‍💻 Resume
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Skills">
            <SkillsCard />
          </TabsContent>
          <TabsContent value="Education">
            <div className="border-slate-700 border text-slate-300 bg-slate-800 bg-opacity-65 m-4 p-2  text-sm">
              <div className="px-4 py-2">
                <ul>
                  <li> Bachelor of Computer Applications | 2023-2026</li>
                </ul>
              </div>
              <div className="px-4 py-2">IGNOU | Rajdhani College</div>
            </div>
          </TabsContent>
          <TabsContent value="Resume">
            <div className="relative flex p-3 md:m-4 md:p-2 text-sm items-center justify-between">
              <Link href="PDF/RESUME.pdf" target="_blank" download={true}>
                <div className=" p-4 text-black flex bg-white justify-between ">
                  <div>Download Resume</div>
                  <Image
                    src="/download.png"
                    width={20}
                    height={20}
                    alt="download-icon"
                    className="cursor-pointer"
                  />
                </div>
                <div className="p-4 text-white flex bg-black justify-between mt-4 border">
                  <div>Drive Link</div>
                  <Image
                    src="/link.png"
                    width={20}
                    height={20}
                    alt="download-icon"
                    className="cursor-pointer"
                  />
                </div>
              </Link>
              <Image
                src="/PDF/Iresume.png"
                alt="resume"
                width={350}
                height={450}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

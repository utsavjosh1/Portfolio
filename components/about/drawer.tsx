"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import SkillsCard from "@/lib/SkillCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import Education from "./education";

const Navigation = ["Skills", "Education", "Resume", "Experience"];

/**
 * Renders the About Me section of the page.
 * @returns {React.ReactElement} The rendered About Me section.
 */
export default function TabsButton(): React.ReactElement {
  return (
    <div className="w-full lg:h-[75vh] border rounded-md border-slate-500 flex flex-col lg:flex-row items-center justify-center">
      <Tabs defaultValue="Skills" className="w-full h-full p-2">
        <TabsList className="bg-slate-800 text-base flex justify-center">
          {Navigation.map((e) => (
            <TabsTrigger
              key={e}
              value={e}
              className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:rounded-md"
            >
              {e}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="Skills">
          <SkillsCard />
        </TabsContent>
        <TabsContent value="Education">
          <Education />
        </TabsContent>
        <TabsContent value="Resume">
          <div className="flex flex-col lg:flex-row sm:flex-col gap-4 items-center justify-between text-sm">
            <Button>
              <Link
                href="PDF/RESUME.pdf"
                target="_blank"
                download={true}
                className="flex flex-row items-center justify-between"
              >
                <span>Download Resume</span>
                <Image
                  src="/download.png"
                  width={20}
                  height={20}
                  alt="Download icon for the resume"
                  className="cursor-pointer"
                  loading="lazy"
                />
              </Link>
            </Button>
            <Button variant={"secondary"}>
              <Link
                href="https://drive.google.com"
                target="_blank"
                className="flex flex-row items-center justify-between gap-5"
              >
                <span>Drive Link</span>
                <Image
                  src="/link.png"
                  width={20}
                  height={20}
                  alt="Google Drive link icon"
                  className="cursor-pointer"
                />
              </Link>
            </Button>
            <Image
              src="/PDF/Iresume.png"
              alt="Preview of resume"
              width={350}
              height={450}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full md:w-auto md:max-w-xs lg:max-w-sm"
              loading="lazy"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

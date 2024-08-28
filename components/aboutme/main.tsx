"use client";

import React from "react";
import TitleTag from "@/components/Title";
import TabsButton from "@/components/aboutme/drawer";

/**
 * Renders the About Me section of the page.
 * @returns {React.ReactElement} The rendered About Me section.
 */
export default function AboutMe(): React.ReactElement {
  return (
    <div className="mt-[4rem] w-full h-full">
      <TitleTag tagName={"About Me"} />
      <TabsButton />
    </div>
  );
}

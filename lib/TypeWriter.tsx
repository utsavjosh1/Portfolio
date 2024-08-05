"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { TypewriterProps } from "react-simple-typewriter";
import Image, { ImageProps } from "next/image";

/**
 * TypeWriterComponent is a React functional component that renders a TypeWriter animation.
 *
 * @returns {React.ReactElement<HTMLDivElement>} The rendered TypeWriter animation.
 */
const TypeWriterComponent: React.FC =
  (): React.ReactElement<HTMLDivElement> => {
    const typeWriterProps: TypewriterProps = {
      typeSpeed: 60,
      words: ["<Code />"] as string[],
      loop: 1,
    };

    const coffeeCupImageProps: ImageProps = {
      src: "/coffee-cup.png",
      className: "mx-3 w-[30px] h-[30px]",
      alt: "Coffee cup",
      width: 30,
      height: 30,
    };

    return (
      <div className="text-xl md:text-2xl my-4 font-bold px-5 p-3 flex flex-wrap text-color w-auto">
        <span className="min-w-[223px]">
          I Transform <span className="text-yellow-700">Caffeine</span>
        </span>
        <Image {...coffeeCupImageProps} alt="Coffee cup" />
        into
        <span className="text-green-500">
          <Typewriter {...typeWriterProps} />
        </span>
      </div>
    );
  };

export default TypeWriterComponent;

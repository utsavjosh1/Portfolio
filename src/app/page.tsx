"use client";

import HeroSection from "@/components/home/hero-section";
import { ProjectShowcase } from "@/components/home/project";

// Currently not in use
// import { db } from "./api/firebase/config";
// import { collection, getDocs, addDoc } from "firebase/firestore/lite";

export default function Home() {
  return (
    <div className="w-screen h-screen relative flex flex-col items-start justify-start pt-10 mx-auto text-black dark:bg-[#111111] dark:text-[#E0E0E0] px-4 sm:px-6 lg:px-8 max-w-2xl mb-10">
      <HeroSection />
      {/* <ProjectShowcase /> */}
    </div>
  );
}

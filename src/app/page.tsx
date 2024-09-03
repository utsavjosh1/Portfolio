"use client";

import HeroSection from "@/components/home/hero-section";
// import { db } from "./api/firebase/config";
// import { collection, getDocs, addDoc } from "firebase/firestore/lite";

export default function Home() {

  return (
    <div
      className={`relative w-screen h-screen dark:bg-[#111111] dark:text-white flex flex-col items-center`}
    >
      <HeroSection />
    </div>
  );
}

"use client";

import { Suspense } from "react";
import DrawerComponent from "../components/Drawer";
import { Logo } from "../components/Socialicon";
import AboutMe from "@/components/aboutme/main";
import Work from "@/app/Work";
import GitHubCalendarComponent from "@/lib/GitHubCalendar";
import Video from "@/components/bg-video";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <div className="h-screen flex items-center justify-center border border-green-500">
        {/* Video component with Suspense fallback */}
        <Suspense fallback={<p>Loading video...</p>}>
          <Video />
        </Suspense>

        {/* Overlay components */}
        <DrawerComponent />
        <Logo />

        <div className="absolute items-center h-full">
          {/* Hero section */}
          <HeroSection />

          {/* GitHub Calendar */}
          {/* <GitHubCalendarComponent /> */}

          {/* About Me */}
          <AboutMe />
          {/* Work */}
          {/* <Work /> */}
        
        </div>
      </div>
    </>
  );
}

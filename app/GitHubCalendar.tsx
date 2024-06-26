"use client";
import React, { Suspense } from "react";
import GitHubCalendar from "react-github-calendar";

const GitHubCalendarComponent = () => {
  return (
    <div className="styles-module_scrollContainer__-bJC8 p-4 md:overflow-scroll mt-7 text-slate-300">
      <Suspense fallback="Loading...">
        <GitHubCalendar username={"joshiUtsav"} blockSize={9} />
      </Suspense>
    </div>
  );
};

export default GitHubCalendarComponent;

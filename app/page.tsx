import DrawerComponent from "../components/Drawer";
import { Logo } from "../components/Socialicon";
import AboutMe from "@/app/AboutMe";
import Work from "@/app/Work";
import GitHubCalendarComponent from "@/lib/GitHubCalendar";
import TypeWriterComponent from "@/lib/TypeWriter";
import FramerMotionComponent from "@/lib/FramerMotion";
import Experience from "@/app/Experience";
import Video from "@/components/bg-video";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen flex flex-row items-center justify-center">
        <Video />
        <div className="absolute top-0 left-0 w-full h-full overflow-auto">
          <DrawerComponent />
          <div className="md:w-[50%] h-full mt-5">
            <div className="p-3 px-5 mt-12 font-bold text-xl text-color">
              Hi, I&apos;m
            </div>
            <FramerMotionComponent />
            <TypeWriterComponent />
            <div className="max-w-[100%] text-slate-200 px-5 p-2 md:text-[18px] my-4">
              A Full-Stack Developer based in Delhi. I always aim for the best
              code quality and smooth coding. I&apos;m excited about using new
              technologies in my projects.
            </div>
            <GitHubCalendarComponent />
            <AboutMe />
            <Experience />
            <Work />
            <Footer />
            <div className="fixed bottom-5 right-10 hidden md:block">
              <Logo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="h-screen w-screen overflow-hidden flex flex-row items-center justify-center">
  <video
    src="/video/bg.mp4"
    loop
    autoPlay
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover"
  />
  <div className="absolute w-full h-full bg-black bg-opacity-65" />
  <div className="absolute top-0 left-0 w-full h-full overflow-auto">
    <DrawerComponent />
    <div className="md:w-[50%] h-full mt-5">
      <div className="p-3 px-5 mt-12 font-bold text-xl text-color">
        Hi, I&apos;m
      </div>
      <FramerMotionComponent />
      <TypeWriterComponent />
      <div className="max-w-[100%] text-slate-200 px-5 p-2 desc-color md:text-[17px] my-4">
        A Full-Stack Developer based in Delhi. I always aim for the best
        code quality and smooth coding. I&apos;m excited about using new
        technologies in my projects.
      </div>
      <GitHubCalendarComponent />
      <AboutMe />
      <Experience />
      <Work />
      <Footer />
      <div className="fixed bottom-5 right-10 hidden md:block">
        <Logo />
      </div>
    </div>
  </div>
</div> */
}

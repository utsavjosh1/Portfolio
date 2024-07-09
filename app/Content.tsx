import AboutMe from "./AboutMe";
import Work from "./Work";
import GitHubCalendarComponent from "./GitHubCalendar";
import TypeWriterComponent from "./TypeWriterComponent";
import FramerMotionComponent from "./FramerMotionComponent";
import Experience from "./Experience"
import Footer from "./Footer";

/**
 * Renders the main body of the page.
 * @returns {React.ReactElement} The rendered body.
 */
const Body = (): React.ReactElement => {
  return (
    <div className="md:w-[50%] h-full mt-5">
      <div className="p-3 px-5 mt-12 font-bold text-xl text-color">Hi,I&apos;m</div>
      <FramerMotionComponent />
      <TypeWriterComponent />
      <div className=" max-w-[100%] text-slate-200 px-5 p-2 desc-color md:text-[17px] my-4  ">
        A Full-Stack Developer based in Delhi. I always aim for the best code
        quality and smooth coding. I&apos;m excited about using new technologies in
        my projects.
      </div>
      <GitHubCalendarComponent />
      <AboutMe />
      <Experience />
      <Work />
      <Footer />
    </div>
  );
};

export default Body;

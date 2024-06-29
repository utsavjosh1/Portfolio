import Link from "next/link";
import Image from "next/image";
import Content from "./Content";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Home = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-row items-center justify-center">
      {/* Background Video */}
      <video
        src="/video/bg.mp4"
        loop
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      ></video>
      <div className="absolute w-full h-full bg-black bg-opacity-65"></div>
      <div className={"absolute top-0 left-0 w-full h-full overflow-auto"}>
        <DrawerComponent />
        <Content />
      </div>
    </div>
  );
};

const DrawerComponent = () => {
  return (
    <div className="md:hidden">
      <div className="p-2 absolute right-0 text-white">
        <Sheet>
          <SheetTrigger>
            <Image src="/burger.png" alt="MenuButton" />
          </SheetTrigger>
          <SheetContent className="bg-slate-950 bg-opacity-40 w-full text-slate-400">
            <SheetHeader>
              <SheetTitle className="text-slate-400 text-center mt-10 text-3xl">
                CONNECT WITH ME
              </SheetTitle>
              <SheetDescription>
                <IconLinkLogo />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

const IconLinkLogo = () => {
  return (
    <div className="flex flex-col items-center text-slate-200 gap-6 mt-5">
      <Link target="_blank" href="https://twitter.com/joshi__utsav">
        <Image
          src="/twitterWhite.png"
          className="cursor-pointer"
          width={37}
          alt="twitter"
        />
      </Link>
      <Link target="_blank" href="https://github.com/joshiUtsav">
        <Image
          src="/githubwhite.png"
          className="cursor-pointer"
          width={37}
          alt="github"
        />
      </Link>
      <Link target="_blank" href="https://www.linkedin.com/in/joshi-utsav/">
        <Image
          src="/linkedinwhite.png"
          className="cursor-pointer"
          width={37}
          alt="linkedIn"
        />
      </Link>
      <div className="h-[100px] bg-white w-[1px] hidden sm:block"></div>
    </div>
  );
};

export default Home;

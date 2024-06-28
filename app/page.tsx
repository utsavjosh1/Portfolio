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

const Home = () => (
  <div className="h-screen w-screen overflow-hidden flex flex-row items-center justify-center">
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
      <Content />
      <div className="fixed bottom-5 right-10 hidden md:block">
        <Logo />
      </div>
    </div>
  </div>
);

const DrawerComponent = () => (
  <div className="md:hidden">
    <div className="p-2 absolute right-0 text-white">
      <Sheet>
        <SheetTrigger>
          <Image src="/burger.png" alt="MenuButton" width={30} height={30} />
        </SheetTrigger>
        <SheetContent className="bg-slate-950 bg-opacity-40 w-full text-slate-400">
          <SheetHeader>
            <SheetTitle className="text-slate-400 text-center mt-10 text-3xl">
              CONNECT WITH ME
            </SheetTitle>
            <SheetDescription>
              <Logo />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  </div>
);

const Logo: React.FC = (): React.ReactElement => (
  <div className="flex flex-col items-center text-slate-200 gap-6 mt-5">
    {iconLinks.map(({ link, alt, src }) => (
      <IconLink key={link} link={link} alt={alt} src={src} />
    ))}
    <div className="h-[100px] bg-white w-[1px] hidden sm:block"></div>
  </div>
);

const iconLinks = [
  {
    link: "https://twitter.com/joshi__utsav",
    alt: "twitter",
    src: "/twitterWhite.png",
  },
  {
    link: "https://github.com/joshiUtsav",
    alt: "github",
    src: "/githubwhite.png",
  },
  {
    link: "https://www.linkedin.com/in/joshi-utsav/",
    alt: "linkedIn",
    src: "/linkedinwhite.png",
  },
];

const IconLink = ({ link, alt, src }: { link: string; alt: string; src: string }) => (
  <Link target="_blank" href={link}>
    <Image src={src} className="cursor-pointer" width={37} height={37} alt={alt} />
  </Link>
);

export default Home;

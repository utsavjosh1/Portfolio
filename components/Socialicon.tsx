import Link from "next/link";
import Image from "next/image";
import { icon_Links as icon } from "@/lib/data";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Logo: React.FC = (): React.ReactElement => (
  <div className="fixed bottom-4 right-4 hidden md:block z-10">
    <ModeToggle />
    <div className="flex flex-col items-center text-slate-200 gap-6 mt-5">
      <div className="h-[100px] bg-white w-[1px] hidden sm:block"></div>
      {icon.map(({ link, alt, src }) => (
        <Social_IconLink key={link} link={link} alt={alt} src={src} />
      ))}
    </div>
  </div>
);

const Social_IconLink = ({
  link,
  alt,
  src,
}: {
  link: string;
  alt: string;
  src: string;
}) => (
  <Link target="_blank" href={link}>
    <Image
      src={src}
      className="cursor-pointer"
      width={37}
      height={37}
      alt={alt}
    />
  </Link>
);

export default Social_IconLink;

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

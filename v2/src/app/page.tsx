import { FloatingDockDemo } from "@/components/floating-nav";
import { ModeToggle } from "@/components/ui/darkmode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      <div className="flex items-center justify-around gap-2 px-96 absolute bottom-5 right-0 left-0">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>UJ</AvatarFallback>
        </Avatar>
        <FloatingDockDemo />
        <ModeToggle />
      </div>
    </div>
  );
}

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

const DrawerComponent = () => (
  <div className="md:hidden">
    <div className="p-2 absolute top-0 right-0 text-white">
      <Sheet>
        <SheetTrigger>
          <Image src="/burger.png" alt="MenuButton" width={30} height={30} />
        </SheetTrigger>
        <SheetContent className="bg-slate-950 bg-opacity-40 w-full text-slate-400">
          <SheetHeader>
            <SheetTitle className="text-slate-200 text-center mt-10 text-3xl">
              CONNECT WITH ME
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  </div>
);

export default DrawerComponent;

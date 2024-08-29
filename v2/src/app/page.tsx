import HeroSection from "@/components/home/hero-section";
import Banner from "@/components/banner";
export default function Home() {
  return (
    <div
      className={`relative w-screen h-screen dark:bg-[#111111] dark:text-white flex flex-col items-center pt-10`}
    >
      <Banner text={"This website is still under development"} />
      <HeroSection />
    </div>
  );
}

import HeroSection from "@/components/home/hero-section";

export default function Home() {
  return (
    <div
      className={`relative w-screen h-screen dark:bg-[#111111] dark:text-white flex items-center justify-center`}
    >
      <HeroSection />
    </div>
  );
}

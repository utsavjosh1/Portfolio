"use client";
import ConnectSection from "@/components/about/connect";
import { WorkExperience } from "@/components/about/work";
import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/animation/motion-wrapper";

const AboutMe = () => {
  return (
    <>
      <div className="relative flex flex-col items-start justify-start h-full w-full text-black dark:text-[#E0E0E0] space-y-12">
        {/* About Section */}
        <MotionWrapper className="w-full" variant="fade-up" duration={0.8}>
          <h2 className="text-4xl font-extrabold mb-6 text-left text-[#2A2A2A] dark:text-[#FFFFFF] relative inline-block">
            Hey, I&apos;m Utsav!
          </h2>

          <StaggerContainer
            className="space-y-6"
            staggerChildren={0.15}
            delayChildren={0.2}
          >
            <StaggerItem variant="fade-up">
              <p className="text-gray-600 text-lg mb-6 text-left leading-relaxed">
                <span className="font-semibold text-[#2A2A2A] dark:text-[#FFFFFF]">
                  IPA /ʊt̪.səʋ/ •
                </span>
                <span className="mx-2 text-[#888888]">ಉತ್ಸವ •</span>
                <span className="mx-2 text-[#888888]">উৎসব •</span>
                <span className="mx-2 text-[#888888]">ウツァフ</span>
              </p>
            </StaggerItem>

            <StaggerItem variant="fade-up">
              <p className="text-lg mb-4 text-left leading-relaxed">
                I&apos;m a{" "}
                <span className="font-semibold text-[#2A2A2A] dark:text-[#FFFFFF] relative inline-block group">
                  full-stack developer
                </span>{" "}
                specializing in backend—the brain of applications. I contribute
                to open-source, build scalable solutions, and am open to
                freelance opportunities.
              </p>
            </StaggerItem>

            <StaggerItem variant="fade-up">
              <p className="text-lg text-left leading-relaxed">
                When I&apos;m not coding, you&#39;ll find me immersed in music,
                a good book, or exploring new places.{" "}
                <span className="text-sm animate-bounce inline-block">🙂</span>
              </p>
            </StaggerItem>
          </StaggerContainer>
        </MotionWrapper>

        {/* Work Section */}
        <WorkExperience />

        {/* Connect Section */}
        <ConnectSection />
      </div>
    </>
  );
};

export default AboutMe;

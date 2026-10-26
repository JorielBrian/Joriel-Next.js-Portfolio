'use client';

import Skills from "@/components/Sections/Skills";
import AboutCard from "@/components/Cards/AboutCard";
import SectionSkeleton from "@/components/SectionSkeleton";
import { useEffect, useState } from "react";
import { getAllContent } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";

const AboutMe = () => {
  const [ABOUT, setABOUT] = useState<string[]>([]);
  const [STORY, setSTORY] = useState<string[]>([]);
  const [GOALS, setGOALS] = useState<string[]>([]);
  const [OUTSIDE_WORK, setOUTSIDE_WORK] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, unregister } = useLoading();

  useEffect(() => {
    const key = "page-about";
    register(key);
    getAllContent()
      .then((blocks) => {
        for (const block of blocks) {
          if (block.key === "ABOUT") setABOUT(block.paragraphs);
          if (block.key === "STORY") setSTORY(block.paragraphs);
          if (block.key === "GOALS") setGOALS(block.paragraphs);
          if (block.key === "OUTSIDE_WORK") setOUTSIDE_WORK(block.paragraphs);
        }
      })
      .catch(() => {})
      .finally(() => {
        unregister(key);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-12 sm:gap-12 sm:py-16" aria-label="Loading about page">
        <SectionSkeleton variant="cards" count={2} />
        <SectionSkeleton variant="text" count={3} />
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-10 pt-2 sm:px-6 lg:px-8">
      <header className="mx-auto mb-2 mt-6 max-w-3xl text-center sm:mt-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">About me</p>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">The person behind the work</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-100/75 sm:text-lg">My background, the work I care about, and the skills I bring to building software.</p>
      </header>

      <AboutCard header="Hi, I'm Joriel Brian" image="/Profile Picture.png" altImage="Portrait of Joriel Brian" texts={ABOUT} position="left" />
      <AboutCard title="My Story" image="/graduation_pic.jpg" altImage="Graduation photo" texts={STORY} position="right" />
      <AboutCard title="My Goal" image="/formal.jpg" altImage="Formal portrait" texts={GOALS} position="left" />
      <AboutCard title="Outside Work" image="/Guitar Playing.jpg" altImage="Playing lead guitar at Hills of Glory" texts={OUTSIDE_WORK} position="right" />

      <div className="mt-4 border-t border-blue-700/50 pt-4 sm:mt-8 sm:pt-8">
        <Skills />
      </div>
    </main>
  );
};

export default AboutMe;

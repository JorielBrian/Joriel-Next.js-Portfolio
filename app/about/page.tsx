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
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4">
      <AboutCard header="Hi, I'm Joriel Brian" image="/Profile Picture.png" altImage="My Image" texts={ABOUT} position="left" />
      <AboutCard title="My Story" image="/graduation_pic.jpg" altImage="Graduation Picture" texts={STORY} position="right" />
      <AboutCard title="My Goal" image="/formal.jpg" altImage="Formal Picture" texts={GOALS} position="left" />
      <AboutCard title="Outside Work" image="/Guitar Playing.jpg" altImage="Hills of Glory Lead Guitar" texts={OUTSIDE_WORK} position="right" />
      <Skills />
    </main>
  );
};

export default AboutMe;

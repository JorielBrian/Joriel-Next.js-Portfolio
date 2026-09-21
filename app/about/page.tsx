'use client';
import Skills from "@/components/Sections/Skills"
import AboutCard from "@/components/Cards/AboutCard";
import { useEffect, useState } from "react";
import { getAllContent } from "@/app/lib/api";

function AboutMe() {
  const [ABOUT, setABOUT] = useState<string[]>([]);
  const [STORY, setSTORY] = useState<string[]>([]);
  const [GOALS, setGOALS] = useState<string[]>([]);
  const [OUTSIDE_WORK, setOUTSIDE_WORK] = useState<string[]>([]);

  useEffect(() => {
    getAllContent()
      .then((blocks) => {
        for (const block of blocks) {
          if (block.key === "ABOUT") setABOUT(block.paragraphs);
          if (block.key === "STORY") setSTORY(block.paragraphs);
          if (block.key === "GOALS") setGOALS(block.paragraphs);
          if (block.key === "OUTSIDE_WORK") setOUTSIDE_WORK(block.paragraphs);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main className="flex flex-col w-4/5 min-h-screen">
      {/* Introduction */}
      <AboutCard header="Hi, I'm Joriel Brian" image="/Profile Picture.png" altImage="My Image" texts={ ABOUT } position="left"/>
      
      {/* My Story */}
      <AboutCard title="My Story" image="/graduation_pic.jpg" altImage="Graduation Picture" texts={ STORY } position="right"/>

      {/* Goal */}
      <AboutCard title="My Goal" image="/formal.jpg" altImage="Formal Picture" texts={ GOALS } position="left"/>

      {/* Outside Work */}
      <AboutCard title="Outside Work" image="/Guitar Playing.jpg" altImage="Hills of Glory Lead Guitar" texts={ OUTSIDE_WORK } position="right"/>
      
      {/* Technical Skills */}
      <Skills />
    </main>
  )
}

export default AboutMe
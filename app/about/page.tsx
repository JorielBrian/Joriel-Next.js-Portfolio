'use client';
import Skills from "@/app/components/Sections/Skills"
import AboutCard from "../components/Cards/AboutCard";
import { ABOUT, GOALS, OUTSIDE_WORK, STORY } from "../data/index";

function AboutMe() {
  return (
    <main className="flex flex-col w-4/5 min-h-screen">
      {/* Introduction */}
      <AboutCard header="Hi, I'm Joriel" image="/Profile Picture.png" altImage="My Image" texts={ ABOUT } position="left"/>
      
      {/* My Story */}
      <AboutCard title="My Story" image="/graduation_pic.jpg" altImage="Graduation Picture" texts={ STORY } position="right"/>

      {/* Goal */}
      <AboutCard title="My Goal" texts={ GOALS } position="left"/>

      {/* Outside Work */}
      <AboutCard title="Outside Work" image="/Guitar Playing.jpg" altImage="Hills of Glory Lead Guitar" texts={ OUTSIDE_WORK } position="right"/>
      
      {/* Technical Skills */}
      <Skills />
    </main>
  )
}

export default AboutMe
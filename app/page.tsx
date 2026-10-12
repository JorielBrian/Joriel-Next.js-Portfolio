import Hero from "@/components/Sections/Hero";
import HeroSkills from "@/components/Sections/HeroSkills";
import Summary from "@/components/Sections/Summary";
import Experience from "@/components/Sections/Experience";
import Projects from "@/components/Sections/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <Summary />
      <HeroSkills />
      <Experience />
      <Projects />
    </main>
  );
}

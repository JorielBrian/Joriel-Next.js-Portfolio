import Hero from "@/components/Sections/Hero";
import Skills from "@/components/Sections/Skills";
import Summary from "../components/Sections/Summary";
import Experience from "@/components/Sections/Experience";

export default function Home() {
  return (
    <main>
      <Hero />
      <Summary />
      <Skills />
      <Experience />
    </main>
  );
}

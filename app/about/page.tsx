'use client';
import Skills from "@/app/components/Sections/Skills"
import { motion } from "motion/react"

function AboutMe() {
  return (
    <main className="flex flex-col w-4/5 min-h-screen">
      {/* Summary */}
      <motion.section 
        initial={{x:100, opacity:0}} 
        whileInView={{x:0, opacity:1}} 
        transition={{ease:"easeIn", duration:0.5}}
        className="card self-start lg:w-2/3"
      >
        <motion.img 
          initial={{x:100, opacity:0}} 
          whileInView={{x:0, opacity:1}} 
          transition={{ease:"easeIn", duration:1.5}}
          src="/Profile Picture.png" 
          alt="My Image" 
          className="float-left w-fit size-90 m-4 my-5 rounded-full"
        />
        <motion.h1 initial={{opacity:0}} whileInView={{opacity:1}} transition={{ease:"easeIn", duration:0.5}}  className="text-4xl text-center lg:text-left font-bold">Hi, I'm Joriel</motion.h1>
        <motion.p initial={{x:100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}className="text-gray-300">
          An Aspiring Web Developer with hands-on experience building applications with the modern technologies. Combines practical project work with foundational skills in systems and data environments. <br />
          A quick and adaptable learner who rapidly acquires new tools and concepts through selfstudy and collaboration. 
          Eager to contribute to production codebases, deepen expertise within a focused tech stack, and grow under the mentorship of an experienced engineering team that values clean code and iterative improvement.
        </motion.p>
        <div className="flex flex-col">
          
        </div>
      </motion.section>

      {/* My Story */}
      <motion.section 
        initial={{x:-100, opacity:0}} 
        whileInView={{x:0, opacity:1}} 
        transition={{ease:"easeIn", duration:0.5}}
        className="card self-end lg:w-2/3"
      >
        <h3 className="text-3xl text-center font-bold mb-6">My Story</h3>
        <div className="space-y-4 text-gray-300">
          <motion.p initial={{x:100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}>
            My path to becoming a web developer began not with a single line of code, but with a question I kept asking in every role: "How can we make this system work better?"
          </motion.p>
          <motion.p initial={{x:-100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}>
            My career started in the world of data and analysis. At STRIDE Consulting, I worked on complex traffic simulations, installing hardware in the field and transforming raw data into clear, actionable reports using R. This experience taught me a fundamental truth: every technical system exists to serve a real-world need. I learned to see the bigger picture, from hardware setup to final data visualization.
          </motion.p>
          <motion.p initial={{x:100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}>
            That big-picture thinking is what pulled me toward web development. I wanted to build the interfaces and tools that people actually use. I dove in headfirst, teaching myself modern front-end technologies. This led me to Citrof Group, where I had to rapidly master the T3 Stack (Next.js, TypeScript, tRPC) to contribute to live projects. It was a challenging and exhilarating confirmation that I could not only learn quickly but also deliver tangible value.
          </motion.p>
          <motion.p initial={{x:-100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}>
            Driven by a desire to own a project from concept to launch, I took on a volunteer role as a Project Lead Developer at Hills of Glory church. Starting with just an idea, I taught myself the TALL Stack (Laravel, Livewire) and led a small team to build a full church management system. This experience was pivotal—it showed me the power of technology to build community and solve specific organizational problems.
          </motion.p>
          <motion.p initial={{x:100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}>
            Most recently, as a Systems Engineer at La Rose Noire, I focused on creating internal web systems to streamline operations, deepening my practical PHP expertise.
          </motion.p>
        </div>
      </motion.section>

      {/* Goal */}
      <motion.section 
        initial={{x:100, opacity:0}} 
        whileInView={{x:0, opacity:1}} 
        transition={{ease:"easeIn", duration:0.5}}
        className="card self-start lg:w-2/3"
      >
        <h3 className="text-3xl text-center font-bold mb-6">My Goal</h3>
        <div className="space-y-4 text-gray-300">
          <motion.p initial={{x:-100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}>
            Today, my focus is clear. I am seeking to channel this blend of analytical thinking, rapid learning, and full-stack project experience into a dedicated role. I want to join a collaborative engineering team where I can deepen my mastery of a modern stack like Next.js or Laravel, contribute to meaningful products, and grow alongside colleagues who value clean, impactful code.
          </motion.p>
          <motion.p initial={{x:100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}>
            I believe great development is about understanding the "why" behind the "what you're building." If you're looking for a developer who combines technical adaptability with a systems-thinking approach, I'd love to connect.
          </motion.p>
        </div>
      </motion.section>

      {/* Outside Work */}
      <motion.section 
        initial={{x:-100, opacity:0}} 
        whileInView={{x:0, opacity:1}} 
        transition={{ease:"easeIn", duration:0.5}}
        className="card self-end lg:w-2/3"
      >
        <h3 className="text-3xl text-center font-bold mb-6">Outside Working Hours</h3>
        <div className="space-y-4 text-gray-300">
          <motion.img 
            initial={{x:-100, opacity:0}} 
            whileInView={{x:0, opacity:1}} 
            transition={{ease:"easeIn", duration:1.5}}
            src="/Guitar Playing.jpg" 
            alt="Guitr Playing Image" 
            className="float-left w-fit size-70 m-4 my-5 rounded-full"
          />
          <motion.p initial={{x:-100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}>
            I serve as the Lead Guitarist and a Music Theory Mentor in my church's Music and Arts Ministry. 
          </motion.p>
          <motion.p initial={{x:100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}>
            This role allows me to blend technical skill with spiritual service—from crafting worship setlists and teaching foundational theory to fostering fellowship within our creative community. 
          </motion.p>
          <motion.p initial={{x:-100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}>
            I deeply value the unique connection between creative expression and spiritual growth that this ministry nurtures.
          </motion.p>
        </div>
      </motion.section>
      
      {/* Technical Skills */}
      <Skills />
    </main>
  )
}

export default AboutMe
import { SKILLS } from "../app/data/all_skills"
import Image from "next/image";

function SkillsUsed({skills}: {skills:string[]}) {
  return (
    <span className="flex flex-wrap items-center gap-3">
        {skills.map(skill => (
          // <p>{skill}</p>
          SKILLS.find(s => s.skill === skill)
            ? <span
                key={skill}
                className="icons p-5! size-10! md:size-12! 2xl:size-14! relative overflow-hidden"
              >
                <Image
                  title={skill}
                  src={SKILLS.find(s => s.skill === skill)?.image || ''}
                  alt={skill}
                  fill
                />
              </span>
            : <p
                key={skill}
                className="w-fit m-1 min-w-5 p-3! rounded-xl text-center 2xl:p-4! bg-sky-900/50 2xl:rounded-2xl text-cyan-500 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {skill}
              </p>
        ))}
    </span>
  )
}

export default SkillsUsed;
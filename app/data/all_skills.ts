import { Skill } from "./types";
import { Proficiency, Preference, Category } from "./enum";

export const SKILLS: Skill[] = [
    // Core Skills
    
    {skill:"Next.js", focus: true, image: "/Skills/next.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.CORE_SKILL, category:Category.FRAMEWORK},
    {skill:"Laravel", focus: true, image: "/Skills/laravel.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.CORE_SKILL, category:Category.FRAMEWORK},
    {skill:"React", focus: true, image: "/Skills/react.png", proficiency:Proficiency.PROFICIENT, preference:Preference.CORE_SKILL, category:Category.FRAMEWORK},
    {skill:"TypeScript", focus:true, image: "/Skills/typescript.png", proficiency:Proficiency.PROFICIENT, preference:Preference.CORE_SKILL, category:Category.LANGUAGE},
    {skill:"Tailwind CSS", focus:true, image: "/Skills/tailwind.png", proficiency:Proficiency.PROFICIENT, preference:Preference.CORE_SKILL, category:Category.FRAMEWORK},
    {skill:"GIT", focus:true, image: "/Skills/git.png", proficiency:Proficiency.PROFICIENT, preference:Preference.CORE_SKILL, category:Category.VERSION_CONTROL},
    {skill:"Vercel", focus:true, image: "/Skills/vercel.png", proficiency:Proficiency.PROFICIENT, preference:Preference.CORE_SKILL, category:Category.VERSION_CONTROL},
    {skill:"Material UI", image: "/Skills/mui.png", proficiency:Proficiency.PROFICIENT, preference:Preference.CORE_SKILL, category:Category.TOOLS}, // add focus:true after learning

    // Tech Stack
    {skill:"T3 Stack", image: "/Skills/t3.svg", proficiency:Proficiency.INTERMEDIATE, preference:Preference.SUB_SKILL, category:Category.STACK},
    {skill:"TALL Stack", image: "/Skills/tall.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.SUB_SKILL, category:Category.STACK},
    {skill:"Livewire", image: "/Skills/livewire.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.SUB_SKILL, category:Category.FRAMEWORK},
    {skill:"Eloquent", image: "/Skills/eloquent.png", proficiency:Proficiency.FUNCTIONAL, preference:Preference.OTHER, category:Category.ORM},

    // Fundamental Skills
    {skill:"PHP", image: "/Skills/php.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.SUB_SKILL, category:Category.FUNDAMENTAL },
    {skill:"HTML", image: "/Skills/html.png", proficiency:Proficiency.ADVANCE, preference:Preference.OTHER, category:Category.FUNDAMENTAL},
    {skill:"CSS", image: "/Skills/css.png", proficiency:Proficiency.ADVANCE, preference:Preference.OTHER, category:Category.FUNDAMENTAL},

    // Languages
    {skill:"JavaScript", image: "/Skills/javascript.png", proficiency:Proficiency.PROFICIENT, preference:Preference.CORE_SKILL, category:Category.LANGUAGE},
    {skill:"Python", image: "/Skills/python.png", proficiency:Proficiency.BEGINNER, preference:Preference.OTHER, category:Category.LANGUAGE},
    {skill:"R", image: "/Skills/r.png", proficiency:Proficiency.FUNCTIONAL, preference:Preference.OTHER, category:Category.LANGUAGE},

    // Frameworks and CLIs
    {skill:"Bootstrap", image: "/Skills/bootstrap.png", proficiency:Proficiency.PROFICIENT, preference:Preference.OTHER, category:Category.FRAMEWORK},
    {skill:"WordPress", image: "/Skills/wordpress.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.CORE_SKILL, category:Category.CLI},
    {skill:"Express.js", image: "/Skills/expressjs.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.SUB_SKILL, category:Category.FRAMEWORK},
    {skill:"Ubuntu Linux", image: "/Skills/ubuntu.png", proficiency:Proficiency.FUNCTIONAL, preference:Preference.OTHER, category:Category.OS},

    // Backend 
    {skill:"SQL", image: "/Skills/sql.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.CORE_SKILL, category:Category.BACKEND},
    {skill:"Node.js", image: "/Skills/nodejs.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.OTHER, category:Category.BACKEND},
    {skill:"tRPC", image: "/Skills/trpc.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.OTHER, category:Category.BACKEND},

    // Databases
    {skill:"PostgreSQL", image: "/Skills/postgresql.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.OTHER, category:Category.DATABASE},
    {skill:"MySQL", image: "/Skills/mysql.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.OTHER, category:Category.DATABASE},
    {skill:"SQLite", image: "/Skills/sqlite.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.OTHER, category:Category.DATABASE},
    {skill:"Firebase", image: "/Skills/firebase.png", proficiency:Proficiency.FUNCTIONAL, preference:Preference.OTHER, category:Category.DATABASE},

    // ORMs
    {skill:"Prisma", image: "/Skills/prisma.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.SUB_SKILL, category:Category.ORM},
    {skill:"GraphQL", image: "/Skills/graphql.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.OTHER, category:Category.ORM},
    // Tools
    {skill:"GitHub", image: "/Skills/github.png", proficiency:Proficiency.PROFICIENT, preference:Preference.CORE_SKILL, category:Category.VERSION_CONTROL},
    {skill:"Vite", image: "/Skills/vite.svg", proficiency:Proficiency.PROFICIENT, preference:Preference.OTHER, category:Category.OTHER},
    {skill:"Hostinger", image: "/Skills/hostinger.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.SUB_SKILL, category:Category.VERSION_CONTROL},
    {skill:"Flux UI", image: "/Skills/flux.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.OTHER, category:Category.TOOLS},
    {skill:"FileZilla", image: "/Skills/filezilla.png", proficiency:Proficiency.FUNCTIONAL, preference:Preference.OTHER, category:Category.VERSION_CONTROL},
    {skill:"Shiny", image: "/Skills/shiny.png", proficiency:Proficiency.BEGINNER, preference:Preference.OTHER, category:Category.TOOLS},
    {skill:"Sketchup", image: "/Skills/sketchup.png", proficiency:Proficiency.BEGINNER, preference:Preference.OTHER, category:Category.GRAPHICS},
    {skill:"Cube Dynasm", image: "/Skills/cube_dynasm.png", proficiency:Proficiency.FUNCTIONAL, preference:Preference.OTHER, category:Category.TOOLS},
    
    // Hardware Skills
    {skill:"Computer Assembling", image: "/Skills/computerassembling.png", proficiency:Proficiency.PROFICIENT, preference:Preference.HARDWARE, category:Category.HARDWARE},
    {skill:"Circuit Assembling", image: "/Skills/circuitassembling.png", proficiency:Proficiency.PROFICIENT, preference:Preference.HARDWARE, category:Category.HARDWARE},
    {skill:"Troubleshooting", image: "/Skills/troubleshooting.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.HARDWARE, category:Category.HARDWARE},
    {skill:"Soldering", image: "/Skills/soldering.png", proficiency:Proficiency.PROFICIENT, preference:Preference.HARDWARE, category:Category.HARDWARE},

    // Microsoft Skills
    {skill:"Word", image: "/Skills/word.png", proficiency:Proficiency.PROFICIENT, preference:Preference.SOFT_SKILLS, category:Category.TOOLS},
    {skill:"Powerpoint", image: "/Skills/powerpoint.png", proficiency:Proficiency.PROFICIENT, preference:Preference.SOFT_SKILLS, category:Category.TOOLS},
    {skill:"Excel", image: "/Skills/excel.png", proficiency:Proficiency.PROFICIENT, preference:Preference.SOFT_SKILLS, category:Category.TOOLS},

    // Design Skills
    {skill:"Canva", image: "/Skills/canva.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.DESIGN, category:Category.GRAPHICS},
    {skill:"Capcut", image: "/Skills/capcut.png", proficiency:Proficiency.INTERMEDIATE, preference:Preference.DESIGN, category:Category.GRAPHICS},
    {skill:"Powerdirector", image: "/Skills/powerdirector.png", proficiency:Proficiency.FUNCTIONAL, preference:Preference.DESIGN, category:Category.GRAPHICS},

    // Other Skills
    {skill:"Facebook", image: "/Skills/facebook.png", proficiency:Proficiency.PROFICIENT, preference:Preference.OTHER, category:Category.SOCIAL_MEDIA},
    {skill:"Software", image: "/Skills/software.png", proficiency:Proficiency.PROFICIENT, preference:Preference.OTHER, category:Category.OTHER}
];
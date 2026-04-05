'use client'
import { QUALIFICATIONS } from "../data/qualifications";
import ExperienceCard from "@/components/Cards/ExperienceCard";
import { useEffect } from "react";

const Qualifications = () =>{
    if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    }
    
    return (    
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <span className="text-cyan-300 uppercase tracking-[0.3em] text-sm font-semibold">
                        Career Path
                    </span>
                    <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold text-white">
                        Professional Journey
                    </h1>
                    <p className="mt-6 mx-auto max-w-3xl text-slate-400 text-lg leading-8">
                        Detailed breakdown of my professional experiences, achievements, and the skills I have developed across full-time roles and contract-based projects.
                    </p>
                </div>

                <div className="space-y-20">
                    { QUALIFICATIONS && <ExperienceCard title="Full-Time Roles" contract="Full Time" experiences={QUALIFICATIONS} /> }
                    { QUALIFICATIONS && <ExperienceCard title="Contract & Projects" contract="Contractual / Project" experiences={QUALIFICATIONS}/> }
                </div>
            </div>
        </div>
    );
}
export default Qualifications;
'use client'
import ExperienceCard from "@/components/Cards/ExperienceCard";
import { useEffect, useState } from "react";
import { getQualifications, ApiQualification } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";

const Qualifications = () =>{
    const [QUALIFICATIONS, setQualifications] = useState<ApiQualification[]>([]);
    const { register, unregister } = useLoading();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
        const key = "page-experiences";
        register(key);
        getQualifications()
            .then(setQualifications)
            .catch(() => setQualifications([]))
            .finally(() => unregister(key));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
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
                    { QUALIFICATIONS && <ExperienceCard title="Internships" contract="Internship" experiences={QUALIFICATIONS}/> }
                </div>
            </div>
        </div>
    );
}
export default Qualifications;
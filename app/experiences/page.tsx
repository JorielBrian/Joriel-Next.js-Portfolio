'use client'
import { QUALIFICATIONS } from "../data/qualifications";
import ExperienceCard from "@/components/Cards/ExperienceCard";
import { useEffect } from "react";

const Qualifications = () =>{
    if (typeof window !== 'undefined') {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    }
    
    return (    
        <div className="w-4/5 mx-auto my-5 p-5 rounded-sm content-center overflow-hidden">
            { QUALIFICATIONS && <ExperienceCard title="Key Qualifications" contract="Full Time" experiences={QUALIFICATIONS} /> }
            { QUALIFICATIONS && <ExperienceCard title="Contractual Projects" contract="Contractual / Project" experiences={QUALIFICATIONS}/> }
        </div>
    );
}
export default Qualifications;
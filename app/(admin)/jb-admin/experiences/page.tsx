import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { QUALIFICATIONS } from "@/data/qualifications";
import ExperienceCard from "@/components/Cards/ExperienceCard";
import Link from "next/link";

const Experiences = () => {
  return (
    <main>
        <Button
            className="button active place-self-end"
            variant="link"
        >
            <Link 
                href="/jb-admin/experiences/create"
                className="inline-flex items-center gap-2"
            >
                <FaPlus />
                Add Experience
            </Link>
        </Button>
        {QUALIFICATIONS && <ExperienceCard experiences={QUALIFICATIONS} admin={true} />}
    </main>
  )
}

export default Experiences
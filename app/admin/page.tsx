import Link from "next/link";
import { FolderKanban, GraduationCap, Sparkles, FileText, ArrowRight } from "lucide-react";

const sections = [
  { name: "Projects", href: "/admin/projects", icon: FolderKanban, desc: "Add, edit, or remove portfolio projects" },
  { name: "Qualifications", href: "/admin/qualifications", icon: GraduationCap, desc: "Manage your work experience entries" },
  { name: "Skills", href: "/admin/skills", icon: Sparkles, desc: "Update your skills list and categories" },
  { name: "Bio content", href: "/admin/content", icon: FileText, desc: "Edit the About, Story, and Goals text" },
];

export default function AdminHome() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold">Welcome back</h2>
        <p className="text-sm text-blue-300/60 mt-1">Choose a section below to update your live portfolio.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group card mt-0 flex flex-col hover:shadow-blue-500/30 hover:border-blue-500/60 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-blue-800 to-blue-900 border border-blue-600/50 flex items-center justify-center">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <ArrowRight size={16} className="text-blue-400/40 group-hover:text-blue-300 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="font-semibold mt-4">{s.name}</p>
              <p className="text-sm text-blue-300/60 mt-1">{s.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

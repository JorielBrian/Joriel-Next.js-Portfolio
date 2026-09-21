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
        <p className="text-sm text-neutral-500 mt-1">Choose a section below to update your live portfolio.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-2xl border border-white/10 bg-neutral-900/40 p-5 hover:border-white/25 hover:bg-neutral-900/70 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <ArrowRight size={16} className="text-neutral-600 group-hover:text-neutral-300 transition-colors" />
              </div>
              <p className="font-medium mt-4">{s.name}</p>
              <p className="text-sm text-neutral-500 mt-1">{s.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
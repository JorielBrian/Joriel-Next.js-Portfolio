import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  FolderKanban,
  GraduationCap,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const sections = [
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
    description: "Showcase the applications and work you've built.",
    action: "Manage projects",
    accent: "from-sky-500/15 to-blue-500/5",
  },
  {
    name: "Qualifications",
    href: "/admin/qualifications",
    icon: GraduationCap,
    description: "Keep your work experience and qualifications current.",
    action: "Manage qualifications",
    accent: "from-violet-500/15 to-blue-500/5",
  },
  {
    name: "Skills",
    href: "/admin/skills",
    icon: Sparkles,
    description: "Organize skills by category, proficiency, and focus.",
    action: "Manage skills",
    accent: "from-amber-500/15 to-blue-500/5",
  },
  {
    name: "Bio content",
    href: "/admin/content",
    icon: FileText,
    description: "Update the content visitors read on your portfolio.",
    action: "Edit content",
    accent: "from-emerald-500/15 to-blue-500/5",
  },
];

export default function AdminHome() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-blue-700/40 bg-linear-to-br from-blue-900/70 via-blue-950/80 to-slate-950 p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-blue-500/10 blur-3xl"
        />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-3 py-1.5 text-xs font-medium text-blue-200">
              <WandSparkles size={14} aria-hidden="true" />
              Portfolio workspace
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Welcome to your dashboard
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100/65 sm:text-base">
              Manage the content behind your public portfolio from one place.
              Choose a section to make an update.
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-blue-500/40 bg-blue-900/40 px-4 py-2.5 text-sm font-semibold text-blue-100 transition hover:border-blue-400/70 hover:bg-blue-800/60"
          >
            View live portfolio
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="admin-sections-heading" className="space-y-4">
        <div>
          <h2 id="admin-sections-heading" className="text-lg font-semibold text-white">
            Manage your portfolio
          </h2>
          <p className="mt-1 text-sm text-blue-200/55">
            Select an area to review or update.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.href}
                href={section.href}
                className={`group flex min-h-56 flex-col rounded-2xl border border-blue-800/50 bg-linear-to-br ${section.accent} p-5 transition duration-200 hover:-translate-y-0.5 hover:border-blue-500/70 hover:shadow-xl hover:shadow-blue-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-blue-700/50 bg-blue-950/70 text-blue-200 transition group-hover:border-blue-500/60 group-hover:text-white">
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="text-blue-300/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-200"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-6 font-semibold text-white">{section.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-5 text-blue-100/60">
                  {section.description}
                </p>
                <span className="mt-5 text-sm font-medium text-blue-200 transition group-hover:text-white">
                  {section.action}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <aside className="flex items-start gap-3 rounded-2xl border border-blue-800/40 bg-blue-950/30 p-4 sm:items-center sm:p-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-900/50 text-blue-200">
          <WandSparkles size={18} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-blue-100">A quick reminder</h3>
          <p className="mt-1 text-sm leading-5 text-blue-200/55">
            Changes saved here update the content served by your portfolio. Review your public site after making important edits.
          </p>
        </div>
      </aside>
    </div>
  );
}

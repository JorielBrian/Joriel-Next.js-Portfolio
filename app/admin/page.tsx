"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  FileText,
  FolderKanban,
  GraduationCap,
  LoaderCircle,
  RefreshCw,
  Sparkles,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import { getAdminDashboardSummary, type AdminDashboardSummary } from "@/app/lib/api";

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

const metrics: {
  key: keyof Pick<AdminDashboardSummary, "projects" | "qualifications" | "skills" | "content_blocks">;
  label: string;
  icon: LucideIcon;
  description: string;
}[] = [
  { key: "projects", label: "Projects", icon: FolderKanban, description: "Published portfolio projects" },
  { key: "qualifications", label: "Qualifications", icon: GraduationCap, description: "Experience and qualifications" },
  { key: "skills", label: "Skills", icon: Sparkles, description: "Skills in your portfolio" },
  { key: "content_blocks", label: "Content blocks", icon: FileText, description: "Editable content sections" },
];

export default function AdminHome() {
  const [summary, setSummary] = useState<AdminDashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminDashboardSummary();
      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-blue-700/40 bg-linear-to-br from-blue-900/70 via-blue-950/80 to-slate-950 p-6 sm:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-3 py-1.5 text-xs font-medium text-blue-200">
              <WandSparkles size={14} aria-hidden="true" />
              Portfolio workspace
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Welcome to your dashboard</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100/65 sm:text-base">
              Review your portfolio content and service status, then jump into the areas that need attention.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void loadSummary()}
              disabled={loading}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-500/40 bg-blue-900/40 px-4 py-2.5 text-sm font-semibold text-blue-100 transition hover:bg-blue-800/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} aria-hidden="true" />
              Refresh data
            </button>
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-500/40 bg-blue-900/40 px-4 py-2.5 text-sm font-semibold text-blue-100 transition hover:border-blue-400/70 hover:bg-blue-800/60"
            >
              View live portfolio <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="overview-heading" className="space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="overview-heading" className="text-lg font-semibold text-white">Portfolio overview</h2>
            <p className="mt-1 text-sm text-blue-200/55">Counts are fetched from your portfolio API and database.</p>
          </div>
          {summary && !error && (
            <p className="text-xs text-blue-200/45">Updated {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
          )}
        </div>

        {error && (
          <div role="alert" className="flex flex-col gap-3 rounded-2xl border border-rose-500/30 bg-rose-950/25 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <CircleAlert size={20} className="mt-0.5 shrink-0 text-rose-300" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-rose-200">Could not load dashboard data</p>
                <p className="mt-1 break-words text-sm text-rose-100/70">{error}</p>
                <p className="mt-1 text-xs text-rose-100/50">Check that you are signed in and the backend deployment is healthy.</p>
              </div>
            </div>
            <button type="button" onClick={() => void loadSummary()} className="shrink-0 rounded-lg border border-rose-400/30 px-3 py-2 text-sm font-medium text-rose-100 hover:bg-rose-900/40">Try again</button>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article key={metric.key} className="rounded-2xl border border-blue-800/50 bg-slate-950/50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-blue-700/50 bg-blue-950/70 text-blue-200">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <Activity size={16} className="text-blue-300/35" aria-hidden="true" />
                </div>
                <p className="mt-5 text-sm text-blue-100/65">{metric.label}</p>
                <p className="mt-1 text-3xl font-semibold tabular-nums text-white">
                  {loading && !summary ? <span className="inline-block h-9 w-14 animate-pulse rounded bg-blue-900/50" /> : summary?.[metric.key] ?? "—"}
                </p>
                <p className="mt-2 text-xs text-blue-200/40">{metric.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="system-heading" className="space-y-4">
        <div>
          <h2 id="system-heading" className="text-lg font-semibold text-white">System status</h2>
          <p className="mt-1 text-sm text-blue-200/55">A basic check based on the dashboard API response.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-blue-800/50 bg-slate-950/40 p-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-blue-900/40 text-blue-200"><Activity size={19} aria-hidden="true" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">Portfolio API</p>
              <p className="mt-1 text-xs text-blue-200/50">Dashboard summary endpoint</p>
            </div>
            {loading ? <LoaderCircle size={18} className="animate-spin text-blue-200/60" /> : error ? <CircleAlert size={18} className="text-rose-300" /> : <CheckCircle2 size={18} className="text-emerald-300" />}
            <span className="text-xs text-blue-100/65">{loading ? "Checking" : error ? "Unavailable" : "Responding"}</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-blue-800/50 bg-slate-950/40 p-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-blue-900/40 text-blue-200"><Activity size={19} aria-hidden="true" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">Database</p>
              <p className="mt-1 text-xs text-blue-200/50">Reported by the summary endpoint</p>
            </div>
            {loading ? <LoaderCircle size={18} className="animate-spin text-blue-200/60" /> : summary?.database === "connected" && !error ? <CheckCircle2 size={18} className="text-emerald-300" /> : <CircleAlert size={18} className="text-amber-300" />}
            <span className="text-xs text-blue-100/65">{loading ? "Checking" : summary?.database === "connected" && !error ? "Connected" : "Unknown"}</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-blue-800/50 bg-slate-950/40 p-4 sm:col-span-2">
            <span className="flex size-10 items-center justify-center rounded-xl bg-blue-900/40 text-blue-200"><FileText size={19} aria-hidden="true" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">Résumé</p>
              <p className="mt-1 text-xs text-blue-200/50">Whether a résumé record is configured</p>
            </div>
            {loading ? <LoaderCircle size={18} className="animate-spin text-blue-200/60" /> : summary?.resume_configured ? <CheckCircle2 size={18} className="text-emerald-300" /> : <CircleAlert size={18} className="text-amber-300" />}
            <span className="text-xs text-blue-100/65">{loading ? "Checking" : summary?.resume_configured ? "Configured" : "Not configured"}</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="admin-sections-heading" className="space-y-4">
        <div>
          <h2 id="admin-sections-heading" className="text-lg font-semibold text-white">Manage your portfolio</h2>
          <p className="mt-1 text-sm text-blue-200/55">Select an area to review or update.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.href} href={section.href} className={`group flex min-h-56 flex-col rounded-2xl border border-blue-800/50 bg-linear-to-br ${section.accent} p-5 transition duration-200 hover:-translate-y-0.5 hover:border-blue-500/70 hover:shadow-xl hover:shadow-blue-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-blue-700/50 bg-blue-950/70 text-blue-200 transition group-hover:border-blue-500/60 group-hover:text-white">
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <ArrowUpRight size={17} className="text-blue-300/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-200" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-semibold text-white">{section.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-5 text-blue-100/60">{section.description}</p>
                <span className="mt-5 text-sm font-medium text-blue-200 transition group-hover:text-white">{section.action}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <aside className="flex items-start gap-3 rounded-2xl border border-blue-800/40 bg-blue-950/30 p-4 sm:items-center sm:p-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-900/50 text-blue-200"><WandSparkles size={18} aria-hidden="true" /></span>
        <div>
          <h3 className="text-sm font-semibold text-blue-100">A quick reminder</h3>
          <p className="mt-1 text-sm leading-5 text-blue-200/55">Changes saved here update the content served by your portfolio. Review your public site after making important edits.</p>
        </div>
      </aside>
    </div>
  );
}

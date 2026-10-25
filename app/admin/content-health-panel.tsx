"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CircleAlert,
  LoaderCircle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import {
  getAdminContentHealth,
  type AdminContentHealth,
} from "@/app/lib/api";

export default function ContentHealthPanel() {
  const [health, setHealth] = useState<AdminContentHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHealth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setHealth(await getAdminContentHealth());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load content health.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadHealth();
  }, [loadHealth]);

  const attentionChecks = health?.checks.filter((check) => check.status === "attention") ?? [];

  return (
    <section aria-labelledby="content-health-heading" className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="content-health-heading" className="text-lg font-semibold text-white">
            Content health
          </h2>
          <p className="mt-1 text-sm text-blue-200/55">
            Checks for incomplete portfolio content using your saved database records.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadHealth()}
          disabled={loading}
          className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-blue-700/50 bg-slate-950/50 px-3 py-2 text-sm font-medium text-blue-100 transition hover:bg-blue-900/40 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} aria-hidden="true" />
          Refresh checks
        </button>
      </div>

      {error && (
        <div role="alert" className="flex flex-col gap-3 rounded-2xl border border-rose-500/30 bg-rose-950/25 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <CircleAlert size={20} className="mt-0.5 shrink-0 text-rose-300" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-rose-200">Could not load content health</p>
              <p className="mt-1 break-words text-sm text-rose-100/70">{error}</p>
              <p className="mt-1 text-xs text-rose-100/50">Confirm you are signed in and the backend deployment includes the content-health endpoint.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => void loadHealth()}
            className="shrink-0 rounded-lg border border-rose-400/30 px-3 py-2 text-sm font-medium text-rose-100 hover:bg-rose-900/40"
          >
            Try again
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-blue-800/50 bg-slate-950/50 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-100/65">Overall status</span>
            <ShieldCheck size={18} className="text-blue-200/70" aria-hidden="true" />
          </div>
          {loading && !health ? (
            <div className="mt-4 h-8 w-28 animate-pulse rounded bg-blue-900/50" />
          ) : health ? (
            <div className="mt-3 flex items-center gap-2">
              {health.status === "healthy" ? (
                <CheckCircle2 size={22} className="text-emerald-300" aria-hidden="true" />
              ) : (
                <AlertTriangle size={22} className="text-amber-300" aria-hidden="true" />
              )}
              <p className="text-xl font-semibold text-white">
                {health.status === "healthy" ? "All checks passed" : "Needs attention"}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-blue-100/50">No status available</p>
          )}
          <p className="mt-2 text-xs text-blue-200/40">Based on required fields and saved content.</p>
        </article>

        <article className="rounded-2xl border border-blue-800/50 bg-slate-950/50 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-100/65">Total findings</span>
            <AlertTriangle size={18} className="text-amber-200/70" aria-hidden="true" />
          </div>
          {loading && !health ? (
            <div className="mt-4 h-8 w-16 animate-pulse rounded bg-blue-900/50" />
          ) : (
            <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
              {health?.total_findings ?? "—"}
            </p>
          )}
          <p className="mt-2 text-xs text-blue-200/40">Fields or records that need review.</p>
        </article>

        <article className="rounded-2xl border border-blue-800/50 bg-slate-950/50 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-100/65">Areas needing attention</span>
            <CircleAlert size={18} className="text-amber-200/70" aria-hidden="true" />
          </div>
          {loading && !health ? (
            <div className="mt-4 h-8 w-16 animate-pulse rounded bg-blue-900/50" />
          ) : (
            <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
              {health ? attentionChecks.length : "—"}
            </p>
          )}
          <p className="mt-2 text-xs text-blue-200/40">Content categories with findings.</p>
        </article>
      </div>

      {health && !error && (
        <div className="grid gap-3 lg:grid-cols-2">
          {health.checks.map((check) => (
            <article
              key={check.id}
              className="rounded-2xl border border-blue-800/50 bg-slate-950/40 p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl ${check.status === "healthy" ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300"}`}>
                  {check.status === "healthy" ? (
                    <CheckCircle2 size={18} aria-hidden="true" />
                  ) : (
                    <AlertTriangle size={18} aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-white">{check.label}</h3>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${check.status === "healthy" ? "bg-emerald-500/10 text-emerald-200" : "bg-amber-500/10 text-amber-200"}`}>
                      {check.count === 0 ? "Healthy" : `${check.count} finding${check.count === 1 ? "" : "s"}`}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-5 text-blue-100/55">{check.description}</p>
                </div>
              </div>

              {check.findings.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-blue-800/40 pt-3">
                  {check.findings.map((finding, index) => (
                    <li key={`${finding.item}-${finding.field}-${index}`} className="flex flex-col gap-0.5 text-sm sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                      <span className="min-w-0 break-words text-blue-100/80">{finding.item}</span>
                      <span className="shrink-0 text-xs text-amber-200/80">{finding.message}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-xs text-blue-200/40">
                  {check.count > check.findings.length
                    ? `Showing ${check.findings.length} of ${check.count} findings`
                    : check.count === 0
                      ? "No issues found"
                      : "Sample issues shown"}
                </span>
                <Link
                  href={check.href}
                  className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border border-blue-700/50 px-3 py-1.5 text-sm font-medium text-blue-100 transition hover:bg-blue-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  Fix issues <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {loading && !health && (
        <div className="flex items-center gap-2 rounded-xl border border-blue-800/40 bg-slate-950/40 p-4 text-sm text-blue-100/60">
          <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
          Checking your saved portfolio content…
        </div>
      )}
    </section>
  );
}

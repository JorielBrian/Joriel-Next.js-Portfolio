'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  GraduationCap,
  Sparkles,
  FileText,
  LogOut,
  ExternalLink,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
} from "lucide-react";
import { getMe, logout } from "@/app/lib/api";
import { Button } from "@/components/ui/button";

const NAV = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Qualifications", href: "/admin/qualifications", icon: GraduationCap },
  { name: "Skills", href: "/admin/skills", icon: Sparkles },
  { name: "Bio content", href: "/admin/content", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    getMe()
      .then((me) => {
        if (!active) return;
        if (!me) {
          router.replace("/login");
          return;
        }
        setUsername(me.username);
        setChecking(false);
      })
      .catch(() => {
        if (active) router.replace("/login");
      });

    return () => {
      active = false;
    };
  }, [router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      router.replace("/login");
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-950 px-4">
        <p className="text-sm text-blue-200/70">Checking session...</p>
      </div>
    );
  }

  const currentPage = NAV.find((item) => item.href === pathname)?.name ?? "Admin";

  const sidebar = (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-blue-700/40 bg-linear-to-b from-blue-950/95 to-blue-950 transition-[width] duration-200 ${collapsed ? "w-16 lg:w-20" : "w-64"}`}
    >
      <div className={`flex min-h-20 items-center ${collapsed ? "justify-center px-2" : "justify-between px-5"}`}>
        {collapsed ? (
          <span className="font-bold tracking-tight text-blue-100" title="Portfolio admin">PA</span>
        ) : (
          <div className="min-w-0">
            <p className="truncate text-lg font-bold tracking-tight">Portfolio admin</p>
            <p className="mt-0.5 text-xs text-blue-300/60">Content management</p>
          </div>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`hidden text-blue-200 hover:bg-blue-900/70 hover:text-white lg:inline-flex ${collapsed ? "absolute left-[4.25rem] top-5 z-10" : ""}`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((value) => !value)}
        >
          {collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
        </Button>
      </div>

      <nav aria-label="Admin navigation" className="flex-1 space-y-1 px-2 py-2">
        {NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              title={collapsed ? item.name : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${collapsed ? "justify-center px-2" : ""} ${
                active
                  ? "border-blue-600/70 bg-blue-800/80 font-semibold text-white shadow-md shadow-blue-950/40"
                  : "border-transparent text-blue-200/70 hover:bg-blue-900/50 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={2} aria-hidden="true" />
              {!collapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-blue-700/30 px-2 py-4">
        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          title={collapsed ? "View live site" : undefined}
          className={`flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-xs text-blue-300/70 transition-colors hover:bg-blue-900/40 hover:text-blue-100 ${collapsed ? "justify-center px-2" : ""}`}
        >
          <ExternalLink size={16} aria-hidden="true" />
          {!collapsed && <span>View live site</span>}
        </Link>

        <div
          title={collapsed ? username ?? "Admin user" : undefined}
          className={`flex min-h-11 items-center gap-3 rounded-xl border border-blue-700/30 bg-blue-950/50 px-2 py-2 ${collapsed ? "justify-center" : "px-3"}`}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
            {username?.[0]?.toUpperCase() ?? "A"}
          </div>
          {!collapsed && <p className="truncate text-sm text-blue-100">{username}</p>}
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={loggingOut}
          onClick={handleLogout}
          title={collapsed ? "Log out" : undefined}
          className={`w-full border-blue-700/50 bg-transparent text-blue-200 hover:bg-blue-900/50 hover:text-white ${collapsed ? "px-0" : ""}`}
        >
          <LogOut size={16} aria-hidden="true" />
          {!collapsed && (loggingOut ? "Logging out..." : "Log out")}
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-blue-950 text-white">
      <div className="flex min-h-screen">
        <div className="hidden md:flex">{sidebar}</div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              aria-label="Close admin navigation"
              className="absolute inset-0 bg-black/70"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-10 h-full w-72 max-w-[85vw] shadow-2xl">
              <div className="absolute right-2 top-3 z-20">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close admin navigation"
                  onClick={() => setMobileOpen(false)}
                  className="text-blue-100 hover:bg-blue-900"
                >
                  <X size={18} />
                </Button>
              </div>
              {sidebar}
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-14 shrink-0 items-center gap-3 border-b border-blue-700/30 bg-blue-950/80 px-4 sm:px-6">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-blue-100 hover:bg-blue-900 md:hidden"
              aria-label="Open admin navigation"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={19} />
            </Button>
            <h1 className="text-sm font-semibold tracking-wide text-blue-100">{currentPage}</h1>
          </header>
          <div className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

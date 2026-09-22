'use client';
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FolderKanban, GraduationCap, Sparkles, FileText, LogOut, ExternalLink } from "lucide-react";
import { getMe, logout } from "@/app/lib/api";

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

  useEffect(() => {
    getMe().then((me) => {
      if (!me) {
        router.replace("/login");
      } else {
        setUsername(me.username);
        setChecking(false);
      }
    });
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-blue-200/60">Checking session...</p>
      </div>
    );
  }

  const currentPage = NAV.find((item) => item.href === pathname)?.name ?? "Admin";

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 shrink-0 bg-gradient-to-b from-blue-950/60 to-blue-950/90 border-r border-blue-700/40 flex flex-col">
        <div className="px-6 py-6">
          <p className="font-bold tracking-tight text-lg">Portfolio admin</p>
          <p className="text-xs text-blue-300/60 mt-0.5">Content management</p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                  active
                    ? "bg-gradient-to-b from-blue-800 to-blue-900 border border-blue-600/70 text-white font-semibold shadow-md shadow-blue-900/40"
                    : "text-blue-200/70 hover:text-white hover:bg-blue-900/40 border border-transparent"
                }`}
              >
                <Icon size={17} strokeWidth={2} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-5 mt-4 border-t border-blue-700/30">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-blue-300/60 hover:text-blue-200 px-3 py-2 transition-colors"
          >
            <ExternalLink size={13} />
            View live site
          </Link>

          <div className="flex items-center gap-3 px-3 py-2.5 mt-2 mb-2 rounded-xl bg-blue-950/40 border border-blue-700/30">
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center text-xs font-bold shrink-0">
              {username?.[0]?.toUpperCase()}
            </div>
            <p className="text-sm text-blue-100 truncate">{username}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 justify-center text-sm rounded-xl border border-blue-700/50 px-3 py-2.5 text-blue-200 hover:border-blue-500 hover:text-white hover:bg-blue-900/30 transition-all"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 shrink-0 border-b border-blue-700/30 flex items-center px-8 bg-blue-950/20">
          <h1 className="text-sm font-semibold text-blue-100 tracking-wide">{currentPage}</h1>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

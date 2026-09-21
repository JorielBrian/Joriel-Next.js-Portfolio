'use client';
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getMe, logout } from "@/app/lib/api";

const NAV = [
  { name: "Dashboard", href: "/admin" },
  { name: "Projects", href: "/admin/projects" },
  { name: "Qualifications", href: "/admin/qualifications" },
  { name: "Skills", href: "/admin/skills" },
  { name: "Bio content", href: "/admin/content" },
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
        <p>Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 shrink-0 border-r border-white/10 flex flex-col">
        <div className="px-5 py-4 border-b border-white/10">
          <span className="font-bold">Admin</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-white/10 font-semibold"
                    : "opacity-70 hover:opacity-100 hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 space-y-2">
          <p className="text-xs opacity-60 px-3">{username}</p>
          <button
            onClick={handleLogout}
            className="w-full text-sm rounded-lg border border-white/20 px-3 py-2 hover:border-white/50"
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

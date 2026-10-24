'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/Sections/Header";
import Footer from "@/components/Sections/Footer";
import Events from "@/components/Events";
import BackgroundDecoration from "@/components/Background";
import { LoadingProvider } from "@/app/lib/loading-context";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLoginRoute = pathname === "/login";

  if (isAdminRoute || isLoginRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <BackgroundDecoration />
      <Events />
      <LoadingProvider>
        <Header />
        {children}
        <Footer />
      </LoadingProvider>
    </>
  );
}

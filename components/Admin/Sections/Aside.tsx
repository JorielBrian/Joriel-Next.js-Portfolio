'use client';
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";

const Aside = () => {
    const pathname = usePathname();
    const links = [
        { name: "Home", href: "/jb-admin" },
        { name: "Experiences", href: "/jb-admin/experiences" },
        { name: "Skills", href: "/jb-admin/skills" },
    ];

    return (
        <Sidebar className="p-4 w-fit h-screen text-white bg-blue-950/80 shadow-md ">
            <SidebarContent className="p-15 bg-blue-950">
                {links.map((link) => (
                    <Button
                        key={link.href}
                        variant="link"
                        className={cn("aside_button", { "aside_button_active": pathname === link.href })}
                        asChild
                    >
                        <a href={link.href}>
                            <div className="flex justify-center w-3/4">
                                {link.name}
                            </div>
                        </a>
                    </Button>
                ))}
            </SidebarContent>
            <SidebarFooter className="bg-blue-950">
                <Link href="/" className="button active">
                    Back to Portfolio
                </Link>
            </SidebarFooter>
        </Sidebar>
    )
}

export default Aside
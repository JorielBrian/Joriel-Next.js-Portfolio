'use client';
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Aside = () => {
    const pathname = usePathname();
    const links = [
        { name: "Home", href: "/jb-admin" },
        { name: "Summary", href: "/jb-admin/summary" },
        { name: "Skills", href: "/jb-admin/skills" },
        { name: "CV", href: "/jb-admin/cv" },
    ];

    return (
        <Sidebar className="p-4 w-64 h-screen text-white bg-blue-950/80 shadow-md ">
            <SidebarContent className="bg-blue-950">
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
        </Sidebar>
    )
}

export default Aside
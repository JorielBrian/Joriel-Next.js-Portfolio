import React from 'react'

import { SidebarProvider } from '@/components/ui/sidebar';
import Aside from '@/components/Admin/Sections/Aside'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      {/* <aside className="w-64 h-screen bg-blue-950/80 shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <a href="/jb-admin" className="block">Dashboard</a>
          <a href="/jb-admin/summary" className="block">Summary</a>
          <a href="/jb-admin/skills" className="block">Skills</a>
          <a href="/jb-admin/cv" className="block">CV</a>
        </nav>
      </aside> */}
      <SidebarProvider>
        <Aside />
        <main className="flex-1 p-6">{children}</main>
      </SidebarProvider>
    </div>
  )
}

export default layout
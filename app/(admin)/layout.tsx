import React from 'react'

import { SidebarProvider } from '@/components/ui/sidebar';
import Aside from '@/components/Admin/Sections/Aside'
import Header from '@/components/Admin/Sections/Header';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <SidebarProvider>
        <Aside />
        <div className="flex-1">
          <Header />
          <main className="flex-1 h-screen p-6">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default layout
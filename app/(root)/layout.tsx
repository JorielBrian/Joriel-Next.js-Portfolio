import React from 'react'
import Initializing from '../initializing'
import Footer from '@/components/Sections/Footer'
import Header from '@/components/Sections/Header'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <Initializing>
          <Header />
          {children}
          <Footer />
        </Initializing>
    </div>
  )
}

export default layout
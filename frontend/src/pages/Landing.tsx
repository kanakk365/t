import React from 'react'
import Navbar from '../components/landingCopms/Navbar'
import Hero from '../components/landingCopms/Hero'
import Features from '../components/landingCopms/Features'
import HowItWorks from '../components/landingCopms/HowItWorks'
import Faq from '@/components/landingCopms/Faq'
import Footer from '@/components/landingCopms/Footer'

function Landing() {
 return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <Navbar />
      <main id="main-content" className="flex-1 relative">
        <Hero />
        <Features />
        <HowItWorks />
        <Faq/>
        <Footer />
        {/* <ToolsShowcase />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact /> */}
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default Landing
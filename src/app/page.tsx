"use client"

import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import Pillars from "@/components/Pillars"
import TestimonialsSection from "@/components/TestimonialsSection"
import VisionMission from "@/components/VisionMission"
import WhyChooseUs from "@/components/WhyChooseUs"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      {/* This is your Hero component. 
        Since Navbar is in your layout.tsx, this will appear right below it.
      */}
      <Hero />

      {/* You can add your other sections (Placement, Courses, etc.) 
        here as you build them.
      */}
      <Pillars/>
      <TestimonialsSection/>
      <VisionMission/>
      <WhyChooseUs/>
      <FAQ />
    </main>
  )
}
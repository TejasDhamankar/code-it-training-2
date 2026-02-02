"use client";
import React from "react";
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from "@/components/ui/text-reveal-card";

export default function VisionMission() {
  return (
    <section className="relative py-20 md:py-32 bg-stone-50 overflow-hidden">
      {/* Subtle background pattern - matching other sections */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0 0 0) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Heading - matching other sections */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-4">
            Our Purpose & <span className="text-emerald-600">Promise</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Hover over the cards to reveal the core philosophy that drives CODE IT.
          </p>
        </div>

        {/* Responsive Grid for Reveal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* VISION CARD */}
          <TextRevealCard
            text="Shaping IT Talent"
            revealText="Building IT Careers"
            className="w-full border-stone-200 bg-white shadow-lg shadow-stone-200/50"
          >
            <TextRevealCardTitle className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-3">
              OUR VISION
            </TextRevealCardTitle>
            <TextRevealCardDescription className="leading-relaxed text-stone-600">
              To build a strong presence as an IT training institute fully focused on supporting students with strong practical skills, knowledge required by the industry, and the confidence needed to perform well in the ever-changing technology sector. Our Purpose is to shape skilled, future-focused professionals by providing the knowledge and experience needed to face real-world challenges, gain expertise in technologies, and grow in long-term IT careers.
            </TextRevealCardDescription>
          </TextRevealCard>

          {/* MISSION CARD */}
          <TextRevealCard
            text="Practical Training"
            revealText="Industry Success"
            className="w-full border-stone-200 bg-white shadow-lg shadow-stone-200/50"
          >
            <TextRevealCardTitle className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-3">
              OUR MISSION
            </TextRevealCardTitle>
            <TextRevealCardDescription className="leading-relaxed text-stone-600">
              Our mission is to deliver result-oriented, IT training with practical experience that aligns with current industry needs. Through project-based learning, live projects, internships, and strong industry collaboration. We focus guiding learners to become professionals ready for the IT field and supporting them to build successful and long-term careers in technology.
            </TextRevealCardDescription>
          </TextRevealCard>
        </div>
      </div>
    </section>
  );
}
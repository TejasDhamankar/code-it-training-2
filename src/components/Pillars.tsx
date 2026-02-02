"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ThreePillars() {
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);

  const pillars = [
    {
      title: "Prebuilt Agents, Tuned to Your Workflows",
      image: "/Images/training-modules-illustration.png",
      description:
        "CODE IT offers practical training programs covering core programming to advanced technologies like Full Stack, Data Science, AI/ML, and Cybersecurity.",
      fullContent:
        "Our comprehensive training modules are built from the ground up to match industry standards. We offer hands-on learning experiences with dedicated mentors who have years of real-world experience. Each course is structured to take you from fundamentals to advanced concepts, ensuring you build a strong foundation. With regular assessments and personalized feedback, we make sure every student progresses at their optimal pace.",
    },
    {
      title: "Automate Handoffs, Reduce Ops Friction",
      image: "/Images/learn-curriculum-tech.png",
      description:
        "Students engage in practical training using live projects and internship opportunities, applying knowledge in real-life scenarios.",
      fullContent:
        "Our project-based learning approach ensures that theoretical knowledge is immediately applied to solve real-world problems. Students work in teams, simulating actual workplace environments, learning collaboration, version control, and agile methodologies. From planning to deployment, you'll experience the complete software development lifecycle. This hands-on experience is what sets our graduates apart in the competitive job market.",
    },
    {
      title: "Approvals, Guardrails, and Full Auditability",
      image: "/Images/pillar-1-it-foundations.png",
      description:
        "Receive dedicated career guidance with hiring opportunities, recruitment drives, resume building, and mock interviews.",
      fullContent:
        "Our placement support goes beyond just connecting you with companies. We prepare you thoroughly with industry-specific interview questions, soft skills training, and professional communication workshops. Our strong network with 200+ partner companies across various domains ensures diverse opportunities. We track your progress even after placement, ensuring you have support during your initial career phase. With a 95% placement rate, we're committed to your professional success.",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Learn, Build, and Launch Your{" "}
              <span className="block mt-2">Tech Career.</span>
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
              Our training is built on three core principles: an industry-relevant curriculum, hands-on project experience, and dedicated placement support to ensure you're not just learning, but becoming job-ready.
            </p>
          </div>
        </div>

        {/* Three Pillar Images - No Cards, Just Images Blending with Background */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {pillars.map((pillar, index) => (
            <div key={index} className="group">
              {/* Image - No border, blends with background */}
              <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl bg-stone-100/50">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Very subtle gradient to blend edges */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-50/30 pointer-events-none" />
              </div>

              {/* Content Below Image */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight flex-1">
                    {pillar.title}
                  </h3>
                  
                  {/* Plus Button */}
                  <button
                    onClick={() => setSelectedPillar(index)}
                    className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-stone-900 hover:bg-emerald-600 text-white transition-all duration-300 hover:scale-110"
                    aria-label="Read more"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog for expanded content */}
      <Dialog
        open={selectedPillar !== null}
        onOpenChange={() => setSelectedPillar(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 pr-8">
              {selectedPillar !== null && pillars[selectedPillar].title}
            </DialogTitle>
          </DialogHeader>

          {selectedPillar !== null && (
            <div className="space-y-6">
              {/* Image in dialog */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src={pillars[selectedPillar].image}
                  alt={pillars[selectedPillar].title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Description */}
              <DialogDescription className="text-base md:text-lg text-gray-700 leading-relaxed">
                {pillars[selectedPillar].description}
              </DialogDescription>

              {/* Full content */}
              <div className="prose prose-stone max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {pillars[selectedPillar].fullContent}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
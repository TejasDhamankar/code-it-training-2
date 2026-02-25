"use client";
import React from "react";
import MagicBento from "@/components/ui/MagicBento";
import { GraduationCap, Code2, Briefcase, Users, Award, TrendingUp, BookOpen, Target } from "lucide-react";
import Link from "next/link";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Industry-Focused Curriculum",
      description: "Our training programs are designed by industry experts to match current market demands. Learn the latest technologies and frameworks that companies are actively hiring for.",
      highlight: "Updated quarterly with industry trends",
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Hands-On Live Projects",
      description: "Work on real-world projects from day one. Build a professional portfolio while learning, giving you practical experience that sets you apart in interviews.",
      highlight: "10+ live projects per course",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Guaranteed Placement Support",
      description: "Dedicated placement cell with connections to 200+ partner companies. Get resume building, mock interviews, and direct referrals to hiring managers.",
      highlight: "95% placement success rate",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Trainers",
      description: "Learn from certified professionals with 8+ years of industry experience. Get personalized mentorship and guidance throughout your learning journey.",
      highlight: "Average 10+ years experience",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Industry Certifications",
      description: "Earn recognized certifications upon course completion. Our certificates are valued by employers and help you stand out in the competitive job market.",
      highlight: "Recognized certifications",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth Focus",
      description: "We don't just train you for your first job. Our curriculum prepares you for long-term career growth with advanced modules and specializations.",
      highlight: "Future-ready skills",
    },
    
  ];

  const featuresWithLayout = features.map((feature, index) => ({
    ...feature,
    style: {
      gridColumn: index === 0 || index === 3 ? "span 2" : "span 1",
    },
  }));

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Subtle background pattern */}
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
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-5">
            Why Choose <span className="text-emerald-600">CODE IT</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're not just another training institute. We're your career transformation partner, committed to your success in the IT industry.
          </p>
        </div>

        {/* MagicBento Grid */}
        <div className="relative flex justify-center">
          <MagicBento
            items={featuresWithLayout}
            textAutoHide={false}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect
            spotlightRadius={300}
            particleCount={15}
            glowColor="16, 185, 129" // emerald-500 in RGB
            disableAnimations={false}
          />
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Ready to transform your career with industry-leading IT training?
          </p>
          
          <Link
  href="/courses"
  className="inline-flex items-center justify-center h-11 px-7 text-sm font-medium bg-black hover:bg-gray-800 text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
>
  Explore Our Courses
</Link>
          
        </div>
      </div>
    </section>
  );
}
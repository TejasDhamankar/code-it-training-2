"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "The learning experience was extremely structured and practical. Every concept was explained with real-world examples, which made it easy to apply immediately.",
      name: "Former Student",
      designation: "Full Stack Development Program",
      src: "/Images/testimonials/s1.jpg",
    },
    {
      quote:
        "What truly stood out was the mentorship and guidance. It felt less like a course and more like a professional growth journey.",
      name: "Program Graduate",
      designation: "Software Engineering Trainee",
      src: "/Images/testimonials/s2.jpg",
    },
    {
      quote:
        "Hands-on projects and continuous feedback helped me build confidence. The transition from learning to implementation felt very natural.",
      name: "Internship Candidate",
      designation: "Frontend Developer Track",
      src: "/Images/testimonials/s3.jpg",
    },
    {
        quote:
          "The placement support was phenomenal. They helped me craft my resume, conducted mock interviews, and connected me with top companies. I landed a job even before the course ended!",
        name: "Placed Alumnus",
        designation: "Data Science & AI Program",
        src: "/Images/testimonials/s4.jpg",
      },
  ];

  return (
    <section className="relative bg-stone-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            What Our Learners Say
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
            Real experiences from students who chose to build practical skills
            and grow with confidence.
          </p>
        </div>

        {/* Animated Testimonials */}
        <AnimatedTestimonials testimonials={testimonials} autoplay />
      </div>
    </section>
  );
}

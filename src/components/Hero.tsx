"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".animate-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      }).from(
        imageRef.current,
        {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-white overflow-hidden"
    >
      {/* Main Container with controlled width */}
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl pt-32 pb-0 relative z-20">
        {/* Content Area - Top Left Aligned */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <h1 className="animate-text text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-5">
            Best IT Software Training Institute in Pune –{" "}
            <span className="block">CODE IT</span>
          </h1>

          <p className="animate-text text-base md:text-lg text-gray-900 mb-6 leading-relaxed max-w-xl">
            Industry-Focused Software Training with Live Projects & Placement
            Support
          </p>

          <p className="animate-text text-sm md:text-base text-gray-800 mb-8 leading-relaxed max-w-xl">
            Develop job-focused IT skills from certified trainers. Work on real
            projects, gain industry exposure, and launch your IT career with a
            job-ready mindset.
          </p>

          <div className="animate-text flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button
              size="lg"
              className="h-11 px-7 text-sm font-medium bg-black hover:bg-gray-800 text-white rounded-lg shadow-lg"
            >
              Start your free trial
            </Button>
            <button className="text-sm font-medium text-black hover:text-gray-900 transition-colors">
              View role based demos
            </button>
          </div>
        </div>
      </div>

      {/* Background Image - Positioned absolutely with diagonal tilt */}
      <div
        ref={imageRef}
        className="absolute left-0 right-0 pointer-events-none z-0"
        style={{ 
          top: "40%",
          height: "80%"
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: "perspective(1800px) rotateX(15deg) rotateY(-4deg) rotateZ(-3deg)",
            transformOrigin: "center center",
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/Images/hero-image.webp"
              alt="CODE IT Dashboard Interface"
              fill
              className="object-contain object-center"
              style={{ 
                maxWidth: "95%",
                margin: "0 auto",
                transform: "translate(3rem, 2rem)"
              }}
              priority
            />
          </div>

          {/* Gradient overlays to blend seamlessly */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white via-white/60 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/30 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
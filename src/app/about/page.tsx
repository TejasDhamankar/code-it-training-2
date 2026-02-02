"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    CheckCircle2,
    ArrowRight,
    Target,
    Rocket,
    Users,
    Award,
    Briefcase,
    GraduationCap,
    Globe,
    Star
} from "lucide-react";

// Shadcn & UI Components
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProfileCard from "@/components/ProfileCard"; // Your installed component
import { Timeline } from "@/components/ui/timeline";
import MagicBento from "@/components/ui/MagicBento";
import Carousel, { CarouselItem } from "@/components/ui/Carousel";
import { FiBriefcase, FiCheckCircle, FiCpu, FiTarget, FiTrendingUp, FiUserCheck } from "react-icons/fi";

// GSAP Plugin Registration
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const whyChooseItems: CarouselItem[] = [
    {
        id: 1,
        title: "Expert IT Mentorship",
        description: "Training delivered by professionals with proven industrial experience in top tech firms.",
        icon: <FiUserCheck className="h-4 w-4 text-white" />
    },
    {
        id: 2,
        title: "Practical Learning",
        description: "A strong focus on practical learning through hands-on exercises and real-world implementation.",
        icon: <FiCpu className="h-4 w-4 text-white" />
    },
    {
        id: 3,
        title: "Live Industrial Projects",
        description: "Gain critical industry exposure by working on real-time case studies and live project scenarios.",
        icon: <FiTarget className="h-4 w-4 text-white" />
    },
    {
        id: 4,
        title: "Industry-Ready Curriculum",
        description: "A career-focused syllabus meticulously designed to meet current market and employer demands.",
        icon: <FiTrendingUp className="h-4 w-4 text-white" />
    },
    {
        id: 5,
        title: "Placement Assistance",
        description: "Complete support for career readiness, including resume building and interview preparation.",
        icon: <FiBriefcase className="h-4 w-4 text-white" />
    },
    {
        id: 6,
        title: "Updated Tech Stack",
        description: "Continuous learning with the latest technologies ensures you stay ahead in the fast-paced IT world.",
        icon: <FiCheckCircle className="h-4 w-4 text-white" />
    }
];

export default function AboutPage() {
    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const containerRef = useRef(null); // Declare containerRef
    const imageRef = useRef(null); // Declare imageRef
    const timelineRef = useRef(null);
    const featureOneRef = useRef(null);
    const featureTwoRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".animate-about-text", {
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

    const timelineData = [
        {
            title: "2021",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-black mb-3">
                        The Beginning
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Founded in Rajasthan with the goal of technical transformation and
                        practical skill development.
                    </p>
                </div>
            ),
        },
        {
            title: "2022",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-black mb-3">
                        Strong Foundation
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Expanded training programs to Full Stack Development, Data Science,
                        and Cloud Computing.
                    </p>
                </div>
            ),
        },
        {
            title: "2023",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-black mb-3">
                        Industry Network
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Built partnerships for internships, live projects, and real-world
                        exposure.
                    </p>
                </div>
            ),
        },
        {
            title: "2024",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-black mb-3">
                        The Pune Chapter
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Expanded operations to Pune, India’s leading technology hub.
                    </p>
                </div>
            ),
        },
        {
            title: "2025",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-black mb-3">
                        Innovation & Growth
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        A powerful testament to unwavering commitment to excellence and
                        career-focused education.
                    </p>
                </div>
            ),
        },
    ];


    return (
        <main ref={pageRef} className="bg-white min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900">

            {/* SECTION 1: ABOUT HERO (Direct Styling Match to your Hero code) */}
            <section
                ref={containerRef}
                className="relative min-h-screen bg-white overflow-hidden border-b border-gray-100"
            >
                {/* 1. Content Area - Top Left Aligned (z-20 to stay above image) */}
                <div className="container mx-auto px-6 lg:px-8 max-w-7xl pt-32 pb-0 relative z-20">
                    <div className="max-w-3xl">
                        <Badge className="animate-about-text mb-6 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 px-4 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">

                        </Badge>

                        <h1 className="animate-about-text text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
                            Empowering Minds, <span className="text-emerald-600">Building Futures.</span>
                        </h1>

                        <p className="animate-about-text text-lg md:text-xl text-gray-800 mb-8 leading-relaxed font-medium">
                            CODE IT is a trusted software training institute in Pune that offers quality IT and programming education.
                        </p>

                        <p className="animate-about-text text-base md:text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl">
                            We focus on true learning that comes from practice, not just theory. Our goal is to make learning simple, practical, and effective so beginners can confidently step into technology.
                        </p>

                        <div className="animate-about-text flex items-center gap-6">
                            <Button className="bg-black text-white px-8 py-6 rounded-xl hover:bg-gray-800 transition-all shadow-lg text-base font-semibold">
                                Explore Our Courses
                            </Button>
                            <Link href="#story" className="text-sm font-bold text-gray-900 flex items-center gap-2 hover:text-emerald-600 transition-colors">
                                Our Success Story <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 2. Background Image - Positioned Right/Center Behind Content */}
                <div
                    ref={imageRef}
                    className="absolute left-0 right-0 pointer-events-none z-0"
                    style={{
                        top: "35%",
                        height: "90%"
                    }}
                >
                    <div
                        className="relative w-full h-full"
                        style={{
                            transform: "perspective(2000px) rotateX(15deg) rotateY(-8deg) rotateZ(-2deg)",
                            transformOrigin: "center center",
                        }}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src="/Images/about-hero-trajectory.png"
                                alt="CODE IT Success Trajectory"
                                fill
                                className="object-contain"
                                style={{
                                    maxWidth: "100%",
                                    margin: "0 auto",
                                    // This pushes the image to the right while keeping it behind text
                                    transform: "translateX(25%) translateY(-12rem)"
                                }}
                                priority
                            />
                        </div>

                        {/* Seamless Blend Overlays */}
                        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white via-white/40 to-transparent pointer-events-none z-10" />
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/20 to-transparent pointer-events-none" />
                        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white via-white/10 to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* Subtle Side Decorative Gradient */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50/20 to-transparent pointer-events-none z-10" />
            </section>

            {/* SECTION 2: THE LEADERSHIP (Using your installed ProfileCard) */}
            <section className="py-24 bg-gray-50/50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="w-full md:w-1/3">
                            <ProfileCard
                                name="Our Founder"
                                role="Industry Expert & Visionary"
                                avatarUrl="/Images/member1.jpg"
                                description="Visionary leadership became the driving force behind establishing CODE IT as a trusted name in quality IT education."
                                className="shadow-2xl border-none text-black"
                            />
                        </div>
                        <div className="w-full md:w-2/3">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">A Message from the <span className="text-emerald-600">Visionary Leadership</span></h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                                "Our mission is to deliver result-oriented IT training with practical experience that aligns with current industry needs."
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                                        <Target size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Practical Goals</h4>
                                        <p className="text-sm text-gray-600">Focus on student success and long-term career growth.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Expanding Horizons</h4>
                                        <p className="text-sm text-gray-600">Expanding presence across multiple cities in India. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: FEATURE SECTION 1 (Left Content, Right Image) */}
            <section ref={featureOneRef} className="py-32 overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
                                Our Learning <span className="text-emerald-600">Methodology</span>
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { title: "Practical & Planned", desc: "We believe in step-by-step well-explained concepts.", icon: <GraduationCap /> },
                                    { title: "Hands-on Exercise", desc: "Our method includes hands-on exercises and real-time projects.", icon: <Rocket /> },
                                    { title: "Core Foundation", desc: "Focus on coding, critical thinking, and development principles.", icon: <Star /> }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="h-12 w-12 bg-gray-100 text-gray-900 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                            {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 feature-image-1">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                                <Image
                                    src="/Images/feature-section-1.png"
                                    alt="Practical Learning"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: FEATURE SECTION 2 (Right Content, Left Image) */}
            <section ref={featureTwoRef} className="py-32 bg-stone-50 overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="feature-image-2">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                                <Image
                                    src="/Images/feature-section-2.png"
                                    alt="Student Success"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
                                Who Can <span className="text-emerald-600">Join Us?</span>
                            </h2>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Code IT warmly greets school and college students, job aspirants, and working professionals.No basic technical background is required.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Beginners in Programming",
                                    "College Students",
                                    "Working Professionals",
                                    "Job Aspirants ",
                                    "School Students",
                                    "Step-by-step Guidance"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <CheckCircle2 className="text-emerald-600" size={18} />
                                        <span className="text-sm font-semibold text-gray-800">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: THE SUCCESS JOURNEY (Aceternity Timeline) */}
            <section
                id="story"
                ref={timelineRef}
                className="py-32 bg-white border-t border-gray-100"
            >
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
                            The Journey of <span className="text-emerald-600">Success</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            From a small vision in 2021 to shaping careers in 2025.
                        </p>
                    </div>

                    {/* Aceternity Timeline */}
                    <Timeline
                        data={timelineData}
                    />
                </div>
            </section>


            {/* SECTION: WHY CHOOSE CODE IT (Magic Bento – Light) */}
            <section id="why" className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50/20 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left Side: Content */}
                        <div className="z-10">
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black leading-[1.05] mb-8">
                                Why CODE IT is the <span className="text-emerald-600">Smart Choice</span> for Your IT Career.
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-xl">
                                At CODE IT Software Training Institute, we are committed to building complete career-ready skills.
                                Our project-based learning approach where students work on real-time scenarios builds the
                                problem-solving experience required for top IT projects. [cite: 32]
                            </p>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-emerald-700 font-semibold">
                                    <FiCheckCircle /> <span>Real-time Project Execution</span>
                                </div>
                                <div className="flex items-center gap-3 text-emerald-700 font-semibold">
                                    <FiCheckCircle /> <span>Expert Professional Guidance</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Massive 3D Carousel */}
                        <div className="flex justify-center lg:justify-end">
                            <Carousel
                                items={whyChooseItems}
                                baseWidth={500} // Large enough to cover a significant part of the viewport
                                autoplay={true}
                                autoplayDelay={4000}
                                pauseOnHover={true}
                                loop={true}
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* SECTION 7: CALL TO ACTION (CTA) */}
            <section className="relative w-full py-32 md:py-48 overflow-hidden bg-[#fafaf9]">
                {/* 1. The Spotlight: Positioned to sweep across the wide background */}
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="rgba(16, 185, 129, 0.5)" // Emerald-500 with increased opacity for visibility
                />

                <div className="container relative z-10 mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col items-center text-center">
                        {/* Section Label */}
                        <span className="mb-4 text-sm font-bold tracking-widest text-emerald-600 uppercase">
                            Start Your IT Career Today
                        </span>

                        {/* Main Heading: Tight, Bold, and Authoritative */}
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-gray-900 leading-[1.1] mb-8">
                            Ready to transform your <br className="hidden md:block" />
                            technical <span className="text-emerald-600">potential?</span>
                        </h2>

                        {/* Supporting Text: Clean and spacious */}
                        <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
                            Our experts are ready to guide you. Get quick counseling and choose
                            the right course to start your IT career without delay.
                        </p>

                        {/* Premium Button Group */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="h-14 px-10 text-base font-bold bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl shadow-2xl shadow-emerald-200 transition-all hover:scale-105"
                            >
                                Talk to an Expert Now
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-10 text-base font-bold border-gray-200 text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
                            >
                                View Courses
                            </Button>
                        </div>

                        {/* Subtle Trust Badge */}
                        <p className="mt-12 text-sm text-gray-400 font-medium italic">
                            Trusted by students across Pune & Rajasthan
                        </p>
                    </div>
                </div>

                {/* 2. Wide Background Accents: Replacing the small card circles */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(16,185,129,0.03)_0%,transparent_100%)] pointer-events-none" />
            </section>
        </main>
    );
}
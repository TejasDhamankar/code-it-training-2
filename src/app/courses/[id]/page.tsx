"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, MessageCircle } from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    async function fetchCourse() {
      const res = await fetch(`/api/courses`); // In a real app, use /api/courses/${id}
      const allCourses = await res.json();
      const match = allCourses.find((c: any) => c._id === id);
      setCourse(match);
    }
    if (id) fetchCourse();
  }, [id]);

  if (!course) return <div className="min-h-screen flex items-center justify-center">Loading Course Details...</div>;

  return (
    <main className="min-h-screen bg-white pt-40 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Main Info */}
          <div className="lg:col-span-2">
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-6 uppercase tracking-widest px-4 py-1">
              {course.category}
            </Badge> [cite: 63]
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              {course.title}
            </h1> [cite: 61]
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              {course.description}
            </p> [cite: 62]

            <div className="space-y-6 border-t border-stone-100 pt-12">
              <h3 className="text-2xl font-bold">What you'll learn</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {["Industry Relevant Skills", "Live Project Experience", "Certified Training", "Job Assistance"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-600" size={20} />
                    <span className="font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-8 bg-stone-50 rounded-[2rem] border border-stone-200 shadow-xl">
              <div className="flex items-center gap-3 text-stone-500 mb-6">
                <Clock size={20} className="text-emerald-600" />
                <span className="font-bold">Duration: {course.duration || "3-6 Months"}</span>
              </div>
              <Button className="w-full bg-emerald-600 h-14 rounded-xl text-lg font-bold mb-4 shadow-lg shadow-emerald-200">
                Enroll in Course
              </Button> [cite: 109, 110]
              <Button variant="outline" className="w-full h-14 rounded-xl border-stone-200 flex gap-2">
                <MessageCircle size={20} /> WhatsApp Us
              </Button> [cite: 111]
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
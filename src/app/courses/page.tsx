"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "CORE Programming",
    "Advanced IT Technologies",
    "Trending & Future-Ready Technologies",
    "Specialized Training Programs"
  ];

  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
      setLoading(false);
    }
    fetchCourses();
  }, []);

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Explore Our <span className="text-emerald-600">IT Courses</span>
          </h1> 
          <p className="text-lg text-gray-600">Learn industry-ready skills with structured learning paths.</p>
        </div>

        <Tabs defaultValue="CORE Programming" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white border border-stone-200 p-1 h-auto rounded-2xl shadow-sm">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="px-6 py-3 rounded-xl data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-bold text-sm">
                  {cat.split(' ')[0]} {/* Shortens names for the tab UI */}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.filter((c: any) => c.category === cat).map((course: any) => (
                  <Link key={course._id} href={`/courses/${course._id}`}>
                    <Card className="group border-stone-200 bg-white hover:shadow-2xl transition-all rounded-[2rem] overflow-hidden p-8 cursor-pointer">
                      <Badge className="mb-4 bg-emerald-50 text-emerald-700 border-emerald-200">{course.category}</Badge> [cite: 63]
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600">
                        {course.title}
                      </CardTitle> [cite: 64, 73, 85, 95]
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-sm font-semibold text-stone-500 flex items-center gap-2">
                          <Clock size={16} /> {course.duration || "3 Months"}
                        </span>
                        <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
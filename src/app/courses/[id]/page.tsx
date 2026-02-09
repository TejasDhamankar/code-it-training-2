"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COURSE_CATEGORY_LABELS, type CourseCategory } from "@/lib/course-categories";
import Link from "next/link";

interface Course {
  _id: string;
  title: string;
  slug: string;
  category: CourseCategory;
  description: string;
  duration: string;
  image?: string;
}

const LEARNING_POINTS = [
  "Industry Relevant Skills",
  "Live Project Experience",
  "Certified Training",
  "Placement Assistance",
  "Mock Interviews",
  "Resume Building",
];

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/courses/slug/${params.id}`);
        if (!res.ok) {
          throw new Error("Course not found");
        }
        const data = (await res.json()) as Course;
        setCourse(data);
      } catch (error) {
        console.error(error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCourse();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-900 border-t-transparent" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white text-center">
        <h2 className="text-2xl font-bold text-gray-900">Course Not Found</h2>
        <p className="mt-2 text-gray-600">
          We couldn&apos;t find the course you&apos;re looking for.
        </p>
        <Button asChild className="mt-6">
          <Link href="/courses">
            <ArrowLeft size={16} className="mr-2" />
            Back to Courses
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-24 pt-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/courses">
              <ArrowLeft size={16} className="mr-2" />
              Back to Courses
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative mb-6 h-80 w-full overflow-hidden rounded-2xl bg-gray-100">
              {course.image && (
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                />
              )}
            </div>
            
            <Badge className="mb-4 bg-gray-100 text-gray-800">
              {COURSE_CATEGORY_LABELS[course.category]}
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {course.title}
            </h1>
            
            <p className="mt-6 text-lg text-gray-600">
              {course.description}
            </p>

            <div className="mt-12 rounded-2xl bg-gray-50 p-8">
              <h2 className="text-2xl font-bold text-gray-900">What You&apos;ll Learn</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {LEARNING_POINTS.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-green-500" />
                    <span className="font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-32 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex items-center gap-3 text-lg font-medium text-gray-700">
                <Clock size={20} />
                <span>Duration: <span className="font-bold text-gray-900">{course.duration || "3 Months"}</span></span>
              </div>

              <div className="mt-6 space-y-3">
                <Link href="/contact">
                <Button size="lg" className="h-12 w-full bg-gray-900 text-white hover:bg-gray-800">
                  Enroll Now
                </Button>
                </Link>

                <Link href="/contact">
                <Button size="lg" variant="outline" className="h-12 w-full">
                  <MessageCircle size={20} className="mr-2" />
                  Contact Us
                </Button>
                </Link>
              </div>
              <p className="mt-4 text-center text-xs text-gray-500">
                Have questions? Reach out to our team.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

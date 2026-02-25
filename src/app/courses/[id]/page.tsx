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
  shortDescription: string;
  fullDescription: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  language: "English" | "Hindi" | "Mixed";
  mode: "Online" | "Offline" | "Hybrid";
  thumbnail: string;
  previewVideo?: string;
  modules: {
    moduleTitle: string;
    topics: string[];
  }[];
  keyHighlights: string[];
  toolsCovered: string[];
  placementSupport: boolean;
  averagePackage?: string;
  hiringPartners: string[];
  price: number;
  discountPrice?: number;
  isPopular: boolean;
  startDate: string;
  seatsAvailable: number;
  metaTitle?: string;
  metaDescription?: string;
}

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
              <Image
                src={course.thumbnail || "/images/placeholder.png"}
                alt={course.title}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
              />
            </div>
            
            <Badge className="mb-4 bg-gray-100 text-gray-800">
              {COURSE_CATEGORY_LABELS[course.category]}
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {course.title}
            </h1>
            
            <p className="mt-6 text-lg text-gray-600">
              {course.shortDescription}
            </p>

            {course.keyHighlights && course.keyHighlights.length > 0 && (
              <div className="mt-12 rounded-2xl bg-gray-50 p-8">
                <h2 className="text-2xl font-bold text-gray-900">What You&apos;ll Learn</h2>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {course.keyHighlights.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={20} className="text-green-500" />
                      <span className="font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {course.fullDescription && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900">Full Description</h2>
                <div
                  className="prose prose-lg mt-6 max-w-none"
                  dangerouslySetInnerHTML={{ __html: course.fullDescription }}
                />
              </div>
            )}

            {course.toolsCovered && course.toolsCovered.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900">Tools Covered</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.toolsCovered.map((tool) => (
                    <Badge key={tool} variant="secondary">{tool}</Badge>
                  ))}
                </div>
              </div>
            )}
            
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-32 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex items-center gap-3 text-lg font-medium text-gray-700">
                <Clock size={20} />
                <span>Duration: <span className="font-bold text-gray-900">{course.duration}</span></span>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li><strong>Level:</strong> {course.level}</li>
                <li><strong>Mode:</strong> {course.mode}</li>
                <li><strong>Language:</strong> {course.language}</li>
                <li><strong>Seats Available:</strong> {course.seatsAvailable}</li>
                <li><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</li>
              </ul>

              <div className="mt-6">
                <p className="text-3xl font-bold text-gray-900">
                  ₹{course.discountPrice?.toLocaleString() ?? course.price.toLocaleString()}
                  {course.discountPrice && (
                    <span className="ml-2 text-xl font-normal text-gray-500 line-through">
                      ₹{course.price.toLocaleString()}
                    </span>
                  )}
                </p>
              </div>

              {course.placementSupport && (
                <div className="mt-6 rounded-lg bg-green-50 p-4 text-center">
                  <p className="font-bold text-green-700">100% Placement Support</p>
                  {course.averagePackage && (
                    <p className="text-sm text-green-600">Average Package: {course.averagePackage}</p>
                  )}
                </div>
              )}

              {course.hiringPartners && course.hiringPartners.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-gray-900">Hiring Partners</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {course.hiringPartners.map((partner) => (
                      <Badge key={partner} variant="outline">{partner}</Badge>
                    ))}
                  </div>
                </div>
              )}

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

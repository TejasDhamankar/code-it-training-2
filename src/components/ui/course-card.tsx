import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, BarChart, CheckCircle } from "lucide-react";

// Define the interface for the course object based on the new schema
interface Course {
  _id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  level: string;
  duration: string;
  thumbnail: string;
  keyHighlights?: string[];
}

export function RichCourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.slug}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-44 w-full">
          <Image
            src={course.thumbnail || "/images/placeholder.png"}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex-1">
            <div className="flex items-center justify-between">
                <Badge className="rounded-full bg-blue-100 text-blue-800 font-medium">
                {course.category}
                </Badge>
            </div>
            <h3 className="mt-3 text-lg font-bold text-gray-900">
              {course.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-gray-600">
              {course.shortDescription}
            </p>
            
            {course.keyHighlights && course.keyHighlights.length > 0 && (
                <div className="mt-4 space-y-2 text-xs text-gray-500">
                    {course.keyHighlights.slice(0, 2).map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                            <span>{highlight}</span>
                        </div>
                    ))}
                </div>
            )}
          </div>

          <div className="mt-6 border-t border-gray-100 pt-4">
             <div className="flex items-center justify-between text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                    <BarChart size={16} />
                    <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
                  <span>View Course</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

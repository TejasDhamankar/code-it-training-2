import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import { Course } from "@/lib/models/Course";
import CourseLibrary from "@/components/CourseLibrary";

// This is the new data fetching function that runs on the server.
async function getCourses() {
  try {
    await connectToDatabase();
    // Fetch only the fields needed for the course cards to minimize data transfer
    const courses = await Course.find({}, {
      _id: 1,
      title: 1,
      slug: 1,
      shortDescription: 1,
      category: 1,
      level: 1,
      duration: 1,
      thumbnail: 1,
      keyHighlights: 1,
      isPopular: 1,
    }).lean();
    
    // Thelean() method returns plain JavaScript objects, not Mongoose documents. 
    // This is faster and uses less memory. We need to convert `_id` to a string.
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.error("Database error while fetching courses:", error);
    return [];
  }
}

// The main page is now a Server Component
export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-gray-50 pb-24 pt-28">
      <div className="container mx-auto max-w-7xl px-4">
        <header className="relative overflow-hidden rounded-2xl bg-white px-5 py-10 shadow-sm sm:px-8 sm:py-14">
          <div className="relative z-10">
            <Badge className="rounded-full bg-blue-100 text-blue-800">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Your Career Starts Here
            </Badge>
            <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Our Course Catalog
            </h1>
            <p className="mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
              Explore practical, industry-aligned programs designed to take you from fundamentals to job-ready expertise.
            </p>
          </div>
        </header>

        <main className="mt-12">
            <CourseLibrary initialCourses={courses} />
        </main>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Search, Filter, Book } from "lucide-react";
import { RichCourseCard } from "@/components/ui/course-card";
import { COURSE_CATEGORIES } from "@/lib/course-categories";

// This should match the comprehensive course model, but only with fields needed for the card and filtering.
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
  isPopular: boolean;
}

type SortOption = "popular" | "title-asc" | "duration-asc" | "duration-desc";

const parseDurationToMonths = (value: string = "") => {
  const normalized = value.toLowerCase();
  const match = normalized.match(/(\d+(\.\d+)?)/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  const amount = Number(match[1]);
  if (Number.isNaN(amount)) return Number.MAX_SAFE_INTEGER;
  if (normalized.includes("week")) return amount / 4;
  return amount;
};

export default function CourseLibrary({ initialCourses }: { initialCourses: Course[] }) {
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("popular");

  const filteredAndSortedCourses = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = !search
      ? initialCourses
      : initialCourses.filter((course) =>
          course.title.toLowerCase().includes(search) ||
          course.shortDescription.toLowerCase().includes(search) ||
          course.category.toLowerCase().includes(search)
        );

    const sorted = [...filtered];
    switch (sortOption) {
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "duration-asc":
        sorted.sort((a, b) => parseDurationToMonths(a.duration) - parseDurationToMonths(b.duration));
        break;
      case "duration-desc":
        sorted.sort((a, b) => parseDurationToMonths(b.duration) - parseDurationToMonths(a.duration));
        break;
      case "popular":
      default:
        sorted.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
    }
    return sorted;
  }, [initialCourses, query, sortOption]);

  const coursesByCategory = useMemo(() => {
    const categories = COURSE_CATEGORIES;
    return categories.reduce<Record<string, Course[]>>((acc, category) => {
      acc[category] = filteredAndSortedCourses.filter((course) => course.category === category);
      return acc;
    }, {});
  }, [filteredAndSortedCourses]);

  return (
    <section className="w-full">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by course or keyword..."
                    className="h-12 w-full rounded-full border-gray-300 bg-white pl-12 pr-4 text-base"
                />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 rounded-full border-gray-300 bg-white px-5">
                    <Filter className="mr-2 h-4 w-4" />
                    Sort Courses
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl border-gray-200">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortOption} onValueChange={(v) => setSortOption(v as SortOption)}>
                    <DropdownMenuRadioItem value="popular">Popular</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="title-asc">Title A-Z</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="duration-asc">Duration (Shortest)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="duration-desc">Duration (Longest)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        
      <Tabs defaultValue="all" className="w-full">
        <div className="mb-8 flex justify-center">
          <TabsList className="flex h-auto min-w-max flex-wrap gap-2 rounded-full border border-gray-200 bg-white p-2">
            <TabsTrigger value="all" className="tab-trigger">
              All <span className="tab-count">{filteredAndSortedCourses.length}</span>
            </TabsTrigger>
            {COURSE_CATEGORIES.map((category) => (
              <TabsTrigger key={category} value={category} className="tab-trigger">
                {category} <span className="tab-count">{coursesByCategory[category]?.length ?? 0}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="all">
          <CourseGrid courses={filteredAndSortedCourses} />
        </TabsContent>

        {COURSE_CATEGORIES.map((category) => (
          <TabsContent key={category} value={category}>
            <CourseGrid courses={coursesByCategory[category]} />
          </TabsContent>
        ))}
      </Tabs>
      <style jsx>{`
        .tab-trigger {
            @apply rounded-full px-4 py-2 text-sm font-semibold text-gray-600 transition-colors;
        }
        .tab-trigger[data-state="active"] {
            @apply bg-blue-600 text-white shadow-md;
        }
        .tab-count {
            @apply ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-700;
        }
        .tab-trigger[data-state="active"] .tab-count {
            @apply bg-blue-500 text-white;
        }
      `}</style>
    </section>
  );
}

function CourseGrid({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white py-20 text-center">
        <Book size={48} className="text-gray-400" />
        <h3 className="mt-6 text-xl font-semibold text-gray-900">No Courses Found</h3>
        <p className="mt-2 text-base text-gray-600">Try adjusting your search or filter options.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <RichCourseCard key={course._id} course={course} />
      ))}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Book, Clock, Image as ImageIcon, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { COURSE_CATEGORIES, COURSE_CATEGORY_LABELS, type CourseCategory } from "@/lib/course-categories";

interface Course {
  _id: string;
  title: string;
  slug: string;
  category: CourseCategory;
  description: string;
  duration: string;
  image?: string;
}

interface CourseForm {
  title: string;
  slug: string;
  category: CourseCategory;
  description: string;
  duration: string;
  image: string;
}

const INITIAL_FORM: CourseForm = {
  title: "",
  slug: "",
  category: COURSE_CATEGORIES[0],
  description: "",
  duration: "3 Months",
  image: "",
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState<CourseForm>(INITIAL_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const filteredCourses = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return courses;

    return courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(search) ||
        course.category.toLowerCase().includes(search) ||
        course.duration.toLowerCase().includes(search)
      );
    });
  }, [courses, query]);

  const fetchCourses = async () => {
    setFetching(true);
    setError("");
    try {
      const res = await fetch("/api/courses");
      if (!res.ok) {
        throw new Error("Failed to load courses");
      }
      const data = (await res.json()) as Course[];
      setCourses(Array.isArray(data) ? data : []);
    } catch (fetchError) {
      console.error(fetchError);
      setCourses([]);
      setError("Could not load courses. Check database connection and refresh.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const uploadForm = new FormData();
        uploadForm.append("file", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadForm,
        });

        if (!uploadRes.ok) {
          throw new Error("Image upload failed");
        }

        const uploadData = (await uploadRes.json()) as { path: string };
        imageUrl = uploadData.path;
      }

      const payload = {
        ...formData,
        slug: formData.slug || toSlug(formData.title),
        image: imageUrl,
      };

      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create course");
      }

      setFormData(INITIAL_FORM);
      setImageFile(null);
      await fetchCourses();
    } catch (submitError) {
      console.error(submitError);
      setError("Unable to save this course right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete course");
      }
      await fetchCourses();
    } catch (deleteError) {
      console.error(deleteError);
      setError("Unable to delete the selected course.");
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Courses</h1>
          <p className="mt-1 text-gray-600">Manage your course catalog.</p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search courses..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 rounded-xl border-gray-200 bg-white pl-10"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50">
            <h2 className="text-lg font-bold text-gray-900">Add New Course</h2>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Course Title</label>
                <Input
                  placeholder="e.g. Java Full Stack"
                  value={formData.title}
                  onChange={(event) => {
                    const title = event.target.value;
                    setFormData((prev) => ({ ...prev, title, slug: toSlug(title) }));
                  }}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, category: event.target.value as CourseCategory }))
                  }
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm"
                >
                  {COURSE_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {COURSE_CATEGORY_LABELS[category]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Clock size={14} /> Duration
                </label>
                <Input
                  placeholder="e.g. 3 Months"
                  value={formData.duration}
                  onChange={(event) => setFormData((prev) => ({ ...prev, duration: event.target.value }))}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <ImageIcon size={14} /> Course Image
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                  className="file:mr-3 file:rounded-full file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  placeholder="Describe outcomes and target learners"
                  value={formData.description}
                  onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
                  className="min-h-24 rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <Button
                disabled={loading}
                className="h-11 w-full rounded-xl bg-gray-900 px-6 text-white hover:bg-gray-800"
              >
                <Plus size={16} className="mr-2" />
                {loading ? "Saving..." : "Publish Course"}
              </Button>
            </div>

            {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
          </form>
        </div>

        <div className="lg:col-span-2">
          {fetching ? (
            <div className="flex h-full items-center justify-center rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50">
              <p className="text-sm text-gray-500">Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-6">
              <div className="text-center">
                <Book size={40} className="mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">No courses found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {query ? "Try a different search term." : "Add a new course to get started."}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
              {filteredCourses.map((course) => (
                <div key={course._id} className="group rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-200/50 transition-all hover:shadow-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        {course.image ? (
                          <Image src={course.image} alt={course.title} fill sizes="64px" className="object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-gray-400">
                            <Book size={24} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500">{COURSE_CATEGORY_LABELS[course.category]}</p>
                        <h3 className="mt-1 text-base font-bold text-gray-900">{course.title}</h3>
                        <p className="mt-1 text-xs text-gray-500">{course.duration}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(course._id)}
                      className="h-8 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

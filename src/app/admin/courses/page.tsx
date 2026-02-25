"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Book, Briefcase, DollarSign, Plus, Search, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { COURSE_CATEGORIES, type CourseCategory } from "@/lib/course-categories";

const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;
const COURSE_MODES = ["Online", "Offline", "Hybrid"] as const;
const COURSE_LANGUAGES = ["English", "Hindi", "Mixed"] as const;

type CourseLevel = (typeof COURSE_LEVELS)[number];
type CourseMode = (typeof COURSE_MODES)[number];
type CourseLanguage = (typeof COURSE_LANGUAGES)[number];

interface Module {
  moduleTitle: string;
  topics: string[];
}



interface Course {
  _id: string;
  title: string;
  slug: string;
  category: CourseCategory;
  shortDescription: string;
  level: CourseLevel;
  duration: string;
  thumbnail: string;
  isPopular: boolean;
}

interface CourseForm {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: CourseCategory;
  duration: string;
  level: CourseLevel;
  language: CourseLanguage;
  mode: CourseMode;
  thumbnail: string;
  previewVideo: string;
  modules: string;
  
  keyHighlights: string;
  toolsCovered: string;
  placementSupport: boolean;
  averagePackage: string;
  hiringPartners: string;
  price: number;
  discountPrice: number;
  isPopular: boolean;
  startDate: string;
  seatsAvailable: number;
  metaTitle: string;
  metaDescription: string;
}

type ToastState =
  | {
      type: "success" | "error";
      message: string;
    }
  | null;

const INITIAL_FORM: CourseForm = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  category: "CORE Programming",
  duration: "",
  level: "Beginner",
  language: "English",
  mode: "Online",
  thumbnail: "",
  previewVideo: "",
  modules: "[]",
  
  keyHighlights: "",
  toolsCovered: "",
  placementSupport: false,
  averagePackage: "",
  hiringPartners: "",
  price: 0,
  discountPrice: 0,
  isPopular: false,
  startDate: new Date().toISOString().split("T")[0],
  seatsAvailable: 20,
  metaTitle: "",
  metaDescription: "",
};

const inputFieldClass =
  "h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";
const inputFileClass =
  "w-full text-sm text-gray-500 file:mr-3 file:rounded-full file:border-0 file:bg-stone-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-stone-700";
const labelClass = "mb-1 block text-sm font-medium text-gray-700";
const buttonPrimaryClass = "h-11 w-full rounded-xl bg-emerald-700 px-6 text-white hover:bg-emerald-800";
const helperTextClass = "mt-1 text-xs text-gray-500";
const errorTextClass = "mt-1 text-xs font-medium text-red-600";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const SectionHeader = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
  <div className="mb-4 mt-6 flex items-center gap-2">
    {icon}
    <h3 className="text-md font-bold text-gray-800">{title}</h3>
  </div>
);

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState<CourseForm>(INITIAL_FORM);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CourseForm, string>>>({});
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<ToastState>(null);

  const filteredCourses = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return courses;
    return courses.filter((course) => course.title.toLowerCase().includes(search));
  }, [courses, query]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const fetchCourses = async () => {
    setFetching(true);
    setError("");
    try {
      const res = await fetch("/api/courses");
      if (!res.ok) throw new Error("Failed to load courses");
      const data = (await res.json()) as Course[];
      setCourses(Array.isArray(data) ? data : []);
    } catch (fetchError) {
      console.error(fetchError);
      setError("Could not load courses.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleImageUpload = async (file: File | null) => {
    if (!file) return "";

    const uploadForm = new FormData();
    uploadForm.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: uploadForm });
    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const data = (await res.json()) as { path: string };
    return data.path;
  };

  const modulesPlaceholder = `[
  {
    "moduleTitle": "Module 1: Foundations",
    "topics": ["HTML5 Basics", "CSS3 Essentials", "JavaScript Fundamentals"]
  },
  {
    "moduleTitle": "Module 2: Advanced Topics",
    "topics": ["React Hooks", "State Management", "Next.js Routing"]
  }
]`;

  const parseModules = (rawModules: string): Module[] => {
    if (!rawModules.trim()) return [];

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawModules);
    } catch {
      throw new Error("Invalid JSON format. Check for syntax errors.");
    }

    if (!Array.isArray(parsed)) {
      throw new Error("Top-level structure must be a JSON array `[]`.");
    }

    const normalized = parsed
      .map((item, index) => {
        if (!item || typeof item !== "object") {
          throw new Error(`Item at index ${index} is not a valid module object.`);
        }
        const moduleItem = item as { moduleTitle?: unknown; topics?: unknown };
        const moduleTitle =
          typeof moduleItem.moduleTitle === "string" ? moduleItem.moduleTitle.trim() : "";
        
        if (!moduleTitle) {
          throw new Error(`\`moduleTitle\` is missing or invalid in item at index ${index}.`);
        }

        if (!Array.isArray(moduleItem.topics)) {
          throw new Error(`\`topics\` must be an array of strings in item at index ${index}.`);
        }
        
        const topics = moduleItem.topics
              .map((topic) => (typeof topic === "string" ? topic.trim() : ""))
              .filter(Boolean)
        
        if (topics.length !== moduleItem.topics.length) {
            throw new Error(`All topics in item at index ${index} must be non-empty strings.`);
        }

        return { moduleTitle, topics };
      })
      .filter(Boolean) as Module[];

    return normalized;
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof CourseForm, string>> = {};
    const priceValue = Number(formData.price);
    const discountValue = Number(formData.discountPrice);

    if (Number.isNaN(priceValue)) {
      nextErrors.price = "Enter a valid number for price.";
    }

    if (Number.isNaN(discountValue)) {
      nextErrors.discountPrice = "Enter a valid number for discount price.";
    }

    if (!Number.isNaN(priceValue) && !Number.isNaN(discountValue) && discountValue > 0) {
      if (discountValue >= priceValue) {
        nextErrors.discountPrice = "Discount price must be lower than price.";
      }
    }

    if (formData.modules.trim()) {
      try {
        parseModules(formData.modules);
      } catch (modulesError) {
        const message =
          modulesError instanceof Error ? modulesError.message : "Modules must be valid JSON.";
        nextErrors.modules = message;
      }
    }

    const partnersRaw = formData.hiringPartners.trim();
    if (partnersRaw && !partnersRaw.includes(",") && partnersRaw.split(/\s+/).length > 1) {
      nextErrors.hiringPartners = "Separate multiple partners with commas.";
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!validateForm()) {
        throw new Error("Please fix the highlighted fields.");
      }
      if (!formData.title.trim()) throw new Error("Course title is required.");
      if (!formData.shortDescription.trim()) throw new Error("Short description is required.");
      if (!formData.fullDescription.trim()) throw new Error("Full description is required.");
      if (!formData.duration.trim()) throw new Error("Duration is required.");
      
      if (!thumbnailFile && !formData.thumbnail.trim()) throw new Error("Course thumbnail is required.");

      const modules = parseModules(formData.modules);
      const thumbnailUrl = await handleImageUpload(thumbnailFile);

      const payload = {
        ...formData,
        slug: toSlug(formData.title),
        description: formData.fullDescription,
        thumbnail: thumbnailUrl || formData.thumbnail,
        modules,
        keyHighlights: formData.keyHighlights
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        toolsCovered: formData.toolsCovered
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        hiringPartners: formData.hiringPartners
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await res.json()) as { error?: string; details?: string[] };
      if (!res.ok) {
        const details = Array.isArray(result.details) ? result.details.join(" ") : "";
        throw new Error(details || result.error || "Failed to create course.");
      }

      setFormData(INITIAL_FORM);
      setThumbnailFile(null);
      await fetchCourses();
      showToast("success", "Course created successfully.");
    } catch (submitError: unknown) {
      console.error(submitError);
      const message = submitError instanceof Error ? submitError.message : "An error occurred.";
      setError(message);
      showToast("error", message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const payload = (await res.json()) as { error?: string };
        throw new Error(payload.error || "Failed to delete course.");
      }
      await fetchCourses();
      showToast("success", "Course deleted.");
    } catch (deleteError: unknown) {
      const message = deleteError instanceof Error ? deleteError.message : "Failed to delete course.";
      setError(message);
      showToast("error", message);
    }
  };

  return (
    <div className="space-y-8">
      {toast ? (
        <div
          className={`fixed right-4 top-4 z-50 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${
            toast.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border border-red-200 bg-red-50 text-red-900"
          }`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      ) : null}

      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Courses</h1>
          <p className="mt-1 text-gray-600">Manage your entire course catalog and details.</p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search courses..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 rounded-xl bg-white pl-10"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50">
            <h2 className="mb-6 text-lg font-bold text-gray-900">Add New Course</h2>

            <div className="space-y-4">
              <SectionHeader icon={<Book size={16} />} title="Basic Information" />
              <Input
                placeholder="Course Title"
                value={formData.title}
                onChange={(event) => setFormData((previous) => ({ ...previous, title: event.target.value }))}
                required
              />
              <Textarea
                placeholder="Short Description (120-150 characters)"
                value={formData.shortDescription}
                onChange={(event) =>
                  setFormData((previous) => ({ ...previous, shortDescription: event.target.value }))
                }
                maxLength={150}
                required
              />
              <Textarea
                placeholder="Full Description"
                value={formData.fullDescription}
                onChange={(event) =>
                  setFormData((previous) => ({ ...previous, fullDescription: event.target.value }))
                }
                required
                className="min-h-24"
              />
              <select
                value={formData.category}
                onChange={(event) =>
                  setFormData((previous) => ({ ...previous, category: event.target.value as CourseCategory }))
                }
                className={inputFieldClass}
              >
                {COURSE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Duration (e.g. 3 Months)"
                  value={formData.duration}
                  onChange={(event) => setFormData((previous) => ({ ...previous, duration: event.target.value }))}
                  required
                />
                <select
                  value={formData.level}
                  onChange={(event) =>
                    setFormData((previous) => ({ ...previous, level: event.target.value as CourseLevel }))
                  }
                  className={inputFieldClass}
                >
                  {COURSE_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.mode}
                  onChange={(event) =>
                    setFormData((previous) => ({ ...previous, mode: event.target.value as CourseMode }))
                  }
                  className={inputFieldClass}
                >
                  {COURSE_MODES.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.language}
                  onChange={(event) =>
                    setFormData((previous) => ({ ...previous, language: event.target.value as CourseLanguage }))
                  }
                  className={inputFieldClass}
                >
                  {COURSE_LANGUAGES.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Course Thumbnail</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setThumbnailFile(event.target.files?.[0] ?? null)}
                  className={inputFileClass}
                  required={!formData.thumbnail}
                />
              </div>

              

              <SectionHeader icon={<DollarSign size={16} />} title="Pricing & Enrollment" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Input
                    type="number"
                    placeholder="Price in INR (e.g. 49999)"
                    value={formData.price}
                    onChange={(event) => {
                      setFormData((previous) => ({ ...previous, price: Number(event.target.value) }));
                      setFormErrors((previous) => ({ ...previous, price: undefined }));
                    }}
                    required
                    min={0}
                  />
                  <p className={helperTextClass}>Base course fee before discounts.</p>
                  {formErrors.price ? <p className={errorTextClass}>{formErrors.price}</p> : null}
                </div>
                <div className="space-y-1">
                  <Input
                    type="number"
                    placeholder="Discounted price (e.g. 39999)"
                    value={formData.discountPrice}
                    onChange={(event) => {
                      setFormData((previous) => ({ ...previous, discountPrice: Number(event.target.value) }));
                      setFormErrors((previous) => ({ ...previous, discountPrice: undefined }));
                    }}
                    min={0}
                  />
                  <p className={helperTextClass}>Leave 0 or lower than price.</p>
                  {formErrors.discountPrice ? (
                    <p className={errorTextClass}>{formErrors.discountPrice}</p>
                  ) : null}
                </div>
                <div className="space-y-1">
                  <Input
                    type="number"
                    placeholder="Seats available (e.g. 30)"
                    value={formData.seatsAvailable}
                    onChange={(event) =>
                      setFormData((previous) => ({ ...previous, seatsAvailable: Number(event.target.value) }))
                    }
                    min={0}
                  />
                  <p className={helperTextClass}>Total seats for the next batch.</p>
                </div>
                <div>
                  <label className={labelClass}>Start Date</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(event) => setFormData((previous) => ({ ...previous, startDate: event.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={formData.isPopular}
                  onChange={(event) => setFormData((previous) => ({ ...previous, isPopular: event.target.checked }))}
                />
                <label htmlFor="isPopular">Mark as Popular</label>
              </div>

              <SectionHeader icon={<Briefcase size={16} />} title="Curriculum & Highlights" />
              <Textarea
                placeholder={modulesPlaceholder}
                value={formData.modules}
                onChange={(event) => {
                  setFormData((previous) => ({ ...previous, modules: event.target.value }));
                  setFormErrors((previous) => ({ ...previous, modules: undefined }));
                }}
                className="min-h-32 font-mono text-xs"
              />
              <p className={helperTextClass}>
                Expected: JSON array. Each module must include `moduleTitle` (string) and `topics` (array of strings).
              </p>
              {formErrors.modules ? <p className={errorTextClass}>{formErrors.modules}</p> : null}
              <Textarea
                placeholder="e.g. Live projects, 1-on-1 mentor support, Certified training"
                value={formData.keyHighlights}
                onChange={(event) =>
                  setFormData((previous) => ({ ...previous, keyHighlights: event.target.value }))
                }
              />
              <p className={helperTextClass}>Comma-separated list of standout features or outcomes.</p>
              <Textarea
                placeholder="e.g. Git, React, Figma, Next.js"
                value={formData.toolsCovered}
                onChange={(event) =>
                  setFormData((previous) => ({ ...previous, toolsCovered: event.target.value }))
                }
              />
              <p className={helperTextClass}>Comma-separated list of tools, libraries, or platforms.</p>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="placementSupport"
                  checked={formData.placementSupport}
                  onChange={(event) =>
                    setFormData((previous) => ({ ...previous, placementSupport: event.target.checked }))
                  }
                />
                <label htmlFor="placementSupport">Placement Support Included</label>
              </div>
              <Input
                placeholder="Average Package (e.g. 6 LPA)"
                value={formData.averagePackage}
                onChange={(event) =>
                  setFormData((previous) => ({ ...previous, averagePackage: event.target.value }))
                }
              />
              <p className={helperTextClass}>Use a short value like `6 LPA` or `8 LPA`.</p>
              <Textarea
                placeholder="e.g. TCS, Infosys, Wipro, Google"
                value={formData.hiringPartners}
                onChange={(event) => {
                  setFormData((previous) => ({ ...previous, hiringPartners: event.target.value }));
                  setFormErrors((previous) => ({ ...previous, hiringPartners: undefined }));
                }}
              />
              <p className={helperTextClass}>Comma-separated list of company names.</p>
              {formErrors.hiringPartners ? (
                <p className={errorTextClass}>{formErrors.hiringPartners}</p>
              ) : null}
            </div>

            <div className="mt-6">
              <Button disabled={loading} className={buttonPrimaryClass}>
                <Plus size={16} className="mr-2" />
                {loading ? "Saving..." : "Publish Course"}
              </Button>
            </div>
            {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}
          </form>
        </div>

        <div className="lg:col-span-2">
          {fetching ? (
            <p>Loading courses...</p>
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredCourses.map((course) => (
                <div key={course._id} className="group rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-200/50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 rounded-xl bg-gray-100">
                        {course.thumbnail ? (
                          <Image src={course.thumbnail} alt={course.title} fill sizes="64px" className="object-cover" />
                        ) : null}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500">{course.category}</p>
                        <h3 className="text-base font-bold text-gray-900">{course.title}</h3>
                        <p className="text-xs text-gray-500">
                          {course.duration} &middot; {course.level}
                        </p>
                      </div>
                    </div>
                    <Button
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

"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Book,
  BookOpenCheck,
  Briefcase,
  Clock,
  Filter,
  Rocket,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COURSE_CATEGORIES, COURSE_CATEGORY_LABELS, type CourseCategory } from "@/lib/course-categories";
import { Button } from "@/components/ui/button";
import Carousel, { type CarouselItem } from "@/components/ui/Carousel";
import MagicBento from "@/components/ui/MagicBento";
import { Spotlight } from "@/components/ui/spotlight";
import TextPressure from "@/components/ui/TextPressure";
import ProfileCard from "@/components/ProfileCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Course {
  _id: string;
  title: string;
  slug: string;
  category: CourseCategory;
  description: string;
  duration: string;
  image?: string;
}

type SortOption = "featured" | "title-asc" | "duration-short" | "duration-long";

const HERO_CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 1,
    title: "Live Projects",
    description: "Build portfolio-ready projects guided by mentors from industry.",
    icon: <Briefcase className="h-4 w-4 text-white" />,
  },
  {
    id: 2,
    title: "Career Coaching",
    description: "Resume reviews, interview drills, and role-specific job prep.",
    icon: <TrendingUp className="h-4 w-4 text-white" />,
  },
  {
    id: 3,
    title: "Small Batches",
    description: "Doubt clearing and personalized feedback through every sprint.",
    icon: <Users className="h-4 w-4 text-white" />,
  },
  {
    id: 4,
    title: "Certification",
    description: "Earn completion certificates and placement-ready proof of skills.",
    icon: <BookOpenCheck className="h-4 w-4 text-white" />,
  },
];

const BENTO_ITEMS = [
  {
    title: "Hands-on Weekly Labs",
    description: "Every module includes practical implementation and code review checkpoints.",
    icon: <Book className="h-6 w-6" />,
    highlight: "Project-first learning",
  },
  {
    title: "Mentor-Led Sessions",
    description: "Solve doubts live with experienced trainers and structured office hours.",
    icon: <Users className="h-6 w-6" />,
    highlight: "Fast doubt resolution",
  },
  {
    title: "Placement Preparation",
    description: "Mock interviews, aptitude tracks, and hiring partner connect sessions.",
    icon: <Rocket className="h-6 w-6" />,
    highlight: "Interview-ready support",
  },
  {
    title: "Progress Tracking",
    description: "Track assignments, attendance, and milestones with weekly feedback loops.",
    icon: <TrendingUp className="h-6 w-6" />,
    highlight: "Measurable growth",
  },
];

const parseDurationToMonths = (value: string) => {
  const normalized = value.toLowerCase();
  const match = normalized.match(/(\d+(\.\d+)?)/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  const amount = Number(match[1]);
  if (Number.isNaN(amount)) return Number.MAX_SAFE_INTEGER;
  if (normalized.includes("week")) {
    return amount / 4;
  }
  return amount;
};

const CourseBenefits = () => (
  <section className="mt-20 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
    <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
        Learning That Converts To Career Outcomes
      </h2>
      <p className="mt-3 max-w-2xl text-stone-600">
        Structured curriculum, mentor accountability, and placement-focused execution from week one.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border-stone-200 bg-stone-50 shadow-none">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="rounded-xl bg-emerald-100 p-2.5">
              <Briefcase className="h-5 w-5 text-emerald-700" />
            </div>
            <CardTitle className="text-sm font-semibold text-stone-900">Industry-Relevant</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-stone-600">Curriculum aligned to hiring demand and current stacks.</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-stone-200 bg-stone-50 shadow-none">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="rounded-xl bg-emerald-100 p-2.5">
              <Users className="h-5 w-5 text-emerald-700" />
            </div>
            <CardTitle className="text-sm font-semibold text-stone-900">Expert Instructors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-stone-600">Learn from mentors who have shipped real products.</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-stone-200 bg-stone-50 shadow-none">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="rounded-xl bg-emerald-100 p-2.5">
              <Rocket className="h-5 w-5 text-emerald-700" />
            </div>
            <CardTitle className="text-sm font-semibold text-stone-900">Placement Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-stone-600">Interview prep with dedicated support until selection.</p>
          </CardContent>
        </Card>
      </div>
    </div>
    <div className="flex items-center justify-center rounded-3xl border border-stone-200 bg-stone-900 p-6 shadow-sm">
      <Carousel
        items={HERO_CAROUSEL_ITEMS}
        baseWidth={330}
        autoplay
        autoplayDelay={2400}
        pauseOnHover
        loop
      />
    </div>
  </section>
);

const CTA = () => (
  <section className="mt-20 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-stone-50 p-8 sm:p-12">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">
        Ready To Start Your Tech Journey?
      </h2>
      <p className="mt-4 text-base text-stone-600 sm:text-lg">
        Choose your course, join a mentor-led batch, and move from learning to placement with guided execution.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg" className="rounded-xl bg-emerald-600 px-8 hover:bg-emerald-700">
          <Link href="/contact">Book a Counseling Call</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-xl border-stone-300 px-8">
          <Link href="/placements">View Placement Stories</Link>
        </Button>
      </div>
    </div>
  </section>
);

const MentorSection = () => (
  <section className="mt-20 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div className="mx-auto w-full max-w-sm">
        <ProfileCard
          name="Preeti Karla"
          title="Founder & Lead Mentor"
          role="Placement Strategy Lead"
          description="Guiding learners from fundamentals to interview success."
          handle="preetikarla"
          status="Mentor Available"
          contactText="Talk to Mentor"
          avatarUrl="https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=900&q=80"
          miniAvatarUrl="https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=300&q=80"
          iconUrl="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80"
          grainUrl="https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?auto=format&fit=crop&w=600&q=80"
        />
      </div>
      <div>
        <Badge className="rounded-full bg-emerald-100 text-emerald-800">Mentor-Led Growth</Badge>
        <h3 className="mt-4 text-2xl font-bold text-stone-900 sm:text-3xl">
          Learn With Accountability, Not Just Content
        </h3>
        <p className="mt-4 text-stone-600">
          You get structured learning plans, weekly feedback, and interview calibration so your preparation is consistent.
          This is designed for beginners and working professionals who need clear execution.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-semibold text-stone-900">Weekly Portfolio Reviews</p>
            <p className="mt-1 text-sm text-stone-600">Ship projects that are hiring-manager ready.</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-semibold text-stone-900">Mock Interview Loops</p>
            <p className="mt-1 text-sm text-stone-600">Practice technical and HR rounds before real interviews.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/courses");
        const data = (await res.json()) as Course[];
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredAndSortedCourses = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = !search
      ? courses
      : courses.filter((course) => {
          return (
            course.title.toLowerCase().includes(search) ||
            course.description.toLowerCase().includes(search) ||
            course.category.toLowerCase().includes(search)
          );
        });

    const sorted = [...filtered];
    if (sortOption === "title-asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortOption === "duration-short") {
      sorted.sort((a, b) => parseDurationToMonths(a.duration) - parseDurationToMonths(b.duration));
    }
    if (sortOption === "duration-long") {
      sorted.sort((a, b) => parseDurationToMonths(b.duration) - parseDurationToMonths(a.duration));
    }

    return sorted;
  }, [courses, query, sortOption]);

  const coursesByCategory = useMemo(() => {
    return COURSE_CATEGORIES.reduce<Record<CourseCategory, Course[]>>((acc, category) => {
      acc[category] = filteredAndSortedCourses.filter((course) => course.category === category);
      return acc;
    }, {} as Record<CourseCategory, Course[]>);
  }, [filteredAndSortedCourses]);

  return (
    <div className="min-h-screen bg-stone-100 pb-24 pt-28">
      <div className="container mx-auto max-w-7xl px-4">
        <header className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white px-5 py-10 shadow-sm sm:px-8 sm:py-14">
          <Spotlight
            className="left-1/2 top-0 -translate-x-1/2 translate-y-[-15%] text-emerald-400"
            fill="#10b981"
          />
          <div className="relative z-10">
            <Badge className="rounded-full bg-emerald-100 text-emerald-800">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Career-Focused Tracks
            </Badge>
            <div className="mt-4 h-20 w-full max-w-xl">
              <TextPressure
                text="COURSES"
                textColor="#14532d"
                stroke={false}
                flex={false}
                minFontSize={36}
                className="font-black tracking-wide"
              />
            </div>
            <p className="mt-4 max-w-2xl text-base text-stone-600 sm:text-lg">
              Explore practical programs across development, cloud, and core programming with hands-on projects and placement support.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search course, tech stack, or category..."
                  className="h-12 w-full rounded-full border-stone-300 bg-stone-50 pl-12 pr-4 text-base"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-12 rounded-full border-stone-300 bg-white px-5">
                    <Filter className="mr-2 h-4 w-4" />
                    Sort Courses
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl border-stone-200">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                    <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="title-asc">Title A-Z</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="duration-short">Duration: Short to Long</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="duration-long">Duration: Long to Short</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <CourseBenefits />

        <section className="mt-20">
          <div className="mb-8 flex flex-col gap-3 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-stone-900">Program Advantages</h2>
            <p className="max-w-2xl text-stone-600">
              Every batch is structured to balance theory, implementation, and interview readiness.
            </p>
          </div>
          <MagicBento
            items={BENTO_ITEMS}
            enableSpotlight
            enableBorderGlow
            enableStars
            glowColor="16, 185, 129"
            spotlightRadius={260}
            particleCount={8}
            clickEffect={false}
            enableTilt={false}
            enableMagnetism={false}
          />
        </section>

        <main className="mt-20">
          <Tabs defaultValue="all" className="w-full">
            <div className="mb-8 flex justify-center">
              <TabsList className="flex h-auto min-w-max flex-wrap gap-2 rounded-full border border-stone-200 bg-white p-2">
                <TabsTrigger
                  value="all"
                  className="rounded-full px-4 py-2 text-sm font-semibold data-active:bg-emerald-600 data-active:text-white"
                >
                  All
                  <span className="ml-2 rounded-full bg-stone-100 px-2 py-0.5 text-xs font-bold text-stone-600">
                    {filteredAndSortedCourses.length}
                  </span>
                </TabsTrigger>
                {COURSE_CATEGORIES.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-full px-4 py-2 text-sm font-semibold data-active:bg-emerald-600 data-active:text-white"
                  >
                    {COURSE_CATEGORY_LABELS[category]}
                    <span className="ml-2 rounded-full bg-stone-100 px-2 py-0.5 text-xs font-bold text-stone-600">
                      {coursesByCategory[category].length}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all">
              <CourseGrid loading={loading} courses={filteredAndSortedCourses} />
            </TabsContent>

            {COURSE_CATEGORIES.map((category) => (
              <TabsContent key={category} value={category}>
                <CourseGrid loading={loading} courses={coursesByCategory[category]} />
              </TabsContent>
            ))}
          </Tabs>
        </main>

        <MentorSection />
        <CTA />
      </div>
    </div>
  );
}

function CourseGrid({ loading, courses }: { loading: boolean; courses: Course[] }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-96 animate-pulse rounded-3xl bg-stone-200/70" />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-stone-300 bg-white py-24 text-center">
        <Book size={48} className="text-stone-400" />
        <h3 className="mt-6 text-xl font-semibold text-stone-900">No Courses Found</h3>
        <p className="mt-2 text-base text-stone-600">Try adjusting your search or filter options.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Link key={course._id} href={`/courses/${course.slug}`} className="group">
          <Card className="h-full overflow-hidden rounded-3xl border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
            <div className="relative h-48 w-full">
              {course.image ? (
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-stone-100">
                  <Book className="text-stone-300" size={48} />
                </div>
              )}
            </div>

            <CardHeader>
              <Badge className="w-fit rounded-full bg-emerald-100 text-emerald-800">
                {COURSE_CATEGORY_LABELS[course.category]}
              </Badge>
              <CardTitle className="mt-2 text-xl font-bold text-stone-900">{course.title}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
              <p className="line-clamp-3 text-sm text-stone-600">{course.description}</p>
              <div className="mt-6 flex flex-grow items-end justify-between">
                <span className="flex items-center gap-2 text-sm font-medium text-stone-500">
                  <Clock size={16} />
                  {course.duration || "3 Months"}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <ArrowRight size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

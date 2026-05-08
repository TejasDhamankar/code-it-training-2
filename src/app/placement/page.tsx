"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  Handshake,
  Search,
  Target,
  User,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Placement {
  _id: string;
  studentName: string;
  course: string;
  company: string;
  role: string;
  packageOffered?: string;
  year: number;
  image?: string;
}

const placementSupportItems = [
  "Campus Placement Drives",
  "Bulk Hiring Support",
  "Industry Hiring Connections",
  "Resume Screening",
  "Interview Coordination",
  "Corporate Recruitment Assistance",
  "Career Guidance Sessions",
];

const placementColleges = [
  "Anantrao Thopte College",
  "Krishna Institute of Pharmacy",
];

export default function PlacementPage() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");

  useEffect(() => {
    const fetchPlacements = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/placements");
        const data = (await res.json()) as Placement[];
        setPlacements(Array.isArray(data) ? data.sort((a, b) => b.year - a.year) : []);
      } catch (error) {
        console.error(error);
        setPlacements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, []);

  const years = useMemo(() => {
    return ["All", ...Array.from(new Set(placements.map((item) => String(item.year))))];
  }, [placements]);

  const filteredPlacements = useMemo(() => {
    const search = query.trim().toLowerCase();
    return placements.filter((item) => {
      const yearMatch = selectedYear === "All" || String(item.year) === selectedYear;
      const queryMatch =
        !search ||
        item.studentName.toLowerCase().includes(search) ||
        item.company.toLowerCase().includes(search) ||
        item.role.toLowerCase().includes(search);
      return yearMatch && queryMatch;
    });
  }, [placements, query, selectedYear]);

  const topCompanies = useMemo(() => {
    const companyCounts = placements.reduce<Record<string, number>>((acc, item) => {
      acc[item.company] = (acc[item.company] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(companyCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([company]) => company);
  }, [placements]);

  return (
    <main className="min-h-screen bg-stone-50 pt-28 pb-20 text-stone-900">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-white via-stone-50 to-emerald-50 p-8 shadow-sm sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700">
            <Building2 className="h-4 w-4" />
            Placement Drives Conducted by CODEIT
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Connecting students, colleges, and hiring opportunities across Maharashtra and PAN India.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            CODEIT Software Training Institute actively conducts placement drives and
            recruitment support programs for colleges and educational institutions across
            Maharashtra, helping students connect with leading companies in IT, Non-IT,
            Banking, Pharma, Manufacturing, and other sectors.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Partner With CODEIT
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:careers.codeit@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              careers.codeit@gmail.com
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-700">
                Placement Support
              </p>
              <p className="mt-2 text-lg font-semibold text-stone-900">
                Campus drives, hiring coordination, screening, and recruitment assistance
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-700">
                Mission
              </p>
              <p className="mt-2 text-lg font-semibold text-stone-900">
                Connecting talent with opportunity through strong industry-academia partnerships
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
          <div className="relative h-full min-h-[420px]">
            <Image
              src="/Images/office2.png"
              alt="CODEIT placement drive and recruitment support"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-10">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-200">
                Our Commitment
              </p>
              <p className="mt-3 max-w-xl text-2xl font-semibold leading-tight">
                Connecting Talent With Opportunity Across PAN India.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-700">
              Our Placement Support Includes
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
              Recruitment support designed for colleges, institutes, and student career growth
            </h2>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {placementSupportItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-4 text-sm font-semibold text-stone-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-gradient-to-br from-stone-900 to-stone-800 p-6 text-white shadow-sm sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-200">
              Placement Drives Successfully Conducted At
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Proudly supporting reputed institutions and their students
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-300">
              We are proud to have organized and supported placement drives for
              students from reputed institutions.
            </p>

            <div className="mt-8 space-y-3">
              {placementColleges.map((college) => (
                <div
                  key={college}
                  className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-stone-100"
                >
                  {college}
                </div>
              ))}
              <div className="rounded-[1.25rem] border border-emerald-300/30 bg-emerald-400/10 px-4 py-4 text-sm font-medium text-emerald-100">
                ...and many more educational institutions.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-stone-900">Our Mission</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              We provide students with better career opportunities by connecting academic institutions with industry recruitment requirements.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Handshake className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-stone-900">Partnerships</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              We focus on creating strong industry-academia partnerships that support student growth and employment opportunities.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-stone-900">Student Outcomes</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              From resume screening to interview coordination, we help students move closer to real opportunities with better preparation.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-700">
                Student Placements
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
                Celebrating student success across companies and roles
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
                Browse recent placement records from CODEIT students and filter by company,
                role, or year.
              </p>
            </div>

            {topCompanies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {topCompanies.map((company) => (
                  <span
                    key={company}
                    className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-semibold text-stone-700"
                  >
                    {company}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-[1fr_200px]">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                size={20}
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by student, company, or role..."
                className="h-12 w-full rounded-full border-stone-200 bg-stone-50 pl-12 pr-4 text-base"
              />
            </div>
            <select
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              className="h-12 w-full rounded-full border border-stone-200 bg-stone-50 px-4 text-base text-stone-700"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year === "All" ? "All Years" : year}
                </option>
              ))}
            </select>
          </div>

          <div>
            {loading ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="h-64 animate-pulse rounded-[1.75rem] bg-stone-100" />
                ))}
              </div>
            ) : filteredPlacements.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed border-stone-200 bg-stone-50 py-24 text-center">
                <Briefcase size={48} className="text-stone-400" />
                <h3 className="mt-6 text-xl font-semibold text-stone-900">No Placements Found</h3>
                <p className="mt-2 text-base text-stone-600">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPlacements.map((placement) => (
                  <div
                    key={placement._id}
                    className="transform rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="relative h-24 w-24 overflow-hidden rounded-full">
                        {placement.image ? (
                          <Image
                            src={placement.image}
                            alt={placement.studentName}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-stone-200">
                            <User className="text-stone-400" size={48} />
                          </div>
                        )}
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-stone-900">{placement.studentName}</h3>
                      <p className="mt-1 text-sm text-stone-500">{placement.course}</p>
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-lg font-semibold text-stone-800">{placement.role}</p>
                      <p className="text-base text-stone-600">
                        at <span className="font-bold">{placement.company}</span>
                      </p>
                      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                        {placement.packageOffered && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                            <Award size={14} />
                            {placement.packageOffered}
                          </span>
                        )}
                        <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-stone-700">
                          {placement.year}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

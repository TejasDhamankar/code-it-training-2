"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Award, Briefcase, Search, User } from "lucide-react";
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
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto max-w-7xl px-4">
        <header className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Student Placements
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Celebrating the success of our students in the tech industry.
          </p>
        </header>

        <div className="mt-8">
          <div className="flex flex-wrap justify-center gap-2">
            {topCompanies.map((company) => (
              <span key={company} className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                {company}
              </span>
            ))}
          </div>
        </div>

        <div className="my-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-[1fr_200px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by student, company, or role..."
              className="h-12 w-full rounded-full border-gray-200 bg-gray-50 pl-12 pr-4 text-base"
            />
          </div>
          <select
            value={selectedYear}
            onChange={(event) => setSelectedYear(event.target.value)}
            className="h-12 w-full rounded-full border border-gray-200 bg-gray-50 px-4 text-base"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year === "All" ? "All Years" : year}
              </option>
            ))}
          </select>
        </div>

        <main>
          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-64 animate-pulse rounded-2xl bg-gray-100" />
              ))}
            </div>
          ) : filteredPlacements.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-24 text-center">
              <Briefcase size={48} className="text-gray-400" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">No Placements Found</h3>
              <p className="mt-2 text-base text-gray-600">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPlacements.map((placement) => (
                <div key={placement._id} className="transform rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
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
                        <div className="flex h-full items-center justify-center bg-gray-100">
                          <User className="text-gray-400" size={48} />
                        </div>
                      )}
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-gray-900">{placement.studentName}</h3>
                    <p className="mt-1 text-sm text-gray-500">{placement.course}</p>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-lg font-semibold text-gray-800">{placement.role}</p>
                    <p className="text-base text-gray-600">at <span className="font-bold">{placement.company}</span></p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                      {placement.packageOffered && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                          <Award size={14} />
                          {placement.packageOffered}
                        </span>
                      )}
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                        {placement.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

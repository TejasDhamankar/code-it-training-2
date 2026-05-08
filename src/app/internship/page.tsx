"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  FileText,
  GraduationCap,
  Handshake,
  Sparkles,
  Users,
} from "lucide-react";

const internshipHighlights = [
  {
    title: "Live Project Training",
    description: "Work on practical assignments and real implementation flows instead of only theory sessions.",
    icon: Briefcase,
  },
  {
    title: "Industry Expert Guidance",
    description: "Learn with mentors who understand current tools, expectations, and workplace standards.",
    icon: Users,
  },
  {
    title: "Practical Learning Approach",
    description: "Build confidence through hands-on learning, project reviews, and problem-solving practice.",
    icon: Sparkles,
  },
  {
    title: "Resume & Interview Preparation",
    description: "Get support with presentation, interview readiness, and professional career preparation.",
    icon: FileText,
  },
  {
    title: "Internship Completion Certificate",
    description: "Receive a completion certificate that reflects your training and project participation.",
    icon: Award,
  },
  {
    title: "Placement Assistance Support",
    description: "Move from training to job readiness with guidance aligned to hiring expectations.",
    icon: Handshake,
  },
];

const internshipDomains = [
  "Python Development",
  "Full Stack Development",
  "Java Development",
  "Web Designing",
  "Software Testing",
  "Data Analytics",
  "Digital Marketing",
  "UI/UX Designing",
  "HR & Recruitment",
];

const associatedColleges = [
  "Annasaheb Magar Mahavidyalaya",
  "JSPM's Rajarshi Shahu College of Engineering",
  "PDEA's Prof. Ramkrishna More Arts, Commerce & Science College",
];

export default function InternshipPage() {
  return (
    <main className="min-h-screen bg-stone-50 pt-28 pb-20 text-stone-900">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-white via-stone-50 to-emerald-50 p-8 shadow-sm sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700">
            <GraduationCap className="h-4 w-4" />
            Internship Program at CODEIT Software Training Institute
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Practical internship programs built to bridge academics and industry.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            At CODEIT Software Training Institute, we provide industry-oriented internship
            programs that help students gain practical knowledge, live project experience,
            and corporate exposure through hands-on learning and real-time implementation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Contact Us Today
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
                Focus
              </p>
              <p className="mt-2 text-lg font-semibold text-stone-900">
                Industry-ready skills with real implementation experience
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-700">
                Environment
              </p>
              <p className="mt-2 text-lg font-semibold text-stone-900">
                Corporate working exposure guided by experienced trainers
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
          <div className="relative h-full min-h-[420px]">
            <Image
              src="/Images/office.png"
              alt="CODEIT internship training environment"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-10">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-200">
                Why Choose CODEIT Internship?
              </p>
              <p className="mt-3 max-w-xl text-2xl font-semibold leading-tight">
                Learn by doing with live projects, mentorship, interview prep, and placement assistance support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-700">
              Why Students Choose Us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
              Training that supports confidence, execution, and career readiness
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {internshipHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-stone-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p>
                </div>
              );
            })}

            <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-700">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-stone-900">Corporate Working Environment</h3>
              <p className="mt-2 text-sm leading-6 text-stone-700">
                Experience a structured internship journey designed to reflect real workplace expectations and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-700">
              Internship Domains
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
              Programs aligned with practical technology and business skill development
            </h2>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {internshipDomains.map((domain) => (
                <div
                  key={domain}
                  className="rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-4 text-sm font-semibold text-stone-700"
                >
                  {domain}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-gradient-to-br from-stone-900 to-stone-800 p-6 text-white shadow-sm sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-200">
              Successfully Completed At
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Internship programs delivered for students from reputed colleges
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-300">
              We are proud to have successfully conducted internship programs for
              students from reputed colleges across Maharashtra.
            </p>

            <div className="mt-8 space-y-3">
              {associatedColleges.map((college) => (
                <div
                  key={college}
                  className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-stone-100"
                >
                  {college}
                </div>
              ))}
              <div className="rounded-[1.25rem] border border-emerald-300/30 bg-emerald-400/10 px-4 py-4 text-sm font-medium text-emerald-100">
                ...and many more colleges across Maharashtra.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-emerald-200 bg-gradient-to-r from-emerald-600 to-emerald-500 p-8 text-white shadow-sm sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-100">
            Join Our Internship Program
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Enhance your skills with practical training and real industry exposure at CODEIT.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-emerald-50">
            Students looking to strengthen practical knowledge, build project confidence,
            and prepare for interviews can connect with our team to get started.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Contact Us Today
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:careers.codeit@gmail.com"
              className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              careers.codeit@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

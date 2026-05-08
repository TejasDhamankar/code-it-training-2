"use client";

import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";
import TextPressure from "./ui/TextPressure";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-white group">
            <Spotlight
                className="-bottom-40 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-50 transition-opacity duration-700"
                fill="#10B981"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-16 lg:px-8">
                <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                        CODE IT
                    </h3>

                    <nav className="flex flex-wrap gap-6 text-sm font-medium text-gray-700 md:text-base">
                        <Link href="/courses" className="transition-colors hover:text-emerald-600">
                            Courses
                        </Link>
                        <Link href="/internship" className="transition-colors hover:text-emerald-600">
                            Internship
                        </Link>
                        <Link href="/placement" className="transition-colors hover:text-emerald-600">
                            Placements
                        </Link>
                        <Link href="/about" className="transition-colors hover:text-emerald-600">
                            About Us
                        </Link>
                        <Link href="/contact" className="transition-colors hover:text-emerald-600">
                            Contact
                        </Link>
                    </nav>
                </div>

                <Separator className="mb-16" />

                <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div>
                        <p className="max-w-md text-sm leading-relaxed text-gray-600 md:text-base">
                            CODE IT is an industry-focused IT software training institute
                            offering practical learning, live projects, and placement support
                            to help students build real-world skills.
                        </p>
                        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                            Connecting Talent With Opportunity Across PAN India.
                        </p>
                    </div>

                    <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 text-emerald-600" />
                            Pune, Maharashtra
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-emerald-600" />
                            +91 7231925496
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-emerald-600" />
                            careers.codeit@gmail.com
                        </div>
                    </div>
                </div>

                <Separator className="mb-8" />

                <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
                    <p>&copy; {new Date().getFullYear()} CODE IT. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/contact" className="hover:text-gray-900">
                            Privacy Policy
                        </Link>
                        <Link href="/contact" className="hover:text-gray-900">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>

                <div className="relative mt-16 flex h-[150px] w-full items-center justify-center md:h-[200px]">
                    <TextPressure
                        text="CODE IT"
                        flex
                        alpha={false}
                        stroke={false}
                        width
                        weight
                        italic
                        textColor="#111827"
                        strokeColor="#10B981"
                        minFontSize={48}
                    />
                </div>
            </div>
        </footer>
    );
}

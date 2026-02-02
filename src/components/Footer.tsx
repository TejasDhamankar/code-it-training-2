"use client";

import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";
import TextPressure from "./ui/TextPressure";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-white group">
            {/* Emerald Spotlight */}
            <Spotlight
                className="-bottom-40 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-50 transition-opacity duration-700"
                fill="#10B981" // emerald-500
            />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16">

                {/* Footer Navbar (bigger, hero-like) */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                        CODE IT
                    </h3>

                    <nav className="flex flex-wrap gap-6 text-sm md:text-base font-medium text-gray-700">
                        <Link href="#" className="hover:text-emerald-600 transition-colors">
                            Courses
                        </Link>
                        <Link href="#" className="hover:text-emerald-600 transition-colors">
                            Vision
                        </Link>
                        <Link href="#" className="hover:text-emerald-600 transition-colors">
                            Placements
                        </Link>
                        <Link href="#" className="hover:text-emerald-600 transition-colors">
                            FAQ
                        </Link>
                        <Link href="#" className="hover:text-emerald-600 transition-colors">
                            Contact
                        </Link>
                    </nav>
                </div>

                <Separator className="mb-16" />

                {/* Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

                    {/* About */}
                    <div>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md">
                            CODE IT is an industry-focused IT software training institute
                            offering practical learning, live projects, and placement support
                            to help students build real-world skills.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5 text-emerald-600" />
                            Pune, Maharashtra
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-emerald-600" />
                            +91 XXXXX XXXXX
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-emerald-600" />
                            info@codeitinstitute.com
                        </div>
                    </div>

                </div>

                <Separator className="mb-8" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} CODE IT. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-gray-900">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-gray-900">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>

                <div className="relative h-[150px] md:h-[200px] flex items-center justify-center w-full mt-16">
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

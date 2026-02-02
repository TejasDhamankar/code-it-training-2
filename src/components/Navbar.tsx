"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface NavItem {
  label: string;
  baseHref: string;
  bgColor: string;
  textColor: string;
  links: { label: string; href: string }[];
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  // Scroll effect: Adds background blur and border on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onMouseEnter = (index: number) => {
    gsap.to(`.nav-card-${index}`, {
      display: "block",
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onMouseLeave = (index: number) => {
    gsap.to(`.nav-card-${index}`, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(`.nav-card-${index}`, { display: "none" });
      },
    });
  };

  const navItems: NavItem[] = [
    {
      label: "Courses",
      baseHref: "/courses",
      bgColor: "oklch(0.147 0.004 49.25)", // Stone
      textColor: "white",
      links: [
        { label: "Full Stack Development", href: "/courses#fullstack" },
        { label: "Data Science", href: "/courses#datascience" },
        { label: "UI/UX Design", href: "/courses#design" },
      ],
    },
    {
      label: "Placement",
      baseHref: "/placement",
      bgColor: "oklch(0.216 0.006 56.043)", // Darker Stone
      textColor: "white",
      links: [
        { label: "Our Partners", href: "/placement#partners" },
        { label: "Student Stories", href: "/placement#stories" },
        { label: "Stats", href: "/placement#stats" },
      ],
    },
    {
      label: "About Us",
      baseHref: "/about",
      bgColor: "oklch(0.60 0.13 163)", // Emerald
      textColor: "white",
      links: [
        { label: "Our Journy", href: "/about#story" },
        { label: "Why choose Us", href: "/about#why" },
      ],
    },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-border py-3"
          : "bg-transparent border-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-foreground">
            CODE<span className="text-primary">IT</span>
          </span>
          <div className="w-10 h-10 relative">
            <Image
              src="/Images/logo.png"
              alt="logo"
              fill
              sizes="2.5rem"
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <div
              key={item.label}
              className="relative py-2"
              onMouseEnter={() => onMouseEnter(idx)}
              onMouseLeave={() => onMouseLeave(idx)}
            >
              <Link href={item.baseHref} className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                {item.label}
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Link>

              {/* The "Magazine" Style Dropdown Card */}
              <div
                className={`nav-card-${idx} absolute top-full left-0 w-64 hidden opacity-0 pt-4`}
              >
                <div 
                  className="p-5 rounded-xl shadow-2xl border border-white/10 "
                  style={{ backgroundColor: item.bgColor }}
                >
                   <ul className="space-y-3">
                    {item.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm font-medium opacity-80 hover:opacity-100 hover:translate-x-1 transition-all inline-block"
                          style={{ color: item.textColor }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <Link href="/contact" className="text-sm font-medium hover:text-primary">
            Contact Us
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/admin/login">
          <Button variant="ghost" className="hidden sm:inline-flex text-sm">
            Login
          </Button>
          </Link>
          
          <Link href="/contact" className="text-sm font-medium hover:text-primary">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
            Get Started
          </Button>
          </Link>
          <Menu className="w-6 h-6 md:hidden" />
        </div>
      </div>
    </header>
  );
}
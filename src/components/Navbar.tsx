"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface NavItem {
  label: string;
  baseHref: string;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect: Adds background blur and border on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    {
      label: "Courses",
      baseHref: "/courses",
    },
    {
      label: "Placement",
      baseHref: "/placement",
    },
    {
      label: "About Us",
      baseHref: "/about",
    },
  ];

  return (
    <header
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
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.baseHref}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="text-sm font-medium hover:text-primary">
            Contact Us
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login">
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
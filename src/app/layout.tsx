import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code IT Software Training Institute | Job-Oriented IT Courses & Placement",
  description:
    "Code IT Software Training Institute offers industry-focused IT courses with live projects, expert trainers, and placement support. Build a job-ready IT career today.",
  keywords: [
    "Code IT Software Training",
    "IT training institute",
    "software training institute",
    "job oriented IT courses",
    "live project training",
    "placement oriented courses",
    "software training in India"
  ],
  openGraph: {
    title: "Code IT Software Training Institute",
    description:
      "Industry-focused IT training with live projects and placement support.",
    url: "https://www.codeitsoftwaretraining.org/",
    siteName: "Code IT Software Training",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code IT Software Training Institute",
    description:
      "Job-oriented IT courses with real-world projects and placement support.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}

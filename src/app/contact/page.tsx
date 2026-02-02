"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <main className="py-16 md:py-24 bg-white overflow-hidden font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            CONTACT US
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Stay Connected with Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reach out for inquiries, support, or collaboration—we'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name here..."
                  className="h-12 bg-white border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your Email here..."
                  className="h-12 bg-white border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-gray-900 placeholder:text-gray-400"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900">
                  Budget
                </label>
                <Input
                  id="subject"
                  placeholder="Enter the amount"
                  className="h-12 bg-white border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  className="min-h-[120px] bg-white border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-gray-900 placeholder:text-gray-400 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Services
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm text-gray-700">Full-Stack</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm text-gray-700">Data Analyst</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm text-gray-700">AI/ML</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm text-gray-700">Placement</span>
                  </label>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full h-12 text-base font-semibold bg-black hover:bg-gray-800 text-white rounded-lg transition-all"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* RIGHT COLUMN: Image with overlay */}
          <div className="relative h-full w-full flex items-start justify-center lg:justify-end">
            <div className="relative w-full max-w-[550px] rounded-2xl overflow-hidden">
              <Image
                src="/Images/image-13.webp" 
                alt="Modern office workspace"
                width={550}
                height={650}
                className="w-full h-auto object-cover"
                priority
              />
              
              {/* Overlay badge at bottom right */}
              <div className="absolute bottom-6 right-35 bg-white rounded-xl px-5 py-3 shadow-lg flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white"></div>
                  <div className="w-7 h-7 rounded-full bg-gray-400 border-2 border-white"></div>
                  <div className="w-7 h-7 rounded-full bg-gray-500 border-2 border-white"></div>
                  <div className="w-7 h-7 rounded-full bg-gray-600 border-2 border-white"></div>
                  <div className="w-7 h-7 rounded-full bg-gray-700 border-2 border-white"></div>
                  <div className="w-7 h-7 rounded-full bg-gray-800 border-2 border-white"></div>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-gray-900">20+</div>
                  <div className="text-xs text-gray-500">Daily New Enquiry</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
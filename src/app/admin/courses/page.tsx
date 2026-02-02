"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Using your custom Textarea
import { Trash2, Plus, Image as ImageIcon, Clock } from "lucide-react";

export default function AdminCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "CORE Programming",
    description: "",
    duration: "3 Months", // Default duration
    image: "/Images/default-course.webp" // Default image path
  });

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      if (!res.ok) {
        // Don't show an alert for fetch errors, just log them.
        console.error("Failed to fetch courses. Your database might be disconnected. Please check your MONGODB_URI environment variable.");
        setCourses([]); // Clear existing courses on error
        return;
      }
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) { 
      console.error("Fetch error:", err); 
      setCourses([]);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = formData.image;

    // 1. If an image is selected, upload it first
    if (imageFile) {
      const imageFormData = new FormData();
      imageFormData.append("file", imageFile);

      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        });

        if (!uploadRes.ok) {
          alert("Failed to upload image.");
          setLoading(false);
          return;
        }
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.path; // Get the path from the upload API
      } catch (error) {
        console.error("Image upload error:", error);
        alert("An error occurred during image upload.");
        setLoading(false);
        return;
      }
    }

    // 2. Now, submit the course data with the correct image URL
    const finalFormData = { ...formData, image: imageUrl };

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer your_super_secret_emerald_stone_key_2026" 
      },
      body: JSON.stringify(finalFormData),
    });

    if (res.ok) {
      setFormData({ title: "", slug: "", category: "CORE Programming", description: "", duration: "3 Months", image: "/Images/default-course.webp" });
      setImageFile(null); // Clear the selected file
      fetchCourses();
    } else {
      alert("Failed to add course. Please ensure your database is connected.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/courses/${id}`, {
      method: "DELETE",
      headers: { "Authorization": "Bearer your_super_secret_emerald_stone_key_2026" }
    });
    fetchCourses();
  };

  return (
    <main className="container mx-auto px-6 py-24 max-w-5xl font-sans">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-900 p-4 mb-8 rounded-md shadow-lg">
        <p className="font-bold text-lg">Database Connection Error</p>
        <p className="mt-2">The application cannot connect to the database, which is preventing course data from being loaded or saved. The error <strong>ECONNREFUSED</strong> strongly suggests a network or firewall issue.</p>
        <p className="font-bold mt-4">Primary Action:</p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Go to your <a href="https://cloud.mongodb.com/" target="_blank" rel="noopener noreferrer" className="underline font-medium">MongoDB Atlas Dashboard</a>.</li>
          <li>Navigate to <strong>Network Access</strong> in the left-hand menu.</li>
          <li>Ensure your current IP address is on the IP Access List. If you're unsure, add your current IP by clicking "Add IP Address".</li>
        </ol>
        <p className="mt-3">Also, double-check that your <code>.env.local</code> file contains the correct <strong>MONGODB_URI</strong>.</p>
      </div>

      <div className="bg-sky-100 border-l-4 border-sky-500 text-sky-900 p-4 mb-8 rounded-md shadow-lg">
        <p className="font-bold text-lg">Note on Build Errors</p>
        <p className="mt-2">If you see a "Parsing ecmascript source code failed" error related to <code>[cite_start]</code> even after the code has been fixed, your development server might be using a cached, outdated version of the file. <strong>Please try restarting your development server</strong> to clear the cache and resolve the issue.</p>
      </div>

      <h1 className="text-3xl font-bold mb-8">Course Management</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border border-stone-200 mb-12 shadow-xl shadow-stone-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-bold">Course Title</label>
            <Input 
              placeholder="e.g. Java Full Stack" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Category</label>
            <select 
              className="flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 text-sm"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option>CORE Programming</option>
              <option>Advanced IT Technologies</option>
              <option>Trending & Future-Ready Technologies</option>
              <option>Specialized Training Programs</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold flex items-center gap-2"><Clock size={16}/> Duration</label>
            <Input 
              placeholder="e.g. 3 Months" 
              value={formData.duration} 
              onChange={(e) => setFormData({...formData, duration: e.target.value})} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold flex items-center gap-2"><ImageIcon size={16}/> Course Image</label>
            <Input 
              type="file"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <label className="text-sm font-bold">Course Description</label>
          <Textarea 
            placeholder="Describe the course outcomes..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: (e.target as HTMLTextAreaElement).value})}
            required
          />
        </div>

        <Button disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 w-full h-12 rounded-xl text-lg font-bold">
          <Plus className="mr-2" size={20} /> {loading ? "Saving..." : "Publish Course"}
        </Button>
      </form>

      <div className="grid grid-cols-1 gap-4">
        <h2 className="text-xl font-bold text-stone-400 uppercase tracking-widest text-sm mb-4">Active Courses</h2>
        {courses.map((course: any) => (
          <div key={course._id} className="flex items-center justify-between p-6 bg-white border border-stone-200 rounded-2xl group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-stone-100 overflow-hidden shrink-0 italic text-[10px] flex items-center justify-center text-stone-400">
                {course.image ? "IMG" : "NO IMG"}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{course.title}</h3>
                <div className="flex gap-3 text-xs font-bold uppercase tracking-tighter text-emerald-600">
                   <span>{course.category}</span>
                   <span className="text-stone-300">|</span>
                   <span className="text-stone-500">{course.duration}</span>
                </div>
              </div>
            </div>
            <button onClick={() => handleDelete(course._id)} className="text-stone-300 hover:text-red-500 transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
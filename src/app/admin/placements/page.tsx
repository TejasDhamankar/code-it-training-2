"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Briefcase, Plus, Search, Trash2, User, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface PlacementForm {
  studentName: string;
  course: string;
  company: string;
  role: string;
  packageOffered: string;
  year: string;
  image: string;
}

const INITIAL_FORM: PlacementForm = {
  studentName: "",
  course: "",
  company: "",
  role: "",
  packageOffered: "",
  year: String(new Date().getFullYear()),
  image: "",
};

export default function AdminPlacementsPage() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [formData, setFormData] = useState<PlacementForm>(INITIAL_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const fetchPlacements = async () => {
    setFetching(true);
    setError("");

    try {
      const res = await fetch("/api/placements");
      if (!res.ok) {
        throw new Error("Failed to fetch placements");
      }

      const data = (await res.json()) as Placement[];
      setPlacements(Array.isArray(data) ? data : []);
    } catch (fetchError) {
      console.error(fetchError);
      setPlacements([]);
      setError("Could not load placements. Check database connection and refresh.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  const filteredPlacements = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return placements;

    return placements.filter((item) => {
      return (
        item.studentName.toLowerCase().includes(search) ||
        item.company.toLowerCase().includes(search) ||
        item.role.toLowerCase().includes(search) ||
        item.course.toLowerCase().includes(search) ||
        String(item.year).includes(search)
      );
    });
  }, [placements, query]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const uploadForm = new FormData();
        uploadForm.append("file", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadForm,
        });

        if (!uploadRes.ok) {
          throw new Error("Image upload failed");
        }

        const uploadData = (await uploadRes.json()) as { path: string };
        imageUrl = uploadData.path;
      }

      const payload = {
        ...formData,
        year: Number(formData.year),
        image: imageUrl,
      };

      const res = await fetch("/api/placements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save placement");
      }

      setFormData(INITIAL_FORM);
      setImageFile(null);
      await fetchPlacements();
    } catch (submitError) {
      console.error(submitError);
      setError("Unable to save placement record right now.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/placements/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete placement");
      }
      await fetchPlacements();
    } catch (deleteError) {
      console.error(deleteError);
      setError("Unable to delete the selected placement.");
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Placements</h1>
          <p className="mt-1 text-gray-600">Manage student placement records.</p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search placements..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 rounded-xl border-gray-200 bg-white pl-10"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50">
            <h2 className="text-lg font-bold text-gray-900">Add Placement</h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">Student Name</label>
                <Input
                  value={formData.studentName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, studentName: event.target.value }))}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">Course</label>
                <Input
                  value={formData.course}
                  onChange={(event) => setFormData((prev) => ({ ...prev, course: event.target.value }))}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company</label>
                <Input
                  value={formData.company}
                  onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <Input
                  value={formData.role}
                  onChange={(event) => setFormData((prev) => ({ ...prev, role: event.target.value }))}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Package</label>
                <Input
                  value={formData.packageOffered}
                  onChange={(event) => setFormData((prev) => ({ ...prev, packageOffered: event.target.value }))}
                  placeholder="e.g. 6.5 LPA"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Year</label>
                <Input
                  type="number"
                  min={2000}
                  max={2100}
                  value={formData.year}
                  onChange={(event) => setFormData((prev) => ({ ...prev, year: event.target.value }))}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">Student Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                  className="file:mr-3 file:rounded-full file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-gray-700"
                />
              </div>
            </div>

            <div className="mt-6">
              <Button
                disabled={loading}
                className="h-11 w-full rounded-xl bg-gray-900 px-6 text-white hover:bg-gray-800"
              >
                <Plus size={16} className="mr-2" />
                {loading ? "Saving..." : "Add Placement"}
              </Button>
            </div>

            {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
          </form>
        </div>

        <div className="lg:col-span-2">
          {fetching ? (
            <div className="flex h-full items-center justify-center rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50">
              <p className="text-sm text-gray-500">Loading placements...</p>
            </div>
          ) : filteredPlacements.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-6">
              <div className="text-center">
                <Briefcase size={40} className="mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">No placements found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {query ? "Try a different search term." : "Add a new placement to get started."}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPlacements.map((placement) => (
                <div
                  key={placement._id}
                  className="group flex items-start justify-between gap-4 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-200/50 transition-all hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      {placement.image ? (
                        <Image
                          src={placement.image}
                          alt={placement.studentName}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">
                          <User size={24} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{placement.studentName}</h3>
                      <p className="mt-1 text-sm text-gray-600">{placement.course}</p>
                      <p className="text-xs text-gray-400">
                        {placement.role} at {placement.company}
                        {placement.packageOffered ? ` | ${placement.packageOffered}` : ""}
                        {` | ${placement.year}`}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(placement._id)}
                    className="h-8 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

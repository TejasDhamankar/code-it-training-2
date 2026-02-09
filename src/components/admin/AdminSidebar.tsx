"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Briefcase, LayoutGrid, LogOut } from "lucide-react";

const NAV_LINKS = [
  {
    path: "/admin",
    label: "Dashboard",
    icon: LayoutGrid,
  },
  {
    path: "/admin/courses",
    label: "Courses",
    icon: Book,
  },
  {
    path: "/admin/placements",
    label: "Placements",
    icon: Briefcase,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <aside className="flex flex-col justify-between rounded-3xl bg-white p-4 shadow-lg ring-1 ring-gray-200/50">
      <div className="space-y-2">
        <div className="p-4">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            CODE IT <span className="text-base font-normal text-gray-500">Admin</span>
          </h2>
        </div>
        {NAV_LINKS.map(({ path, label, icon: Icon }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={path}
              href={path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
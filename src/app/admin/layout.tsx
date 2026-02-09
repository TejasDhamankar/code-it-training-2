import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto grid max-w-screen-2xl grid-cols-[280px_1fr] gap-8 px-4 py-8">
        <AdminSidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}


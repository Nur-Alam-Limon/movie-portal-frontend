"use client";

import { AdminSidebar } from "@/components/sidebar/AdminSidebar";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar onSelectSection={() => {}} /> {/* You can remove onSelectSection if unused */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

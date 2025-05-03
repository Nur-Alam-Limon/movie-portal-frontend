"use client";

import { UserSidebar } from "@/components/sidebar/UserSidebar";
import React from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <UserSidebar onSelectSection={() => {}} /> {/* You can remove onSelectSection if unused */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

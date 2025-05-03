"use client";

import { UserSidebar } from "@/components/sidebar/UserSidebar";
import React from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
      <UserSidebar onSelectSection={() => {}} /> 
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

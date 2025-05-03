"use client";
import { AdminProtection } from "@/components/auth/Protection";

function AdminCommentsPage() {

  return (
    <div>Hello from Comments</div>
  );
}

export default AdminProtection(AdminCommentsPage);

"use client";
import { AdminProtection } from "@/components/auth/Protection";

function AdminReviewsPage() {

  return (
    <div>Hello from Reviews</div>
  );
}

export default AdminProtection(AdminReviewsPage);

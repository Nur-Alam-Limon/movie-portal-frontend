"use client";
import withAdminProtection from "@/components/auth/withAdminProtection";

function AdminReviewsPage() {

  return (
    <div>Hello from Reviews</div>
  );
}

export default withAdminProtection(AdminReviewsPage);

"use client";
import withAdminProtection from "@/components/auth/withAdminProtection";

function AdminCommentsPage() {

  return (
    <div>Hello from Comments</div>
  );
}

export default withAdminProtection(AdminCommentsPage);

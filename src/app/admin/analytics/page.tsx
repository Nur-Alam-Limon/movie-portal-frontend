"use client";
import withAdminProtection from "@/components/auth/withAdminProtection";

function AdminAnalyticsPage() {

  return (
    <div>Hello from Analytics</div>
  );
}

export default withAdminProtection(AdminAnalyticsPage);

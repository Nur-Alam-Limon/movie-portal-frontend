"use client";
import { AdminProtection } from "@/components/auth/Protection";

function AdminAnalyticsPage() {

  return (
    <div>Hello from Analytics</div>
  );
}

export default AdminProtection(AdminAnalyticsPage);

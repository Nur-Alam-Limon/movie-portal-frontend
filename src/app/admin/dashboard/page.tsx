"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import withAdminProtection from "@/components/withAdminProtection";
import { useGetDashboardQuery } from "@/features/admin/adminApi";

function AdminDashboardPage() {
  const { data, isLoading, isError } = useGetDashboardQuery();
  console.log("data", data);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center md:text-left">
        Admin Dashboard
      </h1>

      {isError ? (
        <p className="text-red-500 text-center">
          Failed to load dashboard data.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Movies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {isLoading ? "Loading..." : data?.totalMovies ?? 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {isLoading ? "Loading..." : data?.totalUsers ?? 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {isLoading
                  ? "Loading..."
                  : Array.isArray(data?.pendingReviews)
                  ? data.pendingReviews.length
                  : 0}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default withAdminProtection(AdminDashboardPage);

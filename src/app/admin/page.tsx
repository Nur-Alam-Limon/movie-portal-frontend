"use client";

import { AdminProtection } from "@/components/auth/Protection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardQuery } from "@/features/admin/adminApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboardPage() {
  const { data, isLoading, isError } = useGetDashboardQuery();

  console.log("data", data);

  const ratingStats = data?.ratingStats ?? [];
  const activeUsers = data?.activeUsers ?? [];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6 pt-20 mb-40">
      <h1 className="text-3xl font-bold text-center md:text-left">
        Admin Dashboard
      </h1>

      {isError ? (
        <p className="text-red-500 text-center">
          Failed to load dashboard data.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total Movies"
              value={data?.movieStats?.total}
              isLoading={isLoading}
            />
            <StatCard
              title="Genres Covered"
              value={Object.keys(data?.movieStats?.genreCount || {}).length}
              isLoading={isLoading}
            />

            <StatCard
              title="Total Users"
              value={data?.userStats?.total}
              isLoading={isLoading}
            />

            <StatCard
              title="Regular Users"
              value={data?.userStats?.regularUsers}
              isLoading={isLoading}
            />

            <StatCard
              title="Total Reviews"
              value={data?.reviewStats?.approved + data?.reviewStats?.pending}
              isLoading={isLoading}
            />
            <StatCard
              title="Pending Reviews"
              value={data?.reviewStats?.pending}
              isLoading={isLoading}
            />

            <StatCard
              title="Total Comments"
              value={data?.commentCount}
              isLoading={isLoading}
            />
            <StatCard
              title="Watchlist Count"
              value={data?.watchlistCount}
              isLoading={isLoading}
            />

            <StatCard
              title="Total Transactions"
              value={data?.transactionStats?.total}
              isLoading={isLoading}
            />
            <StatCard
              title="Completed Transactions"
              value={data?.transactionStats?.completed}
              isLoading={isLoading}
            />
            <StatCard
              title="Pending Transactions"
              value={data?.transactionStats?.pending}
              isLoading={isLoading}
            />
            <StatCard
              title="Failed Transactions"
              value={data?.transactionStats?.failed}
              isLoading={isLoading}
            />
            <StatCard
              title="Cancelled Transactions"
              value={data?.transactionStats?.cancelled}
              isLoading={isLoading}
            />

            <StatCard
              title="Total Revenue"
              value={`$${
                data?.transactionStats?.totalRevenue?.toFixed(2) ?? "0.00"
              }`}
              isLoading={isLoading}
            />
            <StatCard
              title="Rent Revenue"
              value={`$${
                data?.transactionStats?.rentRevenue?.toFixed(2) ?? "0.00"
              }`}
              isLoading={isLoading}
            />
            <StatCard
              title="Buy Revenue"
              value={`$${
                data?.transactionStats?.buyRevenue?.toFixed(2) ?? "0.00"
              }`}
              isLoading={isLoading}
            />
          </div>

          {/* Rating Graph */}
          <div className="mt-10">
            <Card>
              <CardHeader>
                <CardTitle>Average Ratings Per Movie</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ratingStats.slice(0, 10)}>
                    <XAxis dataKey="title" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="averageRating" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Active Users */}
          <div className="mt-10">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Top 10 Active Users
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Based on number of reviews submitted
                </p>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-muted space-y-2">
                  {activeUsers.slice(0, 10).map((user: any, idx: number) => (
                    <li
                      key={user.userId}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-muted-foreground font-medium">
                          {idx + 1}.
                        </span>
                        <span className="font-semibold">{user.email}</span>
                      </div>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {user.reviewCount}{" "}
                        {user.reviewCount === 1 ? "review" : "reviews"}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  isLoading,
}: {
  title: string;
  value: any;
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {isLoading ? "Loading..." : value ?? 0}
        </p>
      </CardContent>
    </Card>
  );
}

export default AdminProtection(AdminDashboardPage);

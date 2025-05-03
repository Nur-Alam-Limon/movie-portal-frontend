"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProtection } from "@/components/auth/Protection";
import { useGetMyWatchlistQuery } from "@/features/watchlist/watchlistApi";

function UserDashboardPage() {
  const { data, isLoading, isError } = useGetMyWatchlistQuery(null);

  console.log("Watrchlist daa", data);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pt-20 mb-40">
      <h1 className="text-3xl font-bold text-center md:text-left">
        Welcome to Your Dashboard
      </h1>

      {isError ? (
        <p className="text-red-500 text-center">Failed to load your watchlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Watchlist</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {isLoading
                  ? "Loading..."
                  : Array.isArray(data)
                  ? data.length
                  : 0}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default UserProtection(UserDashboardPage);

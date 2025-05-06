"use client";

import { useGetMyWatchlistQuery } from "@/features/watchlist/watchlistApi";
import { UserProtection } from "@/components/auth/Protection";
import MovieCard from "@/components/movie/MovieCard";
import Loading from "@/app/loading";

function WatchlistPage() {
  const { data, isLoading, isError } = useGetMyWatchlistQuery(null);

  const movies = data?.map((item: any) => item.movie) || [];

  return (
    <div className="max-w-6xl mx-auto p-4 pt-20 mb-40">
      <h1 className="text-3xl font-bold text-center md:text-left mb-6">
        Your Watchlist
      </h1>

      {isLoading ? (
        <Loading/>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load watchlist.</p>
      ) : movies.length === 0 ? (
        <p className="text-center text-gray-500">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {movies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProtection(WatchlistPage);

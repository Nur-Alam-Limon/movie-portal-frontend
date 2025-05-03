"use client";
import React from "react";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { useGetAllMoviesQuery } from "@/features/movies/moviesApi";
import MovieCard from "./MovieCard";

const FeaturedMovies: React.FC = () => {
  const { data: movies, isLoading, isError } = useGetAllMoviesQuery(null);

  console.log("Movies", movies)

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <div className="my-12 px-8 lg:px-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Listings</h2>
        <div className="text-center my-16 text-lg text-gray-600">No Product Found.</div>
      </div>
    );
  }

  return (
    <div className="my-12 px-8 lg:px-16">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {movies.slice(0, 8).map((movie) => (
         <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovies;

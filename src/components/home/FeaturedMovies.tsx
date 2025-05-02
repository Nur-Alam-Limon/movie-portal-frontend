"use client";
import React from "react";
import ProductCard from "./MovieCard";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { useGetAllMoviesQuery } from "@/features/movies/moviesApi";

const FeaturedMovies: React.FC = () => {
  const { data: movies, isLoading, isError } = useGetAllMoviesQuery(null);

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
          <ProductCard
            key={movie._id}
            title={movie.title}
            price={`$${movie.price}`}
            image={movie.image}
            condition={movie.condition}
            description={movie.description}
            listing={movie} // or rename this to "movie" if your MovieCard expects it
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovies;

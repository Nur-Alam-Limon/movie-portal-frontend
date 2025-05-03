"use client";
import React from "react";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { useGetAllMoviesQuery } from "@/features/movies/moviesApi";
import MovieCard from "../movie/MovieCard";

type FeaturedMoviesProps = {
  headingText: string;
  variant?: string; // Add as needed
};

const FeaturedMovies: React.FC<FeaturedMoviesProps> = ({ headingText, variant }) => {
  const { data: movieData, isLoading, isError } = useGetAllMoviesQuery(null);

  // Loading and Error handling
  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  console.log("Movies Data", movieData);

  // Check if we have the expected movie data (assuming it's inside MovieAccess)
  let filteredMovies = movieData;

  if (!Array.isArray(filteredMovies) || filteredMovies.length === 0) {
    return (
      <div className="my-12 px-8 lg:px-16">
        <h2 className="text-3xl font-bold mb-6 text-center">{headingText}</h2>
        <div className="text-center my-16 text-lg text-gray-600">No Movies Found.</div>
      </div>
    );
  }

  // Customize the movie list based on variant
  switch (variant) {
    case "popular":
      filteredMovies = [...filteredMovies] // Create a shallow copy
        .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0)) // Sort by review count or another metric
        .slice(0, 4); // Limit to top 8
      break;
    case "topRated":
      filteredMovies = [...filteredMovies] // Create a shallow copy
        .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)) // Sort by rating
        .slice(0, 4); // Limit to top 8
      break;
    case "thriller":
      filteredMovies = [...filteredMovies] // Create a shallow copy
        .filter((movie) => movie.genres.includes("Thriller")) // Only show Thriller movies
        .slice(0, 4); // Limit to top 8 thriller movies
      break;
    case "Darama":
    filteredMovies = [...filteredMovies] // Create a shallow copy
      .filter((movie) => movie.genres.includes("Drama")) // Only show Thriller movies
      .slice(0, 4); // Limit to top 8 thriller movies
    break;
    case "Action":
    filteredMovies = [...filteredMovies] // Create a shallow copy
      .filter((movie) => movie.genres.includes("Action")) // Only show Thriller movies
      .slice(0, 4); // Limit to top 8 thriller movies
    break;
    default:
      filteredMovies = [...filteredMovies].slice(0, 4); // Default: Show top 8 movies
  }

  return (
    <div className="my-12 px-8 lg:px-16">
      <h2 className="text-3xl font-bold mb-6 text-center">{headingText}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredMovies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovies;

"use client";
import React from "react";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { useGetAllMoviesQuery } from "@/features/movies/moviesApi";
import MovieCard from "../movie/MovieCard";

type FeaturedMoviesProps = {
  headingText: string;
  variant?: string; 
};

const FeaturedMovies: React.FC<FeaturedMoviesProps> = ({ headingText, variant }) => {
  const { data: movieData, isLoading, isError } = useGetAllMoviesQuery(null);

  console.log("Movie Data", movieData);

  
  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  
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
      filteredMovies = [...filteredMovies] 
        .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0)) 
        .slice(0, 4); 
      break;
    case "topRated":
      filteredMovies = [...filteredMovies] 
        .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)) 
        .slice(0, 4); 
      break;
    case "thriller":
      filteredMovies = [...filteredMovies] 
        .filter((movie) => movie.genres.includes("Thriller"))
        .slice(0, 4); 
      break;
    case "Darama":
    filteredMovies = [...filteredMovies] 
      .filter((movie) => movie.genres.includes("Drama")) 
      .slice(0, 4); 
    break;
    case "Action":
    filteredMovies = [...filteredMovies] 
      .filter((movie) => movie.genres.includes("Action")) 
      .slice(0, 4); 
    break;
    default:
      filteredMovies = [...filteredMovies].slice(0, 4); 
  }

  return (
    <div className="pb-20 container mx-auto text-center px-4 sm:px-8 lg:px-0">
      <h2 className="text-4xl font-bold mb-10 text-center">{headingText}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredMovies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovies;

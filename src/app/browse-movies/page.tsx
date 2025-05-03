"use client";

import Loading from "../loading";
import MovieCard from "@/components/movie/MovieCard";
import { Button } from "@/components/ui/button";
import { useGetAllMoviesQuery } from "@/features/movies/moviesApi";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AllMoviesPage = () => {
  const searchParams = useSearchParams();
  const defaultSearch = searchParams.get("search") || "";
  const defaultGenre = searchParams.get("genre") || "";
  const [searchQuery, setSearchQuery] = useState(defaultSearch);
  const [selectedGenre, setSelectedGenre] = useState(defaultGenre);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDirector, setSelectedDirector] = useState("");

  const router = useRouter();
  const { data: movies, isLoading, isError } = useGetAllMoviesQuery(null);

  const allGenres = Array.from(
    new Set(movies?.flatMap((movie: any) => movie.genres || []))
  ) as string[];
  const allYears = Array.from(
    new Set(movies?.flatMap((m: any) => m.releaseYear) || [])
  ).sort((a: any, b: any) => b - a) as number[];
  const allDirectors = Array.from(
    new Set(movies?.map((m: any) => m.director) || [])
  ) as string[];

  const filteredMovies =
    movies?.filter((movie: any) => {
      const matchesSearch = searchQuery
        ? movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesGenre = selectedGenre
        ? movie.genres.includes(selectedGenre)
        : true;

      const matchesYear = selectedYear
        ? movie.releaseYear === parseInt(selectedYear)
        : true;

      const matchesDirector = selectedDirector
        ? movie.director === selectedDirector
        : true;

      return matchesSearch && matchesGenre && matchesYear && matchesDirector;
    }) || [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddMovie = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    const q = searchParams.get("search") || "";
    setSearchQuery(q);
  }, [searchParams]);
  

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-red-500">Failed to load movies.</p>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Filters Section */}
      <aside className="w-full lg:w-[20%] p-4 lg:p-8 border-r-3 border-gray-700">
        <h2 className="text-xl font-semibold mb-6">Filters</h2>

        <div className="mb-6">
          <label className="block font-medium mb-2">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
            placeholder="Search by title..."
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2">Genre</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
          >
            <option value="">All Genres</option>
            {allGenres.map((genre: string) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2">Release Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
          >
            <option value="">All Years</option>
            {allYears.map((year: number) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2">Director</label>
          <select
            value={selectedDirector}
            onChange={(e) => setSelectedDirector(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
          >
            <option value="">All Directors</option>
            {allDirectors.map((director: string) => (
              <option key={director} value={director}>
                {director}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* Movies Section */}
      <main className="w-full lg:w-[80%] p-4 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Movies</h1>
          <Button onClick={handleAddMovie}>Sell a Movie</Button>
        </div>

        {filteredMovies.length === 0 ? (
          <p className="text-gray-500 text-center">No movies found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredMovies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AllMoviesPage;

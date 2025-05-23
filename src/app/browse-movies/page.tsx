"use client";

import Loading from "../loading";
import MovieCard from "@/components/movie/MovieCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllMoviesQuery } from "@/features/movies/moviesApi";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AllMoviesPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultSearch = searchParams.get("search") || "";
  const defaultGenre = searchParams.get("genre") || "";

  const [searchQuery, setSearchQuery] = useState(defaultSearch);
  const [selectedGenre, setSelectedGenre] = useState(defaultGenre);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDirector, setSelectedDirector] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { data: movies, isLoading, isError } = useGetAllMoviesQuery(null);

  const allGenres = Array.from(
    new Set(movies?.flatMap((m: any) => m.genres || []))
  ) as string[];
  const allYears = Array.from(
    new Set(movies?.map((m: any) => m.releaseYear) || [])
  ) as number[];

  const allDirectors = Array.from(
    new Set(movies?.map((m: any) => m.director))
  ) as string[];

  const filteredMovies =
    movies
      ?.filter((movie: any) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          !searchQuery ||
          movie.title?.toLowerCase().includes(query) ||
          movie.genres?.some((g: string) => g.toLowerCase().includes(query)) ||
          movie.director?.toLowerCase().includes(query) ||
          movie.cast?.some((c: string) => c.toLowerCase().includes(query)) ||
          movie.accessUrl?.toLowerCase().includes(query);

        const matchesGenre = selectedGenre
          ? movie.genres?.includes(selectedGenre)
          : true;
        const matchesYear = selectedYear
          ? movie.releaseYear === parseInt(selectedYear)
          : true;
        const matchesDirector = selectedDirector
          ? movie.director === selectedDirector
          : true;

        const rating = movie.rating ?? 0;
        const matchesMinRating = minRating
          ? rating >= parseFloat(minRating)
          : true;
        const matchesMaxRating = maxRating
          ? rating <= parseFloat(maxRating)
          : true;

        return (
          matchesSearch &&
          matchesGenre &&
          matchesYear &&
          matchesDirector &&
          matchesMinRating &&
          matchesMaxRating
        );
      })
      .sort((a: any, b: any) => {
        if (sortBy === "highestRated") return (b.rating ?? 0) - (a.rating ?? 0);
        if (sortBy === "mostReviewed")
          return (b.reviews?.length ?? 0) - (a.reviews?.length ?? 0);
        if (sortBy === "latest")
          return (b.releaseYear ?? 0) - (a.releaseYear ?? 0);
        return 0;
      }) || [];

  const handleAddMovie = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-red-500">Failed to load movies.</p>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Filters Section */}
      <aside className="w-full lg:w-[20%] p-4 lg:p-8 border-r-2 border-gray-300 space-y-6">
        <h2 className="text-xl font-semibold">Filters</h2>

        <div className="space-y-2">
          <Label>Search</Label>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Title, cast, genre..."
          />
        </div>

        <div className="space-y-2">
          <Label>Genre</Label>
          <Select
            onValueChange={(val) => setSelectedGenre(val === "all" ? "" : val)}
            defaultValue={selectedGenre || "all"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {allGenres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Release Year</Label>
          <Select
            onValueChange={(val) => setSelectedYear(val === "all" ? "" : val)}
            defaultValue={selectedYear || "all"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {allYears.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Director</Label>
          <Select
            onValueChange={(val) =>
              setSelectedDirector(val === "all" ? "" : val)
            }
            defaultValue={selectedDirector || "all"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Directors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Directors</SelectItem>
              {allDirectors.map((director) => (
                <SelectItem key={director} value={director}>
                  {director}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Min Rating</Label>
          <Input
            type="number"
            min={0}
            max={10}
            step="0.1"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            placeholder="e.g., 5"
          />
        </div>

        <div className="space-y-2">
          <Label>Max Rating</Label>
          <Input
            type="number"
            min={0}
            max={10}
            step="0.1"
            value={maxRating}
            onChange={(e) => setMaxRating(e.target.value)}
            placeholder="e.g., 9"
          />
        </div>

        <div className="space-y-2">
          <Label>Sort By</Label>
          <Select
            onValueChange={(val) => setSortBy(val === "all" ? "" : val)}
            defaultValue={sortBy || "all"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Default</SelectItem>
              <SelectItem value="highestRated">Highest Rated</SelectItem>
              <SelectItem value="mostReviewed">Most Reviewed</SelectItem>
              <SelectItem value="latest">Latest Releases</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </aside>

      {/* Movies Section */}
      <main className="w-full lg:w-[80%] p-4 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Movies</h1>
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

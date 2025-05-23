"use client";

import { useGetAllMoviesQuery } from "@/features/movies/moviesApi";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroCarousel() {
  const { data: movieData, isLoading, isError } = useGetAllMoviesQuery(null);
  const banners = movieData?.slice(0, 4) || [];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="container mx-auto my-16 h-[70vh] overflow-hidden rounded-3xl border border-gray-700 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] h-full">
        {/* Left: Banner Section */}
        <div className="relative h-full w-full">
          {banners.map((movie: any, index: number) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={
                  movie.accessUrl ||
                  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1600&q=80"
                }
                alt={movie.title}
                layout="fill"
                objectFit="cover"
                quality={100}
                className="brightness-75"
              />

              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">
                  {movie.title}{" "}
                  <span className="text-lg text-gray-300">
                    ({movie.releaseYear})
                  </span>
                </h1>
                <p className="text-white text-base md:text-lg max-w-lg mb-4 line-clamp-3">
                  {movie.synopsis}
                </p>
                <Link href={`/movie-details/${movie.id}`}>
                  <button className="inline-flex items-center border-2 bg-white text-black font-semibold px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform">
                    <Play className="mr-2" size={18} /> Watch Trailer
                  </button>
                </Link>
              </div>
            </div>
          ))}

          {/* Banner Nav */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 z-20"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 z-20"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>

        {/* Right: Upcoming Cards */}
        <div className="hidden lg:block bg-white dark:bg-[#1f1f1f] overflow-y-auto y-scrollable p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Coming Up Next
          </h2>
          {banners.map((movie: any) => (
            <div
              key={movie.id}
              className="flex items-start gap-4 p-4 rounded-xl bg-gray-100 dark:bg-[#2a2a2a] shadow hover:shadow-lg transition"
            >
              <div className="w-24 h-36 rounded overflow-hidden shrink-0 relative">
                <Image
                  src={
                    movie.accessUrl ||
                    "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                  quality={80}
                />
              </div>
              <div className="flex-1 text-black dark:text-white space-y-1">
                <h3 className="text-lg font-semibold">
                  {movie.title}{" "}
                  <span className="text-sm text-gray-400">
                    ({movie.releaseYear})
                  </span>
                </h3>
                <p className="text-sm line-clamp-2 text-gray-700 dark:text-gray-300">
                  {movie.synopsis}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <strong>Genres:</strong> {movie.genres?.join(", ")}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <strong>Director:</strong> {movie.director}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

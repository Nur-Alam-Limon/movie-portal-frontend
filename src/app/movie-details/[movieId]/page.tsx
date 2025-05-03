"use client";

import { Button } from "@/components/ui/button";
import { useGetMovieByIdQuery } from "@/features/movies/moviesApi";
import Image from "next/image";
import {
  BsCalendarDate,
  BsPerson,
  BsCameraReels,
  BsPeople,
  BsFilm,
  BsCurrencyDollar,
  BsTags,
} from "react-icons/bs";

interface MovieDetailsProps {
  params: { movieId: string };
}

export default function MovieDetailsPage({ params }: MovieDetailsProps) {
  const { movieId } = params;
  const { data: movie, isLoading } = useGetMovieByIdQuery(movieId);

  if (isLoading)
    return <p className="text-center mt-10 text-white">Loading...</p>;
  if (!movie)
    return <p className="text-center mt-10 text-white">No movie found</p>;

  console.log("Moviue", movie);

  return (
    <div className="max-w-6xl mx-auto px-12 py-24 text-white">
      {/* Hero Banner */}
      <div
        className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-lg"
        style={{
          backgroundImage: `url('${
            movie?.accessUrl ||
            "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1600&q=80"
          }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="flex flex-col justify-end pb-6 mt-8">
        <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
        <p className="text-gray-300 max-w-2xl">{movie.synopsis}</p>
      </div>

      {/* Movie Info */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="space-y-4 text-md text-gray-300">
          <div className="flex items-center gap-2">
            <BsCalendarDate />{" "}
            <span>
              <strong>Release Year:</strong> {movie.releaseYear}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsPerson />{" "}
            <span>
              <strong>Director:</strong> {movie.director}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsCameraReels />{" "}
            <span>
              <strong>Genres:</strong> {movie.genres.join(", ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsPeople />{" "}
            <span>
              <strong>Cast:</strong> {movie.cast.join(", ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsFilm />{" "}
            <span>
              <strong>Streaming On:</strong> {movie.streamingLinks.join(", ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsCurrencyDollar />{" "}
            <span>
              <strong>Rent:</strong> ${movie.priceRent.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsCurrencyDollar />{" "}
            <span>
              <strong>Buy:</strong> ${movie.priceBuy.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsTags />{" "}
            <span>
              <strong>Discount:</strong> {movie.discount}%
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col justify-center items-start gap-4">
          <Button className="w-full bg-blue-400 hover:bg-blue-500 text-white text-lg px-6 py-6 rounded-md">
            Rent Now for ${movie.priceRent.toFixed(2)}
          </Button>
          <Button className="w-full bg-[#2C2A4A] hover:bg-[#2C2A4A] text-white text-lg px-6 py-6 rounded-md">
            Buy Now for ${movie.priceBuy.toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
}

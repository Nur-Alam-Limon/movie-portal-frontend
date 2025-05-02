"use client";

import { Heart, MessageCircle, Star } from "lucide-react";

type MovieCardProps = {
  movie: {
    id: string;
    title: string;
    synopsis: string;
    genres: string[];
    releaseYear: number;
    director: string;
  };
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-[#2C2A4A] text-white rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
      {/* Dummy Image */}
      <div className="h-64 w-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80')` }} />

      {/* Content */}
      <div className="p-6 space-y-3">
        <h2 className="text-2xl font-bold">{movie.title} <span className="text-sm text-gray-400">({movie.releaseYear})</span></h2>
        <p className="text-md text-gray-300 line-clamp-3">{movie.synopsis}</p>
        <div className="text-sm text-gray-400">
          <strong className="text-gray-200">Genres:</strong> {movie.genres.join(", ")}
        </div>
        <div className="text-sm text-gray-400">
          <strong className="text-gray-200">Director:</strong> {movie.director}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-700 mt-4">
          <button className="flex items-center gap-1 text-gray-200 hover:text-red-500 transition">
            <Heart className="w-4 h-4" /> Like
          </button>
          <button className="flex items-center gap-1 text-gray-200 hover:text-blue-400 transition">
            <MessageCircle className="w-4 h-4" /> Comment
          </button>
          <button className="flex items-center gap-1 text-gray-200 hover:text-yellow-400 transition">
            <Star className="w-4 h-4" /> Review
          </button>
        </div>
      </div>
    </div>
  );
}

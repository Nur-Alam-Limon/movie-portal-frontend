"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddReviewMutation } from "@/features/reviews/reviewsApi";
import {
  useGetMyWatchlistQuery,
  useToggleWatchlistMutation,
} from "@/features/watchlist/watchlistApi";
import { RootState } from "@/store";
import { Star, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

type MovieCardProps = {
  movie: {
    id: string;
    title: string;
    synopsis: string;
    genres: string[];
    releaseYear: number;
    director: string;
    accessUrl: string;
  };
};

export default function MovieCard({ movie }: MovieCardProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.user);
  const [editMovieType, setEditMovieType] = useState<"review" | null>(null);
  const [inputText, setInputText] = useState("");
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false); // Track if the movie is in the watchlist

  const router = useRouter();
  const [addReview] = useAddReviewMutation();
  const [toggleWatchlist] = useToggleWatchlistMutation();
  const { data: watchlist, refetch } = useGetMyWatchlistQuery(null); // Fetch the user's watchlist

  // Check if the movie is in the watchlist
  useEffect(() => {
    if (watchlist) {
      const movieInWatchlist = watchlist.some(
        (item: any) => item.movie.id === movie.id
      );
      setIsInWatchlist(movieInWatchlist);
    }
  }, [watchlist, movie.id]);


  const handleAddToWatchlist = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to add to your watchlist!");
      router.push("/login");
      return;
    }

    try {
      // Toggle watchlist status
      await toggleWatchlist(movie.id);
      await refetch();

      toast.success(
        isInWatchlist
          ? "Movie removed from your watchlist!"
          : "Movie added to your watchlist!"
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding to watchlist!");
    }
  };

  return (
    <>
      <div className="dark:bg-[#2A2A2A] bg-slate-200 text-black dark:text-white rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300 h-[620px] flex flex-col">
        <Link href={`/movie-details/${movie.id}`}>
          <div
            className="h-64 w-full bg-cover bg-center shrink-0"
            style={{
              backgroundImage: `url('${
                movie.accessUrl ||
                "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80"
              }')`,
            }}
          />
        </Link>

        <div className="p-6 space-y-3 overflow-hidden flex flex-col flex-1">
          <h2 className="text-2xl font-bold">
            {movie.title}{" "}
            <span className="text-sm dark:text-gray-400">
              ({movie.releaseYear})
            </span>
          </h2>
          <p className="text-md dark:text-gray-300 line-clamp-3">
            {movie.synopsis}
          </p>
          <div className="text-sm dark:text-gray-400">
            <strong className="dark:text-gray-200">Genres:</strong>{" "}
            {movie.genres.join(", ")}
          </div>
          <div className="text-sm dark:text-gray-400">
            <strong className="dark:text-gray-200">Director:</strong>{" "}
            {movie.director}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-700 mt-auto gap-2">
            {/* Add to Watchlist Button */}
            <button
              onClick={handleAddToWatchlist}
              className="flex items-center gap-2 px-2 text-sm dark:text-white rounded hover:!text-blue-400 transition cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 ${isInWatchlist ? "text-red-400" : ""}`}
              />
              <span className={`${isInWatchlist ? "text-red-400" : ""}`}>{isInWatchlist ? "Remove Watch" : "Add to Watchlist"}</span>
            </button>

            {/* REVIEW Modal */}
            <Dialog>
              <DialogTrigger
                asChild
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault(); 
                    toast.error("Please log in first");
                    router.push("/login");
                    return;
                  }
                  setEditMovieType("review");
                }}
              >
                <button className="flex items-center gap-2 px-2 py-2 text-sm dark:text-white rounded hover:text-yellow-400 transition cursor-pointer">
                  <Star className="w-5 h-5" /> Review
                </button>
              </DialogTrigger>
              {editMovieType === "review" && (
                <DialogContent className="max-w-2xl p-8 bg-slate-300 dark:bg-[#2A2A2A]/90 backdrop-blur-md border border-gray-600 rounded-xl shadow-2xl y-scrollable dark:text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-center text-blue-400 my-4 pb-3 border-b border-gray-600">
                      {movie.title}
                    </DialogTitle>

                    <DialogTitle className="text-xl font-semibold">
                      Add Review
                    </DialogTitle>
                    <DialogDescription className="dark:text-gray-300 mt-2 text-gray-700">
                      Share your thoughts and give this movie a rating.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Star Rating */}
                  <div className="flex gap-2 items-center mt-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 cursor-pointer transition ${
                          star <= rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-500"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>

                  {/* Review Input */}
                  <textarea
                    placeholder="Write your review..."
                    className="w-full mt-4 p-3 rounded dark:bg-[#1F1F1F] border border-gray-600 dark:text-white"
                    rows={4}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />

                  {/* Tags Input */}
                  <div className="mt-3 flex flex-wrap gap-2 items-center">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-600 px-2 py-1 rounded text-sm flex items-center gap-1"
                      >
                        #{tag}
                        <button
                          className="ml-1 text-red-400"
                          onClick={() =>
                            setTags(tags.filter((_, i) => i !== idx))
                          }
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add tag"
                      className="p-2 rounded dark:bg-[#1F1F1F] border border-gray-600 dark:text-white"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />
                  </div>

                  {/* Spoiler Checkbox */}
                  <div className="mt-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={spoiler}
                        onChange={(e) => setSpoiler(e.target.checked)}
                      />
                      <span className="text-md dark:text-gray-300 text-gray-700">
                        Contains spoilers
                      </span>
                    </label>
                  </div>

                  {/* Submit Review Button */}
                  <button
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    onClick={async () => {
                      if (inputText && rating) {
                        try {
                          await addReview({
                            rating,
                            text: inputText,
                            tags,
                            spoiler,
                            movieId: Number(movie.id),
                          });
                          setEditMovieType(null);
                          toast.success("Review submitted successfully!");
                        } catch (error) {
                          console.error(error);
                          toast.error(
                            "Failed to submit review. Please try again."
                          );
                        }
                      } else {
                        toast.error(
                          "Please add review text and rating before submitting."
                        );
                      }
                    }}
                  >
                    Submit Review
                  </button>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddCommentMutation } from "@/features/comments/commentsApi";
import { useToggleLikeMutation } from "@/features/likes/likesApi";
import { useAddReviewMutation } from "@/features/reviews/reviewsApi";
import { RootState } from "@/store";
import { Heart, MessageCircle, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [editMovieType, setEditMovieType] = useState<
    "like" | "comment" | "review" | null
  >(null);
  const [inputText, setInputText] = useState("");
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [commentReviewId, setCommentReviewId] = useState<number | null>(null);

  const router = useRouter();

  const [toggleLike] = useToggleLikeMutation();
  const [addReview] = useAddReviewMutation();
  const [addComment] = useAddCommentMutation();

  const handleAction = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to perform this action!");
      router.push("/login");
      return;
    }

    try {
      if (editMovieType === "like") {
        await toggleLike(movie.id);
        toast.success("You liked this movie!");
      } else if (editMovieType === "review") {
        await addReview({
          movieId: Number(movie.id),
          rating,
          text: inputText,
          tags,
          spoiler,
        });
        toast.success("Review added!");
      } else if (editMovieType === "comment") {
        if (!commentReviewId) {
          toast.error("Please enter a valid Review ID!");
          return;
        }
        await addComment({
          reviewId: commentReviewId,
          text: inputText,
          parentId: null,
        });
        toast.success("Comment added!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }

    // Reset state
    setEditMovieType(null);
    setInputText("");
    setRating(0);
    setTags([]);
    setTagInput("");
    setSpoiler(false);
    setCommentReviewId(null);
  };

  return (
    <>
      <div className="bg-[#2C2A4A] text-white rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300 h-[550px] flex flex-col">
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
            <span className="text-sm text-gray-400">({movie.releaseYear})</span>
          </h2>
          <p className="text-md text-gray-300 line-clamp-3">{movie.synopsis}</p>
          <div className="text-sm text-gray-400">
            <strong className="text-gray-200">Genres:</strong>{" "}
            {movie.genres.join(", ")}
          </div>
          <div className="text-sm text-gray-400">
            <strong className="text-gray-200">Director:</strong>{" "}
            {movie.director}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-700 mt-auto gap-2">
            {/* Like Button & Modal */}
            <Dialog>
              <DialogTrigger asChild onClick={() => setEditMovieType("like")}>
                <button className="flex items-center gap-2 px-2 py-2 text-sm text-white rounded hover:text-red-500 transition cursor-pointer">
                  <Heart className="w-5 h-5" /> Like
                </button>
              </DialogTrigger>
              {editMovieType === "like" && (
                <DialogContent className="max-w-2xl p-8 bg-[#1f1d36]/90 backdrop-blur-md border border-gray-600 rounded-xl shadow-2xl text-white">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                      Like this movie
                    </DialogTitle>
                    <DialogDescription className="mt-2 text-gray-300">
                      Are you sure you want to like this movie?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleAction}
                      className="px-5 py-2 bg-red-500 rounded hover:bg-red-600 transition text-white"
                    >
                      Confirm
                    </button>
                  </div>
                </DialogContent>
              )}
            </Dialog>

            {/* COMMENT Modal */}
            <Dialog>
              <DialogTrigger
                asChild
                onClick={() => setEditMovieType("comment")}
              >
                <button className="flex items-center gap-2 px-2 py-2 text-sm text-white rounded hover:text-blue-400 transition cursor-pointer">
                  <MessageCircle className="w-5 h-5" /> Comment
                </button>
              </DialogTrigger>
              {editMovieType === "comment" && (
                <DialogContent className="max-w-2xl p-8 bg-[#1f1d36]/90 backdrop-blur-md border border-gray-600 rounded-xl shadow-2xl text-white">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                      Add Comment
                    </DialogTitle>
                    <DialogDescription>
                      <input
                        type="number"
                        placeholder="Review ID"
                        className="w-full mb-3 p-2 rounded bg-[#2a2a40] border border-gray-600"
                        value={commentReviewId ?? ""}
                        onChange={(e) =>
                          setCommentReviewId(Number(e.target.value))
                        }
                      />
                      <textarea
                        placeholder="Write your comment..."
                        rows={5}
                        className="w-full mt-2 p-3 bg-[#2a2a40] text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                      />
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleAction}
                      className="px-5 py-2 bg-blue-500 rounded hover:bg-blue-600 transition text-white"
                    >
                      Submit Comment
                    </button>
                  </div>
                </DialogContent>
              )}
            </Dialog>

             {/* REVIEW Modal */}
            <Dialog>
              <DialogTrigger asChild onClick={() => setEditMovieType("review")}>
                <button className="flex items-center gap-2 px-2 py-2 text-sm text-white rounded hover:text-yellow-400 transition cursor-pointer">
                  <Star className="w-5 h-5" /> Review
                </button>
              </DialogTrigger>
              {editMovieType === "review" && (
                <DialogContent className="max-w-2xl p-8 bg-[#1f1d36]/90 backdrop-blur-md border border-gray-600 rounded-xl shadow-2xl text-white">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                      Add Review
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 mt-2">
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
                    className="w-full mt-4 p-3 rounded bg-[#2a2a40] border border-gray-600 text-white"
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
                      className="p-2 rounded bg-[#2a2a40] border border-gray-600 text-white"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && tagInput.trim()) {
                          setTags([...tags, tagInput.trim()]);
                          setTagInput("");
                          e.preventDefault();
                        }
                      }}
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
                      <span className="text-sm text-gray-300">
                        Contains spoilers
                      </span>
                    </label>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleAction}
                      className="px-5 py-2 bg-green-600 rounded hover:bg-green-700 transition text-white"
                    >
                      Submit Review
                    </button>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}

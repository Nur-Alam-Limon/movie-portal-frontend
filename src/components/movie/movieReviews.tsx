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
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "@/features/reviews/reviewsApi";
import { RootState } from "@/store";
import { Star } from "lucide-react";
import { useState } from "react";
import { BsHeart, BsHeartFill, BsChatDots } from "react-icons/bs";
import { useSelector } from "react-redux";

interface Comment {
  id: number;
  reviewId: number;
  text: string;
  user: { email: string };
  createdAt: string;
}

interface ReviewLike {
  userId: number;
}

interface Review {
  id: number;
  rating: number;
  text: string;
  tags?: string[];
  spoiler?: boolean;
  Comment: Comment[];
  ReviewLike?: ReviewLike[];
  approved: boolean;
  userId: number;
}

interface MovieReviewsProps {
  reviews: Review[];
}

export default function MovieReviews({ reviews }: MovieReviewsProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [commentInput, setCommentInput] = useState<Record<number, string>>({});
  const [addComment] = useAddCommentMutation();
  const [toggleLike] = useToggleLikeMutation();

  const [editMovieType, setEditMovieType] = useState<"review" | null>(null);
  const [inputText, setInputText] = useState("");
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [addReview] = useAddReviewMutation();

  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editInputText, setEditInputText] = useState("");
  const [editRating, setEditRating] = useState(0);

  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const isLiked = (review: Review) =>
    user && review.ReviewLike?.some((like) => like.userId === user.id);

  const handleLikeToggle = async (reviewId: number) => {
    if (!user) return; // Prevent action for guest
    await toggleLike(reviewId);
  };

  const handleCommentChange = (id: number, value: string) => {
    setCommentInput((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddComment = async (reviewId: number) => {
    if (!user || !commentInput[reviewId]) return;
    await addComment({ reviewId, text: commentInput[reviewId] });
    setCommentInput((prev) => ({ ...prev, [reviewId]: "" }));
  };

  if (!reviews?.length) {
    return <p className="text-gray-400 mt-6">No reviews available.</p>;
  }

  const startEditReview = (review: Review) => {
    setEditingReviewId(review.id);
    setEditInputText(review.text);
    setEditRating(review.rating);
  };

  const handleUpdateReview = async () => {
    if (!editingReviewId || !editInputText) return;
    await updateReview({
      id: editingReviewId,
      data: { text: editInputText, rating: editRating },
    });
    setEditingReviewId(null);
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    await deleteReview(id);
  };

  return (
    <section className="mt-16 space-y-8 px-4 sm:px-0">
      <div className="flex item-center justify-between border-b border-gray-600 pb-2 tracking-wide">
        <h2 className="text-3xl font-bold text-white">🎥 Audience Reviews</h2>

        <Dialog>
          <DialogTrigger asChild onClick={() => setEditMovieType("review")}>
            <button className="flex items-center gap-2 px-2 py-2 text-lg text-blue-400 rounded hover:text-blue-600 transition cursor-pointer">
              <Star className="w-7 h-7" /> Add a Review
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
                      onClick={() => setTags(tags.filter((_, i) => i !== idx))}
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
                  <span className="text-md text-gray-300">
                    Contains spoilers
                  </span>
                </label>
              </div>

              {/* Submit Review Button */}
              <button
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                onClick={async () => {
                  if (inputText && rating) {
                    await addReview({
                      rating,
                      text: inputText,
                      tags,
                      spoiler,
                    });
                    setEditMovieType(null); // Close the modal
                  }
                }}
              >
                Submit Review
              </button>
            </DialogContent>
          )}
        </Dialog>
      </div>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="p-6 bg-gradient-to-b from-[#1f1f2f] to-[#12121c] rounded-2xl border border-gray-700 shadow-xl hover:shadow-indigo-700/30 transition-shadow duration-300"
        >
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="text-yellow-400 font-bold text-lg">
                ⭐ {review.rating}/10
              </span>

              {review.spoiler && (
                <span className="text-red-500 text-xs bg-red-900/30 px-2 py-0.5 rounded-full uppercase font-semibold">
                  Spoiler
                </span>
              )}

              {review.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-300 bg-gray-700/30 px-2 py-0.5 rounded-full uppercase"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Like */}
            <div
              className={`cursor-pointer text-xl ${
                !user ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => user && handleLikeToggle(review.id)}
              title={!user ? "Login to like" : "Like"}
            >
              {isLiked(review) ? (
                <BsHeartFill className="text-red-500" />
              ) : (
                <BsHeart className="text-white hover:text-red-400 transition-colors" />
              )}
            </div>
          </div>

          {/* Review Text */}
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
            {review.text}
          </p>

          {/* Comment input */}
          {user && (
            <div className="flex items-center gap-2 mt-2">
              <input
                className="flex-1 bg-[#0f0f1f] border border-gray-700 rounded-lg px-4 py-2 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Add your thoughts..."
                value={commentInput[review.id] || ""}
                onChange={(e) => handleCommentChange(review.id, e.target.value)}
              />
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                onClick={() => handleAddComment(review.id)}
              >
                <BsChatDots />
              </button>
            </div>
          )}

          {/* Comment List */}

          <div className="space-y-4">
            {review.Comment?.length > 0 && (
              <div className="mt-6">
                <h4 className="text-gray-400 font-semibold text-sm mb-3 uppercase tracking-wide">
                  {review.Comment.length} Comment
                  {review.Comment.length > 1 && "s"}
                </h4>

                <div className="space-y-4">
                  {review.Comment.map((comment) => {
                    const createdAt = new Date(comment.createdAt);
                    const formattedDate = createdAt.toLocaleString("default", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });

                    return (
                      <div
                        key={comment.id}
                        className="bg-[#12121c] border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-300"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-indigo-400 py-2">
                            {comment.user.email}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {formattedDate}
                          </span>
                        </div>
                        <p className="leading-snug text-gray-300">
                          {comment.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {user?.id === review.userId && review.approved === false && (
            <div className="mt-2 text-lg flex gap-6 pt-3">
              <button
                onClick={() => startEditReview(review)}
                className="text-blue-400 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteReview(review.id)}
                className="text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      <Dialog
        open={!!editingReviewId}
        onOpenChange={() => setEditingReviewId(null)}
      >
        <DialogContent className="max-w-xl p-6 bg-[#1f1d36]/90 text-white">
          <DialogHeader>
            <DialogTitle>Edit Your Review</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 cursor-pointer ${
                  star <= editRating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-500"
                }`}
                onClick={() => setEditRating(star)}
              />
            ))}
          </div>
          <textarea
            value={editInputText}
            onChange={(e) => setEditInputText(e.target.value)}
            className="w-full mt-4 p-3 rounded bg-[#2a2a40] border border-gray-600 text-white"
            rows={4}
          />
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setEditingReviewId(null)}
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateReview}
              className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

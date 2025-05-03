import { useAddCommentMutation } from "@/features/comments/commentsApi";
import { useToggleLikeMutation } from "@/features/likes/likesApi";
import { RootState } from "@/store";
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
}

interface MovieReviewsProps {
  reviews: Review[];
}

export default function MovieReviews({ reviews }: MovieReviewsProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [commentInput, setCommentInput] = useState<Record<number, string>>({});
  const [addComment] = useAddCommentMutation();
  const [toggleLike] = useToggleLikeMutation();

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

  return (
    <section className="mt-16 space-y-8 px-4 sm:px-0">
      <h2 className="text-3xl font-bold text-white border-b border-gray-600 pb-2 tracking-wide">
        🎥 Audience Reviews
      </h2>

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
        </div>
      ))}
    </section>
  );
}

"use client";

import { AdminProtection } from "@/components/auth/Protection";
import {
  useApproveReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
} from "@/features/reviews/reviewsApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

function AdminReviewsPage() {
  const { data: reviews, isLoading, isError } = useGetAllReviewsQuery(null);
  const [approveReview] = useApproveReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const handleApprove = async (id: number) => {
    try {
      await approveReview(id).unwrap();
    } catch (err) {
      console.error("Failed to approve review:", err);
    }
  };

  const handleUnpublish = async (id: number) => {
    try {
      await deleteReview(id).unwrap();
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 pt-20 mb-40">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Manage All Reviews
      </h1>

      {isLoading ? (
        <p className="text-center text-lg">Loading all reviews...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load reviews.</p>
      ) : !reviews?.length ? (
        <p className="text-center">No reviews found.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review: any) => (
            <Card key={review.id} className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-semibold">
                      {review.user?.email || "Unknown user"} reviewed{" "}
                      <strong>{review.movie?.title}</strong>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(review.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Movie preview */}
                {review.movie && (
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    <Image
                      src={review?.movie?.accessUrl || "/thumbnail.jpg"}
                      alt={review.movie.title}
                      width={100}
                      height={150}
                      className="rounded-md object-cover"
                    />
                    <div className="text-md space-y-2">
                      <p className="line-clamp-3">
                        {review.movie.synopsis}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Directed by: <strong>{review.movie.director}</strong> (
                        {review.movie.releaseYear})
                      </p>
                    </div>
                  </div>
                )}

                {/* Review content */}
                <div className="border-l-4 pl-4 border-primary italic text-lg py-3">
                  “{review.text}”
                </div>

                <div className="flex items-center gap-6 text-lg text-muted-foreground flex-wrap my-3">
                  <span>⭐ Rating: {review.rating}/10</span>
                  {review.spoiler && (
                    <span className="text-red-500 font-medium">
                      ⚠️ Spoiler Alert
                    </span>
                  )}
                  <span>👍 Likes: {review.ReviewLike?.length || 0}</span>
                  <span>💬 Comments: {review.Comment?.length || 0}</span>
                  <span>
                    Status:{" "}
                    {review.approved ? (
                      <span className="text-green-600 font-medium">
                        Approved
                      </span>
                    ) : (
                      <span className="text-orange-500 font-medium">
                        Pending
                      </span>
                    )}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 my-4 cursor-pointer">
                  {!review.approved ? (
                    <Button
                      onClick={() => handleApprove(review.id)}
                      size="lg"
                    >
                      <Check className="w-4 h-4 mr-1" /> Approve
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleUnpublish(review.id)}
                      size="lg"
                      variant="destructive"
                    >
                      <X className="w-4 h-4 mr-1" /> Unpublish
                    </Button>
                  )}
                </div>

                {/* Comments Section */}
                {review.Comment?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-semibold mb-2">Comments:</h4>
                    <ul className="list-disc list-inside space-y-1 text-md text-muted-foreground">
                      {review.Comment.map((comment: any, index: number) => (
                        <li key={index}>{comment.text}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProtection(AdminReviewsPage);

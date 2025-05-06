"use client";

import Loading from "@/app/loading";
import { UserProtection } from "@/components/auth/Protection";
import MovieReviews from "@/components/movie/movieReviews";
import { useGetUserReviewsQuery } from "@/features/reviews/reviewsApi";


function MyReviewsPage() {
  const { data: reviews, isLoading, isError } = useGetUserReviewsQuery(null);

  return (
    <div className="max-w-6xl mx-auto p-4 pt-20 mb-40">
      <h1 className="text-3xl font-bold text-center md:text-left mb-6">
        Your Reviews
      </h1>

      {isLoading ? (
        <Loading/>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load reviews.</p>
      ) : !reviews?.length ? (
        <p className="text-center text-gray-500">You haven't written any reviews yet.</p>
      ) : (
        <MovieReviews reviews={reviews} />
      )}
    </div>
  );
}

export default UserProtection(MyReviewsPage);

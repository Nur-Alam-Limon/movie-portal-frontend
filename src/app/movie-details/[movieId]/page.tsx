"use client";

import { Button } from "@/components/ui/button";
import { useGetMovieByIdQuery } from "@/features/movies/moviesApi";
import { useState } from "react";
import MovieReviews from "@/components/movie/movieReviews";
import { useInitiatePaymentMutation } from "@/features/payment/paymentApi"; // Import payment API mutation
import { toast } from "react-hot-toast";
import { BsCalendarDate, BsCameraReels, BsCurrencyDollar, BsFilm, BsPeople, BsPerson, BsTags } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

interface MovieDetailsProps {
  params: { movieId: string };
}

interface Comment {
  id: number;
  text: string;
}

export default function MovieDetailsPage({ params }: MovieDetailsProps) {
  const { movieId } = params;
  const { data: movie, isLoading } = useGetMovieByIdQuery(movieId);
  const user = useSelector((state: RootState) => state.auth.user);

  console.log('movie', movie)

  const [likes, setLikes] = useState<{ [reviewId: number]: boolean }>({});
  const [comments, setComments] = useState<{ [reviewId: number]: Comment[] }>(
    {}
  );
  const [newComment, setNewComment] = useState<{ [reviewId: number]: string }>(
    {}
  );

  const router = useRouter();

  // Payment API hook
  const [initiatePayment] = useInitiatePaymentMutation();

  if (isLoading)
    return <p className="text-center mt-10 text-white">Loading...</p>;
  if (!movie)
    return <p className="text-center mt-10 text-white">No movie found</p>;

  const handleRentNow = async () => {
    try {
      if(!user) router.push("/login");
      const tranId = `TRX-${Date.now()}`;
  
      const response = await initiatePayment({
        total_amount: movie.priceBuy,
        tran_id: tranId,
        movieID: parseInt(movieId),
        userID: user?.id, // Make sure user is available in your context
        accessType: "RENT",
        customer: {
          name: "User",
          email: user?.email,
          phone: "01700000000", // fallback if phone is optional
          address: "Dhaka",
        },
      }).unwrap();

      if (response.GatewayPageURL) {
        window.location.href = response.GatewayPageURL;
        toast.success("Payment initiated successfully! Redirecting...", {
          duration: 3000,
        });
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("An error occurred while initiating payment.");
    }
  };

  const handleBuyNow = async () => {
    try {
      if(!user) router.push("/login");
      const tranId = `TRX-${Date.now()}`;
  
      const response = await initiatePayment({
        total_amount: movie.priceBuy,
        tran_id: tranId,
        movieID: parseInt(movieId),
        userID: user?.id, // Make sure user is available in your context
        accessType: "BUY",
        customer: {
          name: "User",
          email: user?.email,
          phone: "01700000000", // fallback if phone is optional
          address: "Dhaka",
        },
      }).unwrap();
  
      if (response.GatewayPageURL) {
        toast.success("Redirecting to payment...", { duration: 3000 });
        window.location.href = response.GatewayPageURL;
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("An error occurred while initiating payment.");
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto px-12 py-24 text-white">
      {/* Hero */}
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

      {/* Basic Info */}
      <div className="flex flex-col justify-end pb-6 mt-8">
        <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
        <p className="text-gray-300 max-w-2xl">{movie.synopsis}</p>
      </div>

      {/* Movie Info */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="space-y-4 text-md text-gray-300">
          <div className="flex items-center gap-2">
            <BsCalendarDate />
            <span>
              <strong>Release Year:</strong> {movie.releaseYear}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsPerson />
            <span>
              <strong>Director:</strong> {movie.director}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsCameraReels />
            <span>
              <strong>Genres:</strong> {movie.genres.join(", ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsPeople />
            <span>
              <strong>Cast:</strong> {movie.cast.join(", ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsFilm />
            <span>
              <strong>Streaming On:</strong>{" "}
              {movie.streamingLinks.join(", ") || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsCurrencyDollar />
            <span>
              <strong>Rent:</strong> ${movie.priceRent.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsCurrencyDollar />
            <span>
              <strong>Buy:</strong> ${movie.priceBuy.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsTags />
            <span>
              <strong>Discount:</strong> {movie.discount}%
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col justify-center items-start gap-4">
          <Button
            className="w-full bg-blue-400 hover:bg-blue-500 text-white text-lg px-6 py-6 rounded-md cursor-pointer"
            onClick={handleRentNow}
          >
            Rent Now for ${movie.priceRent.toFixed(2)}
          </Button>
          <Button
            className="w-full bg-[#2C2A4A] hover:bg-[#2C2A4A] text-white text-lg px-6 py-6 rounded-md cursor-pointer"
            onClick={handleBuyNow}
          >
            Buy Now for ${movie.priceBuy.toFixed(2)}
          </Button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20">
        <MovieReviews reviews={movie.reviews} />
      </div>
    </div>
  );
}

// @ts-ignore
"use client";

import Loading from "@/app/loading";
import MovieReviews from "@/components/movie/movieReviews";
import { Button } from "@/components/ui/button";
import { useGetMovieByIdQuery } from "@/features/movies/moviesApi";
import { useInitiatePaymentMutation } from "@/features/payment/paymentApi";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { use } from "react";
// Import payment API mutation
import { toast } from "react-hot-toast";
import {
  BsCalendarDate,
  BsCameraReels,
  BsCurrencyDollar,
  BsFilm,
  BsPeople,
  BsPerson,
  BsTags,
} from "react-icons/bs";
import { useSelector } from "react-redux";

interface MovieDetailsProps {
  params: Promise<{ movieId: string }>;
}

const MovieDetailsPage: React.FC<MovieDetailsProps> = ({ params }) => {
  const { movieId } = use(params);
  const { data: movie, isLoading } = useGetMovieByIdQuery(movieId);
  const user = useSelector((state: RootState) => state.auth.user);

  const router = useRouter();

  // Payment API hook
  const [initiatePayment] = useInitiatePaymentMutation();

  if (isLoading) return <Loading />;
  if (!movie)
    return (
      <p className="min-h-screen text-center mt-10 text-white">
        No movie found
      </p>
    );

  const handleRentNow = async () => {
    try {
      if (!user) router.push("/login");
      const tranId = `TRX-${Date.now()}`;

      const response = await initiatePayment({
        total_amount: movie.priceBuy,
        tran_id: tranId,
        movieID: parseInt(movieId),
        userID: user?.id,
        accessType: "RENT",
        customer: {
          name: "User",
          email: user?.email,
          phone: "01700000000",
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
      if (!user) router.push("/login");
      const tranId = `TRX-${Date.now()}`;

      const response = await initiatePayment({
        total_amount: movie.priceBuy,
        tran_id: tranId,
        movieID: parseInt(movieId),
        userID: user?.id,
        accessType: "BUY",
        customer: {
          name: "User",
          email: user?.email,
          phone: "01700000000",
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

  const hasAccess = movie.MovieAccess?.some(
    (access: any) => access.userId == user?.id
  );

  const userAccess = movie.MovieAccess?.find(
    (access: any) => access.userId == user?.id
  );

  return (
    <div className="max-w-6xl mx-auto px-12 py-24 text-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
        <img
          src={
            movie?.accessUrl ||
            "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1600&q=80"
          }
          alt="Movie"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Basic Info */}
      <div className="flex flex-col justify-end pb-6 mt-8">
        <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
        <p className="text-gray-300 max-w-2xl">{movie.synopsis}</p>
      </div>

      {/* Movie Info */}
      <div className="mt-10 grid md:grid-cols-1 gap-6">
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

        <div className="mt-6 space-x-4">
          {hasAccess && userAccess ? (
            <a
              href={userAccess.accessLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-blue-400 hover:bg-blue-500 text-white text-lg px-6 py-6 rounded-md cursor-pointer">
                Watch Now
              </Button>
            </a>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20">
        <MovieReviews reviews={movie.reviews} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;

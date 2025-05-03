"use client";

import { UserProtection } from "@/components/auth/Protection";
import { useGetUserTransactionsQuery } from "@/features/payment/paymentApi";
import {
  BsCalendarDate,
  BsCameraReels,
  BsCurrencyDollar,
  BsFilm,
  BsPeople,
  BsPerson,
  BsTags,
} from "react-icons/bs";

function PurchaseHistoryPage() {
  const { data, isLoading, isError } = useGetUserTransactionsQuery(null);

  console.log("Payment Data", data);

  return (
    <div className="max-w-6xl mx-auto p-4 pt-20 mb-40">
      <h1 className="text-3xl font-bold text-center md:text-left mb-6">
        Purchase History
      </h1>

      {isLoading ? (
        <p className="text-center text-lg">Loading your purchases...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load purchases.</p>
      ) : data?.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          You haven’t made any purchases yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.map((txn: any) => (
            <div
              key={txn.id}
              className="border rounded-xl p-6 shadow-lg bg-[#2C2A4A] hover:shadow-xl transition duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-400">
                  {txn.movie?.title || "Product Name"}
                </h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    txn.status === "SUCCESS"
                      ? "bg-green-100 text-green-600"
                      : txn.status === "FAILED"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {txn.status}
                </span>
              </div>

              <div className="flex items-center mb-4">
                <img
                  src={txn.movie?.accessUrl || "/thumbnail.jpg"}
                  alt={txn.movie?.title || "Product Image"}
                  className="w-36 h-48 object-cover rounded-md mr-4"
                />
                <div className="space-y-3">
                  <p className="text-md text-white flex items-center">
                    
                    <span className="font-medium">Transaction ID:</span>{" "}
                    {txn.tranId}
                  </p>
                  <p className="text-sm text-white flex items-center">
                    
                    <span className="font-medium">Amount:</span> ৳
                    {txn.totalAmount}
                  </p>
                  <p className="text-sm text-white flex items-center">
                    
                    <span className="font-medium">Payment Method:</span>{" "}
                    SSLCommerz
                  </p>
                  <p className="text-md text-white flex items-center">
                    <BsCalendarDate className="mr-2" />
                    
                    {new Date(txn.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>

              <div className="text-md text-white mt-4">
                {txn.movie && (
                  <div className="space-y-3">
                    <p className="font-medium text-blue-400 flex items-center">
                      <BsFilm className="mr-2" />
                      Movie Details:
                    </p>
                    <p className="flex items-center">
                      <BsTags className="mr-2" />
                      
                      {txn.movie.genres.join(", ")}
                    </p>
                    <p className="flex items-center">
                      <BsPeople className="mr-2" />
                      
                      {txn.movie.cast.join(", ")}
                    </p>
                    <p className="flex items-center">
                      <BsCalendarDate className="mr-2" />
                      
                      {txn.movie.releaseYear}
                    </p>
                    <p className="flex items-start">
                      <BsFilm className="mr-2 mt-1" />
                      
                      {txn.movie.synopsis}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProtection(PurchaseHistoryPage);

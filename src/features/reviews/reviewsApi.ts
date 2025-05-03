import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../../lib/baseApi';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery,
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (data) => ({
        url: '/reviews',
        method: 'POST',
        body: data,
      }),
    }),
    updateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
    }),
    approveReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}/approve`,
        method: 'PATCH',
      }),
    }),
    getUserReviews: builder.query({
      query: () => ({
        url: '/reviews/user',
        method: 'GET',
      }),
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: '/reviews/all',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useApproveReviewMutation,
  useGetUserReviewsQuery,
  useGetAllReviewsQuery,
} = reviewsApi;

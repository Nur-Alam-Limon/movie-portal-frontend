import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../lib/baseApi';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery,
  endpoints: (builder) => ({
    addComment: builder.mutation({ query: (data) => ({ url: '/comments', method: 'POST', body: data }) }),
    getCommentsByReviewId: builder.query({ query: (reviewId) => `/comments/${reviewId}` }),
  }),
});

export const {
  useAddCommentMutation,
  useGetCommentsByReviewIdQuery,
} = commentsApi;

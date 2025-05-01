import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../lib/baseApi';

export const likesApi = createApi({
  reducerPath: 'likesApi',
  baseQuery,
  endpoints: (builder) => ({
    toggleLike: builder.mutation({ query: (reviewId) => ({ url: `/likes/${reviewId}`, method: 'POST' }) }),
  }),
});

export const { useToggleLikeMutation } = likesApi;

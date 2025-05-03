import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../../lib/baseApi';

export const watchlistApi = createApi({
  reducerPath: 'watchlistApi',
  baseQuery,
  endpoints: (builder) => ({
    toggleWatchlist: builder.mutation({ query: (movieId) => ({ url: `/watchlist/${movieId}`, method: 'POST' }) }),
    getMyWatchlist: builder.query({ query: () => '/watchlist' }),
  }),
});

export const {
  useToggleWatchlistMutation,
  useGetMyWatchlistQuery,
} = watchlistApi;

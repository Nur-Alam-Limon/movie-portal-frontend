import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../lib/baseApi';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery,
  endpoints: (builder) => ({
    getAllMovies: builder.query({ query: () => '/movies' }),
    getMovieById: builder.query({ query: (id) => `/movies/${id}` }),
    searchMovies: builder.query({ query: (term) => `/movies/search?query=${term}` }),
    addMovie: builder.mutation({ query: (data) => ({ url: '/movies', method: 'POST', body: data }) }),
    updateMovie: builder.mutation({ query: ({ id, data }) => ({ url: `/movies/${id}`, method: 'PUT', body: data }) }),
    deleteMovie: builder.mutation({ query: (id) => ({ url: `/movies/${id}`, method: 'DELETE' }) }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useGetMovieByIdQuery,
  useSearchMoviesQuery,
  useAddMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = moviesApi;

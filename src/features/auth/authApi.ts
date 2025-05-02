import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../../lib/baseApi'; // Ensure correct path

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshMutation } = authApi;

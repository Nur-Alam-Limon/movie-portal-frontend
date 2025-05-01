import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../lib/baseApi';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery,
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => '/admin/dashboard',
    }),
  }),
});

export const { useGetDashboardQuery } = adminApi;

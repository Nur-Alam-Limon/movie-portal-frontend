import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../../lib/baseApi';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery,
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (data) => ({
        url: '/payments/initiate-payment',
        method: 'POST',
        body: data,
      }),
    }),
    paymentSuccessCallback: builder.mutation({
      query: (tranId) => ({
        url: `/payments/ssl/success/${tranId}`,
        method: 'POST',
      }),
    }),
    paymentFailCallback: builder.mutation({
      query: (data) => ({
        url: `/payments/ssl/fail`,
        method: 'POST',
        body: data,
      }),
    }),
    paymentCancelCallback: builder.mutation({
      query: (data) => ({
        url: `/payments/ssl/cancel`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useInitiatePaymentMutation,
  usePaymentSuccessCallbackMutation,
  usePaymentFailCallbackMutation,
  usePaymentCancelCallbackMutation,
} = paymentApi;

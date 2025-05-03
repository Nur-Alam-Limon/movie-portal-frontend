import { setCredentials } from "@/features/auth/authSlice";
import { RootState } from "@/store";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;
  const token = state.auth?.token;
  const headers = new Headers();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const result = await fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BACKEND_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  if (result.error?.status === 401) {
    try {
      // Try to refresh the access token
      const refreshTokenResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/auth/refresh`,
        {
          method: "POST",
          credentials: "include", 
        }
      );

      if (refreshTokenResponse.ok) {
        const { accessToken } = await refreshTokenResponse.json();

        // Store the new access token in Redux state
        api.dispatch(
          setCredentials({ user: state.auth?.user, token: accessToken })
        );

        // Retry the failed request with the new access token
        const retryResult = await fetchBaseQuery({
          baseUrl: process.env.NEXT_PUBLIC_API_BACKEND_URL,
          prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${accessToken}`);
            return headers;
          },
        })(args, api, extraOptions);

        return retryResult;
      } else {
        throw new Error("Unable to refresh token");
      }
    } catch (err) {
      console.error("Token refresh failed", err);
      throw new Error("Token refresh failed");
    }
  }

  return result;
};

export default baseQuery;

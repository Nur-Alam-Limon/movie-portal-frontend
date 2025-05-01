
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import authReducer from '../features/auth/authSlice';
import { adminApi } from '../features/admin/adminApi';
import { moviesApi } from '../features/movies/moviesApi';
import { reviewsApi } from '../features/reviews/reviewsApi';
import { commentsApi } from '../features/comments/commentsApi';
import { likesApi } from '../features/likes/likesApi';
import { watchlistApi } from '../features/watchlist/watchlistApi';
import { paymentApi } from '../features/payment/paymentApi';

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [likesApi.reducerPath]: likesApi.reducer,
    [watchlistApi.reducerPath]: watchlistApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      adminApi.middleware,
      moviesApi.middleware,
      reviewsApi.middleware,
      commentsApi.middleware,
      likesApi.middleware,
      watchlistApi.middleware,
      paymentApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

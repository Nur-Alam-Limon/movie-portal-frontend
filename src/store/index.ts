import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer, persistStore } from 'redux-persist';

import { authApi } from '../features/auth/authApi';
import authReducer from '../features/auth/authSlice';
import omdbReducer from '../features/omdb/omdbSlice'
import { adminApi } from '../features/admin/adminApi';
import { moviesApi } from '../features/movies/moviesApi';
import { reviewsApi } from '../features/reviews/reviewsApi';
import { commentsApi } from '../features/comments/commentsApi';
import { likesApi } from '../features/likes/likesApi';
import { watchlistApi } from '../features/watchlist/watchlistApi';
import { paymentApi } from '../features/payment/paymentApi';

// Persist config 
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  omdb: omdbReducer,
  [authApi.reducerPath]: authApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [moviesApi.reducerPath]: moviesApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
  [likesApi.reducerPath]: likesApi.reducer,
  [watchlistApi.reducerPath]: watchlistApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }).concat(
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

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchMoviesFromOMDb, fetchMovieDetailsByTitle } from "@/lib/omdbApi";

interface OmdbMovie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  [key: string]: any;
}

interface OmdbState {
  searchResults: OmdbMovie[];
  selectedMovie: OmdbMovie | null;
  loading: boolean;
  error: string | null;
}

const initialState: OmdbState = {
  searchResults: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

// Fetch 6 movies for search
export const getOmdbSearchResults = createAsyncThunk(
  "omdb/searchMovies",
  async (searchTerm: string, thunkAPI) => {
    try {
      const results = await searchMoviesFromOMDb(searchTerm);
      return results;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch detailed movie info by title
export const getOmdbMovieDetails = createAsyncThunk(
  "omdb/fetchMovieDetails",
  async (title: string, thunkAPI) => {
    try {
      const movie = await fetchMovieDetailsByTitle(title);
      return movie;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const omdbSlice = createSlice({
  name: "omdb",
  initialState,
  reducers: {
    clearMovie: (state) => {
      state.searchResults = [];
      state.selectedMovie = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOmdbSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOmdbSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.Search?.slice(0, 6) || [];
      })
      .addCase(getOmdbSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getOmdbMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOmdbMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(getOmdbMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMovie } = omdbSlice.actions;
export default omdbSlice.reducer;

"use client";

import EditMovieForm from "@/components/admin/EditMovieForm";
import { AdminProtection } from "@/components/auth/Protection";
import MovieCard from "@/components/movie/MovieCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useAddMovieMutation,
  useDeleteMovieMutation,
  useGetAllMoviesQuery,
  useUpdateMovieMutation,
} from "@/features/movies/moviesApi";
import { getOmdbSearchResults, getOmdbMovieDetails } from "@/features/omdb/omdbSlice";
import { AppDispatch, RootState } from "@/store";
import axios from "axios";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MoviesPage() {
  const { data: movies, isLoading, refetch } = useGetAllMoviesQuery(null);
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults , loading, error } = useSelector(
    (state: RootState) => state.omdb
  );

  console.log("Omdb Movies", searchResults);
  console.log("Movie", movies)

  const [addMovie] = useAddMovieMutation();
  const [updateMovie] = useUpdateMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  const [editMovie, setEditMovie] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); // empty query for initial search

  // On searchTerm change
  useEffect(() => {
    if (searchTerm) {
      dispatch(getOmdbSearchResults(searchTerm)); // Fetch movies based on search term
    }
  }, [searchTerm, dispatch]);

  const handleAdd = async (movieData: any) => {
    await addMovie(movieData);
    setIsModalOpen(false);
    refetch();
  };

  const handleAddFromOmdb = async (title: string) => {
  
    const action = await dispatch(getOmdbMovieDetails(title));
    if (getOmdbMovieDetails.fulfilled.match(action)) {
      const movie = action.payload;
      console.log("Movie123", movie);
  
      const payload = {
        title: movie.Title,
        synopsis: movie.Plot,
        genres: movie.Genre?.split(",").map((g: string) => g.trim()) || [],
        releaseYear: Number(movie.Year),
        director: movie.Director,
        cast: movie.Actors?.split(",").map((a: string) => a.trim()) || [],
        streamingLinks: [], // You might want to let the user input this
        accessUrl: movie.Poster,
        priceBuy: 50, // Default or user input
        priceRent: 30, // Default or user input
        discount: 0, // Default or user input
      };
  
      console.log("Creating with payload:", payload);
  
      // Now send `payload` to your API to create the record
      await addMovie(payload);
      refetch();
    } else {
      console.error("Failed to fetch movie details");
    }
  };

  const handleUpdate = async (movieData: any) => {
    if (editMovie) {
      await updateMovie({ id: editMovie.id, data: movieData });
      setEditMovie(null);
      refetch();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteMovie(id);
    refetch();
  };

  return (
    <div className="p-6 mx-auto space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movies</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Movie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Movie</DialogTitle>
              <DialogDescription>Enter movie details below.</DialogDescription>
            </DialogHeader>
            <EditMovieForm onSubmit={handleAdd} initialData={null} />
          </DialogContent>
        </Dialog>
      </div>

      {/* OMDB Movie Search */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold pb-2 pt-8">Browse movies from OMDB and then add easily from there.</h2>
        <Input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-12"
        />

        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin w-6 h-6" />
          </div>
        ) : error ? (
          <div className="text-red-500">Error fetching movies: {error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchResults.map((movie: any) => (
              <div
                key={movie.imdbID}
                className="bg-[#1e1e2e] rounded-lg p-4 space-y-2 shadow"
              >
                <img
                  src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/thumbnail.jpg" }
                  alt={movie.Title}
                  className="w-full h-64 object-cover rounded"
                />
                <h3 className="text-lg font-bold line-clamp-1">{movie.Title}</h3>
                <h3 className="text-md line-clamp-1 text-gray-400">{movie.Type}</h3>
                <p className="text-sm text-gray-400">{movie.Year}</p>
                <Button
                  variant="default"
                  onClick={() => handleAddFromOmdb(movie?.Title)}
                >
                  Add to DB
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Existing DB Movies */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Existing Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies?.map((movie: any) => (
            <div
              key={movie.id}
              className="bg-[#2C2A4A] p-2 rounded-lg shadow-md space-y-3"
            >
              <MovieCard movie={movie} />

              <div className="flex justify-between px-4 py-2 rounded-md w-full">
                <div className="flex items-center">
                  <Dialog
                    open={editMovie?.id === movie.id}
                    onOpenChange={() => setEditMovie(null)}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Movie</DialogTitle>
                        <DialogDescription>
                          Modify movie details below.
                        </DialogDescription>
                      </DialogHeader>
                      <EditMovieForm
                        initialData={movie}
                        onSubmit={handleUpdate}
                      />
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditMovie(movie)}
                    className="flex items-center space-x-1"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>Edit</span>
                  </Button>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(movie.id)}
                  className="flex items-center space-x-1"
                >
                  <Trash2 className="w-4 h-4 " />
                  <span>Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProtection(MoviesPage);

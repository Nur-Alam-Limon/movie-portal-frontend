// pages/movies.tsx

"use client";

import EditMovieForm from "@/components/admin/EditMovieForm";
import MovieCard from "@/components/home/MovieCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useAddMovieMutation,
  useDeleteMovieMutation,
  useGetAllMoviesQuery,
  useUpdateMovieMutation,
} from "@/features/movies/moviesApi";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function MoviesPage() {
  const { data: movies, isLoading, refetch } = useGetAllMoviesQuery(null);
  const [addMovie] = useAddMovieMutation();
  const [updateMovie] = useUpdateMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();
  const [editMovie, setEditMovie] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = async (movieData: any) => {
    await addMovie(movieData);
    setIsModalOpen(false); // Close the modal after adding a movie
    refetch(); // Refetch movies
  };

  const handleUpdate = async (movieData: any) => {
    if (editMovie) {
      await updateMovie({ id: editMovie.id, data: movieData });
      setEditMovie(null);
      refetch(); // Refetch movies after updating
    }
  };

  const handleDelete = async (id: string) => {
    await deleteMovie(id);
    refetch(); // Refetch movies after deleting
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movies</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Movie
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies?.map((movie: any) => (
          <div
            key={movie.id}
            className="bg-[#2C2A4A] p-2 rounded-lg shadow-md space-y-3"
          >
            {/* MovieCard display */}
            <MovieCard movie={movie} />

            {/* Actions Bar */}
            <div className="flex justify-between px-4 py-2 rounded-md w-full">
              {/* Edit Button */}
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
                  className="flex items-center space-x-1 cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                  <span>Edit Movie</span>
                </Button>
              </div>

              {/* Delete Button */}
              <div className="flex items-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(movie.id)}
                  className="flex items-center space-x-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 " />
                  <span>Delete Movie</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

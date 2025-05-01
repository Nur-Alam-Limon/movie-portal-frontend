"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddMovieMutation,
  useDeleteMovieMutation,
  useGetAllMoviesQuery,
  useUpdateMovieMutation,
} from "@/features/movies/moviesApi";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

type MovieFormProps = {
  isEditing?: boolean;
  initialData?: any;
  onSubmit: (data: any) => void;
};

const MovieForm = ({ isEditing, initialData, onSubmit }: MovieFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [synopsis, setSynopsis] = useState(initialData?.synopsis || "");
  const [genres, setGenres] = useState(initialData?.genres?.join(", ") || "");
  const [releaseYear, setReleaseYear] = useState(
    initialData?.releaseYear || ""
  );
  const [director, setDirector] = useState(initialData?.director || "");
  const [cast, setCast] = useState(initialData?.cast?.join(", ") || "");
  const [streamingLinks, setStreamingLinks] = useState(
    initialData?.streamingLinks?.join(", ") || ""
  );
  const [accessUrl, setAccessUrl] = useState(initialData?.accessUrl || "");
  const [priceBuy, setPriceBuy] = useState(initialData?.priceBuy || "");
  const [priceRent, setPriceRent] = useState(initialData?.priceRent || "");
  const [discount, setDiscount] = useState(initialData?.discount || 0);

  const handleSubmit = () => {
    onSubmit({
      title,
      synopsis,
      genres: genres.split(",").map((g: any) => g.trim()),
      releaseYear: Number(releaseYear),
      director,
      cast: cast.split(",").map((c: any) => c.trim()),
      streamingLinks: streamingLinks.split(",").map((s: any) => s.trim()),
      accessUrl,
      priceBuy: parseFloat(priceBuy),
      priceRent: parseFloat(priceRent),
      discount: parseFloat(discount),
    });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Synopsis"
        value={synopsis}
        onChange={(e) => setSynopsis(e.target.value)}
      />
      <Input
        placeholder="Genres (comma separated)"
        value={genres}
        onChange={(e) => setGenres(e.target.value)}
      />
      <Input
        placeholder="Release Year"
        type="number"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
      />
      <Input
        placeholder="Director"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
      />
      <Input
        placeholder="Cast (comma separated)"
        value={cast}
        onChange={(e) => setCast(e.target.value)}
      />
      <Input
        placeholder="Streaming Links (comma separated)"
        value={streamingLinks}
        onChange={(e) => setStreamingLinks(e.target.value)}
      />
      <Input
        placeholder="Access URL"
        value={accessUrl}
        onChange={(e) => setAccessUrl(e.target.value)}
      />
      <Input
        placeholder="Price to Buy"
        type="number"
        value={priceBuy}
        onChange={(e) => setPriceBuy(e.target.value)}
      />
      <Input
        placeholder="Price to Rent"
        type="number"
        value={priceRent}
        onChange={(e) => setPriceRent(e.target.value)}
      />
      <Input
        placeholder="Discount (%)"
        type="number"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />
      <Button onClick={handleSubmit}>
        {isEditing ? "Update" : "Add"} Movie
      </Button>
    </div>
  );
};

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
    console.log("Handle Update", editMovie);
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
    <div className="p-6 max-w-7xl mx-auto">
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
            <MovieForm onSubmit={handleAdd} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies?.map((movie: any) => (
          <div key={movie.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{movie.synopsis}</p>
            <div className="text-sm text-gray-500">
              <p>
                <strong>Genres:</strong> {movie.genres?.join(", ")}
              </p>
              <p>
                <strong>Director:</strong> {movie.director}
              </p>
              <p>
                <strong>Cast:</strong> {movie.cast?.join(", ")}
              </p>
              <p>
                <strong>Streaming:</strong> {movie.streamingLinks?.join(", ")}
              </p>
              <p>
                <strong>Access URL:</strong> {movie.accessUrl}
              </p>
              <p>
                <strong>Year:</strong> {movie.releaseYear}
              </p>
              <p>
                <strong>Buy:</strong> ${movie.priceBuy} | <strong>Rent:</strong>{" "}
                ${movie.priceRent} | <strong>Discount:</strong> {movie.discount}
                %
              </p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
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
                  <MovieForm
                    isEditing
                    initialData={movie} // Pass current movie data for editing
                    onSubmit={handleUpdate}
                  />
                </DialogContent>
              </Dialog>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setEditMovie(movie)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => handleDelete(movie.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

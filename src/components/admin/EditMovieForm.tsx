"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type MovieFormProps = {
  initialData: any;
  onSubmit: (data: any) => void;
};

const EditMovieForm = ({ initialData, onSubmit }: MovieFormProps) => {
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
    <div className="space-y-4 max-h-[600px] overflow-y-auto">
      <div className="flex flex-col">
        <label className="text-sm mb-4">Title</label>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-4">Synopsis</label>
        <Textarea
          placeholder="Synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-4">Genres (comma separated)</label>
        <Input
          placeholder="Genres (comma separated)"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-4">Release Year</label>
        <Input
          placeholder="Release Year"
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-4">Director</label>
        <Input
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-4">Cast (comma separated)</label>
        <Input
          placeholder="Cast (comma separated)"
          value={cast}
          onChange={(e) => setCast(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-4">
          Streaming Links (comma separated)
        </label>
        <Input
          placeholder="Streaming Links (comma separated)"
          value={streamingLinks}
          onChange={(e) => setStreamingLinks(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-4">Access URL</label>
        <Input
          placeholder="Access URL"
          value={accessUrl}
          onChange={(e) => setAccessUrl(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-4">Price to Buy</label>
        <Input
          placeholder="Price to Buy"
          type="number"
          value={priceBuy}
          onChange={(e) => setPriceBuy(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-4">Price to Rent</label>
        <Input
          placeholder="Price to Rent"
          type="number"
          value={priceRent}
          onChange={(e) => setPriceRent(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-4">Discount (%)</label>
        <Input
          placeholder="Discount (%)"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>

      <button
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        onClick={handleSubmit}
      >
        Update Movie
      </button>
    </div>
  );
};

export default EditMovieForm;

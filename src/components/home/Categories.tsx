"use client"
import { useGetAllMoviesQuery } from '@/features/movies/moviesApi';
import { useRouter } from 'next/navigation';
import React from 'react';

const Categories: React.FC = () => {
  const { data: movies } = useGetAllMoviesQuery(null);
  
  const allGenres = Array.from(
    new Set(movies?.flatMap((movie: any) => movie.genres || []))
  ) as string[];
  const router = useRouter()
  return (
    <div className="my-12 container mx-auto text-center px-4 sm:px-8 lg:px-0">
      <h2 className="text-3xl font-bold mb-6 text-center">Browse by Genre</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {allGenres.slice(0,12)?.map((genre: any) => (
          <div
            onClick={()=>router.push(`/browse-movies?genre=${genre}`)}
            key={genre}
            className="bg-slate-100 p-3 rounded-lg shadow hover:bg-blue-400 cursor-pointer transition dark:text-black text-lg"
          >
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

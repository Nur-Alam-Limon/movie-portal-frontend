const OMDB_API_KEY = "2fbdec00";

// Search by keyword (returns multiple)
export async function searchMoviesFromOMDb(searchTerm: string) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(searchTerm)}`);
  const data = await res.json();
  console.log("datya", data);
  if (data.Response === "False") throw new Error(data.Error);
  return data; 
}

// Fetch full details by title
export async function fetchMovieDetailsByTitle(title: string) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`);
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error);
  return data;
}

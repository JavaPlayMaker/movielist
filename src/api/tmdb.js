const DEFAULT_BASE_URL = "https://api.themoviedb.org/3";

function resolveApiKey() {
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_TMDB_API_KEY) {
    return import.meta.env.VITE_TMDB_API_KEY;
  }

  if (typeof process !== "undefined" && process.env?.TMDB_API_KEY) {
    return process.env.TMDB_API_KEY;
  }

  if (typeof window !== "undefined" && window.TMDB_API_KEY) {
    return window.TMDB_API_KEY;
  }

  throw new Error(
    "Missing TMDB API key. Set VITE_TMDB_API_KEY in .env (for Vite) or TMDB_API_KEY in server env."
  );
}

function resolveBaseUrl() {
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_TMDB_BASE_URL) {
    return import.meta.env.VITE_TMDB_BASE_URL;
  }

  if (typeof process !== "undefined" && process.env?.TMDB_BASE_URL) {
    return process.env.TMDB_BASE_URL;
  }

  return DEFAULT_BASE_URL;
}

export async function fetchPopularMovies(page = 1) {
  const apiKey = resolveApiKey();
  const baseUrl = resolveBaseUrl();

  const url = new URL(`${baseUrl}/movie/popular`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("page", String(page));

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status})`);
  }

  const data = await response.json();
  return Array.isArray(data.results) ? data.results : [];
}

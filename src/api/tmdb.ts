import type { TmdbGenre, TmdbMovie, TmdbPaginatedResponse } from "../types/tmdb";

const DEFAULT_BASE_URL = "https://api.themoviedb.org/3";

function resolveApiKey(): string {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_TMDB_API_KEY in .env");
  }

  return apiKey;
}

function resolveBaseUrl(): string {
  return import.meta.env.VITE_TMDB_BASE_URL ?? DEFAULT_BASE_URL;
}

async function request<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const baseUrl = resolveBaseUrl();
  const apiKey = resolveApiKey();

  const url = new URL(`${baseUrl}${path}`);
  url.searchParams.set("api_key", apiKey);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

export async function fetchGenres(): Promise<TmdbGenre[]> {
  const data = await request<{ genres: TmdbGenre[] }>("/genre/movie/list");
  return Array.isArray(data.genres) ? data.genres : [];
}

interface DiscoverOptions {
  page?: number;
  genreId?: number | null;
}

export async function fetchPopularMovies(options: DiscoverOptions = {}): Promise<TmdbPaginatedResponse<TmdbMovie>> {
  const { page = 1, genreId } = options;
  const params: Record<string, string> = { page: String(page) };

  if (genreId) {
    params.with_genres = String(genreId);
  }

  return request<TmdbPaginatedResponse<TmdbMovie>>("/discover/movie", params);
}

interface SearchOptions {
  query: string;
  page?: number;
}

export async function searchMovies(options: SearchOptions): Promise<TmdbPaginatedResponse<TmdbMovie>> {
  const { query, page = 1 } = options;

  return request<TmdbPaginatedResponse<TmdbMovie>>("/search/movie", {
    query,
    page: String(page),
    include_adult: "false"
  });
}

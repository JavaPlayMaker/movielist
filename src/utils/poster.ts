const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_POSTER = "https://placehold.co/500x750?text=No+Poster";

export function buildPosterUrl(path: string | null): string {
  if (!path) {
    return FALLBACK_POSTER;
  }

  return `${IMAGE_BASE_URL}${path}`;
}

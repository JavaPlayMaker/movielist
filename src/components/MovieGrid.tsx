import type { TmdbMovie } from "../types/tmdb";
import { buildPosterUrl } from "../utils/poster";

interface MovieGridProps {
  movies: TmdbMovie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  if (!movies.length) {
    return <p className="status">No movies found.</p>;
  }

  return (
    <section className="movie-grid" aria-live="polite">
      {movies.map((movie) => {
        const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
        const rating = Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : "N/A";

        return (
          <article key={movie.id} className="movie-card">
            <img src={buildPosterUrl(movie.poster_path)} alt={`${movie.title} poster`} loading="lazy" />
            <div className="movie-card-body">
              <h2>{movie.title || "Untitled"}</h2>
              <p>Release: {releaseYear}</p>
              <p>Rating: {rating}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

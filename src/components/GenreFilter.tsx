import type { TmdbGenre } from "../types/tmdb";

interface GenreFilterProps {
  genres: TmdbGenre[];
  selectedGenreId: number | null;
  onChange: (genreId: number | null) => void;
}

export function GenreFilter({ genres, selectedGenreId, onChange }: GenreFilterProps) {
  return (
    <div className="genre-list" aria-label="Movie genres">
      <button
        className={selectedGenreId === null ? "active" : ""}
        onClick={() => onChange(null)}
        type="button"
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={selectedGenreId === genre.id ? "active" : ""}
          onClick={() => onChange(genre.id)}
          type="button"
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

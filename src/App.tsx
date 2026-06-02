import { useEffect, useMemo, useState } from "react";
import { GenreFilter } from "./components/GenreFilter";
import { MovieGrid } from "./components/MovieGrid";
import { SearchBar } from "./components/SearchBar";
import Footer from "./components/Footer";
import { fetchGenres, fetchPopularMovies, searchMovies } from "./api/tmdb";
import type { TmdbGenre, TmdbMovie } from "./types/tmdb";

function App() {
  const [genres, setGenres] = useState<TmdbGenre[]>([]);
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const headerSubTitle = useMemo(() => {
    if (query) {
      return `Search results for \"${query}\"`;
    }

    return "Popular movies from TMDB";
  }, [query]);

  useEffect(() => {
    let isMounted = true;

    fetchGenres()
      .then((items) => {
        if (isMounted) {
          setGenres(items);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load genres");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadMovies() {
      setIsLoading(true);
      setError(null);

      try {
        const response = query
          ? await searchMovies({ query, page })
          : await fetchPopularMovies({ page, genreId: selectedGenreId });

        if (isMounted) {
          setMovies(Array.isArray(response.results) ? response.results : []);
          setTotalPages(Math.max(1, Math.min(response.total_pages || 1, 500)));
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load movies");
          setMovies([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, [query, page, selectedGenreId]);

  function handleGenreChange(genreId: number | null) {
    setSelectedGenreId(genreId);
    setQuery("");
    setPage(1);
  }

  function handleSearch(nextQuery: string) {
    setQuery(nextQuery);
    setSelectedGenreId(null);
    setPage(1);
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>MovieList</h1>
        <p>{headerSubTitle}</p>
      </header>

      <SearchBar onSearch={handleSearch} initialValue={query} />

      <GenreFilter genres={genres} selectedGenreId={selectedGenreId} onChange={handleGenreChange} />

      {isLoading ? <p className="status">Loading movies...</p> : null}
      {error ? <p className="status error">{error}</p> : null}
      {!isLoading && !error ? <MovieGrid movies={movies} /> : null}

      <footer className="pagination" aria-label="Pagination controls">
        <button type="button" disabled={page <= 1 || isLoading} onClick={() => setPage((prev) => prev - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages || isLoading}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </footer>
      <Footer />
    </main>
  );
}

export default App;

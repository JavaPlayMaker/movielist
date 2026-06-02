import "./styles/main.css";
import { fetchPopularMovies } from "./api/tmdb.js";
import { renderMovies } from "./pages/home.js";

async function bootstrap() {
  const moviesEl = document.getElementById("movies");
  const statusEl = document.getElementById("status");

  if (!moviesEl || !statusEl) {
    return;
  }

  statusEl.textContent = "Loading movies...";

  try {
    const movies = await fetchPopularMovies();
    renderMovies(moviesEl, movies);
    statusEl.textContent = `Loaded ${movies.length} movies.`;
  } catch (error) {
    statusEl.textContent = "Could not load movies. Check your TMDB API key and network.";
    console.error(error);
  }
}

bootstrap();

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function movieCard(movie) {
  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Poster";

  const title = movie.title || "Untitled";
  const rating = typeof movie.vote_average === "number" ? movie.vote_average.toFixed(1) : "N/A";

  return `
    <article class="movie-card">
      <img src="${poster}" alt="${title} poster" loading="lazy" />
      <div class="movie-card-body">
        <h2>${title}</h2>
        <p>Rating: ${rating}</p>
      </div>
    </article>
  `;
}

export function renderMovies(container, movies) {
  if (!movies.length) {
    container.innerHTML = "<p>No movies found.</p>";
    return;
  }

  container.innerHTML = movies.map(movieCard).join("");
}

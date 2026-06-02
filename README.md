# MovieList (TMDB)

Starter movie app using TMDB with Vite.

## Setup

1. Install dependencies:

   npm install

2. Add your TMDB key in `.env`:

   VITE_TMDB_API_KEY=your_real_key
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

3. Start the app:

   npm run dev

4. Keep `.env` private. It is already ignored by `.gitignore`.

## Project Structure

- `index.html` - App entry file
- `public/` - Static assets
- `src/api/` - TMDB request logic
- `src/components/` - Reusable UI components
- `src/pages/` - Page-level views
- `src/styles/` - Global/component styles
- `src/utils/` - Helpers and utilities

## Included Starter Files

- `src/main.js` - Bootstraps loading and rendering
- `src/api/tmdb.js` - Fetches popular movies from TMDB
- `src/pages/home.js` - Renders movie cards
- `src/styles/main.css` - Basic app styling

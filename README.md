# MovieList (TMDB)

React + TypeScript movie browser using TMDB, powered by Vite and Vitest.

## Setup

1. Install dependencies:

   npm install

2. Add your TMDB key in `.env`:

   VITE_TMDB_API_KEY=your_real_key
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

3. Start the app:

   npm run dev

4. Run tests:

   npm test

5. Keep `.env` private. It is already ignored by `.gitignore`.

## Features

- Popular movie list from TMDB
- Genre filter chips
- Movie title search bar
- Pagination controls
- Loading, empty, and error states
- Typed API client with TypeScript interfaces
- Vitest unit tests

## Project Structure

- `index.html` - Root HTML shell
- `public/` - Static assets
- `src/api/` - Typed TMDB API client
- `src/components/` - Search bar, genre filter, movie grid
- `src/types/` - Shared TypeScript types
- `src/styles/` - Global/component styles
- `src/utils/` - Helpers and tests

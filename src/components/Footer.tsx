import React from "react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span>© {year} MovieList.</span>
        <span>
          Built using the TMDB API. Data provided by
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer"> TMDB</a>.
          <span> | </span>
          <a href="https://github.com/JavaPlayMaker" target="_blank" rel="noreferrer">JavaPlayMaker</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;

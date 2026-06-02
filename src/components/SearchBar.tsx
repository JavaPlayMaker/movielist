import { FormEvent, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form className="search-bar" onSubmit={submitSearch}>
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search movies by title - by JavaPlayMaker"
        aria-label="Search movies"
      />
      <button type="submit">Search</button>
      <button
        type="button"
        onClick={() => {
          setValue("");
          onSearch("");
        }}
      >
        Reset
      </button>
    </form>
  );
}

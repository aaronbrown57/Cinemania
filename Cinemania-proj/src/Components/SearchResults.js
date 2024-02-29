import React from "react";
import MovieList from "./MovieDisplays/MovieList";

const SearchResults = ({ query, movies }) => {
  if (!movies || !query) {
    return (
      <div>
        <h1>Invalid search parameters</h1>
      </div>
    );
  }

  const searchResults = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.id.toLowerCase().includes(query.toLowerCase())
  );

  if (searchResults.length === 0) {
    return (
      <div>
        <h1>No results found for "{query}"</h1>
      </div>
    );
  }

  console.log("Query:", query);
  console.log("Search Results:", searchResults);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <MovieList items={searchResults} />
    </div>
  );
};

export default SearchResults;

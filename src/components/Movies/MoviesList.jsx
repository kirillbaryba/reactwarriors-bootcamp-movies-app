import React from "react";
import MovieItem from "./MovieItem";
import MoviesHOC from "./MoviesHOC";

const MoviesList = ({ movies }) => (
  <div className="row">
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-6 mb-4">
          <MovieItem item={movie} />
        </div>
      );
    })}
  </div>
);

export default MoviesHOC(MoviesList);

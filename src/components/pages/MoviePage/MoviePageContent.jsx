import React from "react";

const MoviePageContent = props => {
  const { movie } = props;
  return (
    <div className="page-wrap mt-4 mb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="img-wrap">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${
                    movie.poster_path
                  }`}
                  alt={movie.name}
                />
              )}
            </div>
          </div>
          <div className="col-md-8">
            <h2>{movie.original_title}</h2>
            <span>({String(movie.release_date).substring(0, 4)})</span>
            <h3>Описание</h3>
            <div>{movie.overview ? movie.overview : "Нет описания"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePageContent;

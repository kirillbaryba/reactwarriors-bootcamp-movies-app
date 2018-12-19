import React from "react";
import FavoriteIcon from "../../Movies/FavoriteIcon";
import WatchlistIcon from "../../Movies/WatchlistIcon";

const MoviePageContent = props => {
  const { movie, user, session_id, toggleLoginModal,  } = props;
  return (
    <div className="page-wrap">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="img-wrap">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${
                    movie.poster_path
                  }`}
                  alt={movie.name}
                />
              ) : null}
            </div>
          </div>
          <div className="col-8">
            <h2>{movie.original_title}</h2>
            <span>({String(movie.release_date).substring(0, 4)})</span>
            <h3>Описание</h3>
            <div>{movie.overview ? movie.overview : "Нет описания"}</div>
            <FavoriteIcon
              item={movie}
              user={user}
              session_id={session_id}
              toggleLoginModal={toggleLoginModal}
            />
            <WatchlistIcon
              item={movie}
              user={user}
              session_id={session_id}
              toggleLoginModal={toggleLoginModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePageContent;

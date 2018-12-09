import React from "react";
import CallApi from "../../../api/api";
import FavoriteIcon from "../../Movies/FavoriteIcon";
import WatchlistIcon from "../../Movies/WatchlistIcon";
import AppContextHOC from "../../HOC/AppContextHOC";
import Details from "./Details";
import Videos from "./Videos";
import Credits from "./Credits";
import Loader from "react-loader-spinner";
import MoviePageTabs from "../../Movies/MoviePageTabs";
import { Route, Switch } from "react-router-dom";

class MoviePage extends React.Component {
  constructor() {
    super();

    this.state = {
      movie: "",
      isLoading: false
    };
  }

  componentDidMount() {
    const { user, session_id, getAddedMovies } = this.props;

    this.setState({ isLoading: true });

    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({ movie: data, isLoading: false });
      if (user) {
        getAddedMovies(user.id, session_id, "favorite");
        getAddedMovies(user.id, session_id, "watchlist");
      }
    });
  }

  render() {
    const { movie, isLoading } = this.state;
    const { user, session_id, toggleLoginModal } = this.props;

    if (isLoading) {
      return (
        <span className="spinner">
          <Loader type="TailSpin" color="salmon" height={80} width={80} />
        </span>
      );
    }

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
        <MoviePageTabs movie={movie} />
        <Switch>
          <Route path="/movie/:id/details" component={Details} />
          <Route path="/movie/:id/videos" component={Videos} />
          <Route path="/movie/:id/credits" component={Credits} />
        </Switch>
      </div>
    );
  }
}

export default AppContextHOC(MoviePage);

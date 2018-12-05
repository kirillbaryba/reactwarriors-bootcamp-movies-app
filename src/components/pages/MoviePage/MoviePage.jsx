import React from "react";
import CallApi from "../../../api/api";
import { Link } from "react-router-dom";
import FavoriteIcon from "../../Movies/FavoriteIcon";
import WatchlistIcon from "../../Movies/WatchlistIcon";
import AppContextHOC from "../../HOC/AppContextHOC";
import MoviesHOC from "../../Movies/MoviesHOC";

class MoviePage extends React.Component {
  constructor() {
    super();

    this.state = {
      movie: ""
    };
  }

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({ movie: data });
    });
  }

  render() {
    const { movie } = this.state;
    const { item, user, session_id, toggleLoginModal } = this.props;
    console.log(this.props);
    return (
      <div className="page-wrap">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="img-wrap">
                <img
                  src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${
                    movie.poster_path
                  }`}
                  alt={movie.name}
                />
              </div>
            </div>
            <div className="col-8">
              <Link to={`/movie/${movie.id}`}>{movie.original_title}</Link>
              <span>({String(movie.release_date).substring(0, 4)})</span>
              <h3>Описание</h3>
              <span>{movie.overview}</span>
            </div>
            <FavoriteIcon
              item={item}
              user={user}
              session_id={session_id}
              toggleLoginModal={toggleLoginModal}
            />
            <WatchlistIcon
              item={item}
              user={user}
              session_id={session_id}
              toggleLoginModal={toggleLoginModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MoviePage);

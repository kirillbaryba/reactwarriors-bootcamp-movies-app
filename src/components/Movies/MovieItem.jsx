import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "universal-cookie";
import { API_URL, API_KEY_3 } from "../../api/api";

const cookies = new Cookies();

export default class MovieItem extends React.Component {
  constructor() {
    super();

    this.state = {
      heart: false,
      bookmark: false,
      highlight: "",
      favorite: false,
      watchlist: false,
      message: {}
    };
  }

  addMovieToFavorite = (movieId, userId, favorite) => {
    const session_id = cookies.get("session_id") || null;

    this.setState({
      heart: !this.state.heart,
      favorite: !this.state.favorite
    });

    fetch(
      `${API_URL}/account/${userId}/favorite?api_key=${API_KEY_3}&session_id=${session_id}`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          favorite: favorite
        })
      }
    );
  };

  addMovieToWatchlist = (movieId, userId, watchlist) => {
    const session_id = cookies.get("session_id");

    this.setState({
      bookmark: !this.state.bookmark,
      watchlist: !this.state.watchlist,
      highlight: "red"
    });

    fetch(
      `${API_URL}/account/${userId}/watchlist?api_key=${API_KEY_3}&session_id=${session_id}`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          watchlist: watchlist
        })
      }
    )
  };

  addToFavorite = () => {
    const session_id = cookies.get("session_id") || null;
    if (session_id) {
      this.addMovieToFavorite(
        this.props.item.id,
        this.props.user.id,
        !this.state.favorite
      );
    } else {
      this.props.toggleModal();
    }
  };

  addToWatch = () => {
    const session_id = cookies.get("session_id") || null;
    if (session_id) {
      this.addMovieToWatchlist(
        this.props.item.id,
        this.props.user.id,
        !this.state.watchlist
      );
    } else {
      this.props.toggleModal();
    }
  };

  render() {
    const { item } = this.props;
    const heart = this.state.heart ? "fas" : "far";
    const bookmark = this.state.bookmark ? "fas" : "far";

    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt={item.name}
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <div className="buttons-wrap">
            <span onClick={this.addToFavorite}>
              <FontAwesomeIcon icon={[`${heart}`, "heart"]} />
            </span>
            <span onClick={this.addToWatch}>
              <FontAwesomeIcon icon={[`${bookmark}`, "bookmark"]} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

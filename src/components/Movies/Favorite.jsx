import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class Favorite extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      heart: false,
      highlight: false
    };
  }

  addMovieToFavorite = (movieId, userId, favorite, session_id) => {
    this.setState(
      {
        heart: !this.state.heart,
        favorite: !this.state.favorite,
        highlight: !this.state.highlight
      },
      () => {
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
        )
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.setState(prevState => ({
              message: {
                favorite: "Movie added to favorites"
              }
            }));
          });
      }
    );
  };

  addToFavorite = () => {
    const { user, item, session_id, toggleModal } = this.props;
    if (session_id) {
      this.addMovieToFavorite(
        item.id,
        user.id,
        !this.state.favorite,
        session_id
      );
    } else {
      toggleModal();
    }
  };

  render() {
    const heart = this.state.heart ? "fas" : "far";
    const highlight = this.state.highlight ? "red" : "";
    return (
      <span
        onClick={this.addToFavorite}
        className={`${highlight} icon-favorite`}
      >
        <FontAwesomeIcon icon={[`${heart}`, "heart"]} />
      </span>
    );
  }
}

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL, API_KEY_3 } from "../../api/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Watchlist extends React.Component {
  constructor() {
    super();

    this.state = {
      bookmark: false,
      watchlist: false,
      highlight: ""
    };
  }

  addMovieToWatchlist = (movieId, userId, watchlist) => {
    const session_id = cookies.get("session_id");

    this.setState(
      {
        bookmark: !this.state.bookmark,
        watchlist: !this.state.watchlist,
        highlight: "red"
      },
      () => {
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
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.setState({
              message: data.status_message
            });
          });
      }
    );
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
    const bookmark = this.state.bookmark ? "fas" : "far";
    const highlight = this.state.highlight ? "red" : "";
    return (
      <div>
        <span onClick={this.addToWatch} className={highlight}>
          <FontAwesomeIcon icon={[`${bookmark}`, "bookmark"]} />
        </span>
      </div>
    );
  }
}

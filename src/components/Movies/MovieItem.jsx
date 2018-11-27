import React from "react";
import Favorite from "./Favorite";
import Watchlist from "./Wathclist";


export default class MovieItem extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      watchlist: false,
      message: {}
    };
  }

  render() {
    const { item, user } = this.props;

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
            <Favorite item={item} user={user} />
            <Watchlist item={item} user={user} />
          </div>
        </div>
      </div>
    );
  }
}

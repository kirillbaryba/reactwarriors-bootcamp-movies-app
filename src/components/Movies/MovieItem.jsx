import React from "react";
import { Link } from "react-router-dom";

export default class MovieItem extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt={item.name}
        />
        <div className="card-body">
          <Link to={`/movie/${item.id}/details`} className="card-title">
            {item.title}
          </Link>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <div className="buttons-wrap" />
        </div>
      </div>
    );
  }
}

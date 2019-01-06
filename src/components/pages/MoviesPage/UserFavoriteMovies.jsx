import React from "react";
import UILoader from "../../UIComponents/UILoader";
import MovieItem from "../../Movies/MovieItem";

class UserFavoriteMovies extends React.Component {
  render() {
    const { favorite } = this.props;
    return !favorite ? (
      <UILoader />
    ) : (
      <div className="container">
        <div className="row">
          {favorite.map(item => (
            <div key={item.id} className="col-md-4">
              <MovieItem item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default UserFavoriteMovies;

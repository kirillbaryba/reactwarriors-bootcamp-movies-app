import React from "react";
import UILoader from "../../UIComponents/UILoader";
import AppContextHOC from "../../HOC/AppContextHOC";
import MovieItem from "../../Movies/MovieItem";

class UserFavoriteMovies extends React.Component {
  render() {
    const { favorite } = this.props;
    if (favorite.length === 0) {
      return <UILoader />;
    }
    return (
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

export default AppContextHOC(UserFavoriteMovies);

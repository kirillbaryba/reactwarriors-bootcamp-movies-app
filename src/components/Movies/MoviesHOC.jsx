import React from "react";
import UILoader from "../UIComponents/UILoader";
import { inject, observer } from "mobx-react";

export default Component => {
  @inject(({ moviesPageStore }) => ({
    moviesPageStore
  }))
  @observer
  class MoviesHOC extends React.Component {
    componentDidMount() {
      this.props.moviesPageStore.getMovies();
    }

    render() {
      const {
        moviesPageStore: { isLoading, movies }
      } = this.props;
      return isLoading ? <UILoader /> : <Component movies={movies} />;
    }
  }
  return MoviesHOC;
};

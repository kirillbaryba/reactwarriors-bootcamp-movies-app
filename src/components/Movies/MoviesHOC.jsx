import React from "react";
import Loader from "react-loader-spinner";
// import _ from "lodash";
import { inject, observer } from "mobx-react";

export default Component => {
  @inject(({ moviesPageStore, userStore, loginFormStore }) => ({
    moviesPageStore,
    userStore,
    loginFormStore
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
      return isLoading ? (
        <span className="spinner">
          <Loader type="TailSpin" color="salmon" height={80} width={80} />
        </span>
      ) : (
        <Component {...this.props} movies={movies} />
      );
    }
  }

  return MoviesHOC;
};

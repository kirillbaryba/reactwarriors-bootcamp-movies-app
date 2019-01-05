import React from "react";
import Loader from "react-loader-spinner";
import _ from "lodash";
import { inject, observer } from "mobx-react";

export default Component =>
  @inject(({ moviesPageStore, userStore, loginFormStore }) => ({
    moviesPageStore,
    userStore,
    loginFormStore
  }))
  @observer
  class MoviesHOC extends React.Component {
    componentDidMount() {
      this.props.moviesPageStore.getMovies(
        this.props.moviesPageStore.filters,
        this.props.moviesPageStore.page
      );
    }

    componentDidUpdate(prevProps) {
      //const { user, session_id } = this.props;
      if (!_.isEqual(this.props.moviesPageStore.filters, prevProps.filters)) {
        this.props.moviesPageStore.onChangePage(
          1,
          this.props.moviesPageStore.total_pages
        );
        this.props.moviesPageStore.getMovies(
          this.props.moviesPageStore.filters,
          1
        );
        // if (user) {
        //   this.props.getAddedMovies(user.id, session_id, "favorite");
        //   this.props.getAddedMovies(user.id, session_id, "watchlist");
        // } else {
        //   return null;
        // }
      }

      if (!_.isEqual(this.props.moviesPageStore.page, prevProps.page)) {
        this.props.moviesPageStore.getMovies(
          this.props.moviesPageStore.filters,
          this.props.moviesPageStore.page
        );
        // if (user) {
        //   this.props.getAddedMovies(user.id, session_id, "favorite");
        //   this.props.getAddedMovies(user.id, session_id, "watchlist");
        // }
      }
    }

    render() {
      if (this.props.moviesPageStore.isLoading) {
        return (
          <span className="spinner">
            <Loader type="TailSpin" color="salmon" height={80} width={80} />
          </span>
        );
      }

      return (
        <Component
          movies={this.props.moviesPageStore.movies}
          user={this.props.userStore.user}
          session_id={this.props.userStore.session_id}
          showModal={this.props.loginFormStore.showLoginModal}
          toggleLoginModal={this.props.loginFormStore.toggleLoginModal}
        />
      );
    }
  };

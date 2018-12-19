import React from "react";
import Loader from "react-loader-spinner";
import CallApi from "../../api/api";
import _ from "lodash";

export default Component =>
  class MoviesHOC extends React.Component {
    constructor() {
      super();

      this.state = {
        movies: [],
        isLoading: false
      };
    }

    getMovies = (filters, page) => {
      this.setState({
        isLoading: true
      });

      const { sort_by, primary_release_year, with_genres } = filters;

      const queryStringParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year
      };

      if (with_genres.length > 0)
        queryStringParams.with_genres = with_genres.join(",");

      CallApi.get("/discover/movie", {
        params: queryStringParams
      }).then(data => {
        this.setState({
          movies: data.results,
          isLoading: false
        });
        this.props.getTotalPages(data.total_pages);
      });
    };

    componentDidMount() {
      this.setState({ isLoading: true });
      this.getMovies(this.props.filters, this.props.page);
    }

    
    componentDidUpdate(prevProps) {
      const { user, session_id } = this.props;
      if (!_.isEqual(this.props.filters, prevProps.filters)) {
        this.props.onChangePage(1, this.state.total_pages);
        this.getMovies(this.props.filters, 1);
        if (user) {
          this.props.getAddedMovies(user.id, session_id, "favorite");
          this.props.getAddedMovies(user.id, session_id, "watchlist");
        } else {
          return null;
        }
      }

      if (!_.isEqual(this.props.page, prevProps.page)) {
        this.getMovies(this.props.filters, this.props.page);
        if (user) {
          this.props.getAddedMovies(user.id, session_id, "favorite");
          this.props.getAddedMovies(user.id, session_id, "watchlist");
        }
      }
    }

    render() {
      const { movies, isLoading } = this.state;
      const { user, showModal, toggleLoginModal, session_id } = this.props;

      if (isLoading) {
        return (
          <span className="spinner">
            <Loader type="TailSpin" color="salmon" height={80} width={80} />
          </span>
        );
      }

      return (
        <Component
          movies={movies}
          user={user}
          session_id={session_id}
          showModal={showModal}
          toggleLoginModal={toggleLoginModal}
        />
      );
    }
  };

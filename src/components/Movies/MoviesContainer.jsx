import React, { Component } from "react";
import MoviesList from "./MoviesList";
import { API_URL, API_KEY_3 } from "../../api/api";
import queryString from "query-string";

export default class MoviesContainer extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;

    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by: sort_by,
      page: page,
      primary_release_year: primary_release_year
    };

    if (with_genres.length > 0)
      queryStringParams.with_genres = with_genres.join(",");

    const link = `${API_URL}/discover/movie?${queryString.stringify(
      queryStringParams
    )}`;

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
        this.props.getTotalPages(data.total_pages);
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    //console.log("componentDidUpdate", prevProps.page, this.props.page);

    if (this.props.filters !== prevProps.filters) {
      this.props.onChangePage(1, this.state.total_pages);
      this.getMovies(this.props.filters, 1);
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }

  render() {
    const { movies } = this.state;
    const { user, showModal, toggleModal, session_id } = this.props;

    return (
      <MoviesList
        movies={movies}
        user={user}
        session_id={session_id}
        showModal={showModal}
        toggleModal={toggleModal}
      />
    );
  }
}

import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "2018",
        with_genres: []
      },
      page: 1,
      total_pages: ""
    };
  }

  onChangeFilters = e => {
    const newFilters = {
      ...this.state.filters,
      [e.target.name]: e.target.value
    };
    this.setState(prevState => ({
      filters: newFilters
    }));
  };

  onChangePage = (page) => {
    this.setState({
      page
    });
  };

  getTotalPages = total_pages => {
    this.setState({
      total_pages
    });
  };

  clearAllFilters = () => {
    this.setState({
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "2018",
        with_genres: []
      },
      page: 1,
      total_pages: ""
    });
  };

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  page={page}
                  total_pages={total_pages}
                  onChangePage={this.onChangePage}
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.clearAllFilters}
                >
                  Очистить Фильтры
                </button>
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
              onChangeFilters={this.onChangeFilters}
              getTotalPages={this.getTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}

import React from "react";
import SortBy from "./SortBy";
import Pagination from "./Pagination";
import SortByYear from "./SortByYear";
import Genres from "./Genres";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, primary_release_year, with_genres },
      page,
      total_pages,
      onChangeFilters,
      onChangePage
    } = this.props;

    return (
      <form className="mb-3">
        <SortBy
          sort_by={sort_by}
          value={sort_by}
          onChangeFilters={onChangeFilters}
        />
        <SortByYear
          primary_release_year={primary_release_year}
          value={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <Genres with_genres={with_genres} onChangeFilters={onChangeFilters} />
        <Pagination
          onChangePage={onChangePage}
          page={page}
          total_pages={total_pages}
        />
      </form>
    );
  }
}

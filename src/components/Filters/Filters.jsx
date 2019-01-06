import React from "react";
import SortBy from "./SortBy";
import Pagination from "./Pagination";
import SortByYear from "./SortByYear";
import Genres from "./Genres";

class Filters extends React.Component {
  render() {
    return (
      <form className="mb-3">
        <SortBy />
        <SortByYear />
        <Genres />
        <Pagination />
      </form>
    );
  }
}

export default Filters;

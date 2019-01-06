import React from "react";
import SortBy from "./SortBy";
import Pagination from "./Pagination";
import SortByYear from "./SortByYear";
import Genres from "./Genres";
import AppContextHOC from "../HOC/AppContextHOC";
import { observer } from "mobx-react";

@observer
class Filters extends React.Component {
  render() {
    return (
      <form className="mb-3">
        <SortBy />
        <SortByYear />
        {/* 
        <Genres with_genres={with_genres} onChangeFilters={onChangeFilters} />
        <Pagination
          onChangePage={onChangePage}
          page={page}
          total_pages={total_pages}
        />
        */}
      </form>
    );
  }
}

export default AppContextHOC(Filters);

import React from "react";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class Pagination extends React.Component {
  render() {
    const {
      moviesPageStore: { page, prevPage, total_pages, nextPage }
    } = this.props;
    return (
      <React.Fragment>
        <div
          className="btn-group d-flex justify-content-around mb-3"
          role="group"
          aria-label="Basic example"
        >
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={prevPage}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={page === total_pages}
            onClick={nextPage}
          >
            Вперед
          </button>
        </div>
        <div className="text-center">
          Страница {page} из {total_pages}
        </div>
      </React.Fragment>
    );
  }
}

export default Pagination;

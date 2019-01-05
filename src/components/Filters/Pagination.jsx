import React from "react";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class Pagination extends React.Component {
  render() {
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
            disabled={this.props.moviesPageStore.page === 1}
            onClick={this.props.moviesPageStore.prevPage}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={
              this.props.moviesPageStore.page ===
              this.props.moviesPageStore.total_pages
            }
            onClick={this.props.moviesPageStore.nextPage}
          >
            Вперед
          </button>
        </div>
        <div className="text-center">
          Страница {this.props.moviesPageStore.page} из{" "}
          {this.props.moviesPageStore.total_pages}
        </div>
      </React.Fragment>
    );
  }
}

export default Pagination;

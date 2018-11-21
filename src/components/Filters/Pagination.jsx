import React from "react";

export default class Pagination extends React.PureComponent {
  render() {
    console.log("pagination");
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
            disabled={this.props.page === 1}
            onClick={() => {
              this.props.onChangePage(this.props.page - 1);
            }}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={this.props.page === this.props.total_pages}
            onClick={() => {
              this.props.onChangePage(this.props.page + 1);
            }}
          >
            Вперед
          </button>
        </div>
        <div className="text-center">
          Страница {this.props.page} из {this.props.total_pages}
        </div>
      </React.Fragment>
    );
  }
}

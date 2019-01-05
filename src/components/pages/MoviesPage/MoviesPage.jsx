import React from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";
import AppContextHOC from "../../HOC/AppContextHOC";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore, userStore, loginFormStore }) => ({
  moviesPageStore,
  userStore,
  loginFormStore
}))
@observer
class MoviesPage extends React.Component {
  render() {
    // const {
    //   moviesPageStore: {
    //     filters,
    //     page,
    //     total_pages,
    //     clearAllFilters,
    //     onChangePage,
    //     onChangeFilters,
    //     getTotalPages
    //   }
    // } = this.props.moviesPageStore;

    // const {
    //   userStore: { user, session_id }
    // } = this.props.userStore;

    // const {
    //   loginFormStore: { toggleLoginModal, showLoginModal }
    // } = this.props.loginFormStore;

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  filters={this.props.moviesPageStore.filters}
                  onChangeFilters={this.props.moviesPageStore.onChangeFilters}
                  page={this.props.moviesPageStore.page}
                  total_pages={this.props.moviesPageStore.total_pages}
                  onChangePage={this.props.moviesPageStore.onChangePage}
                />
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  onClick={this.props.moviesPageStore.clearAllFilters}
                >
                  Очистить Фильтры
                </button>
              </div>
            </div>
          </div>

          <div className="col-8">
            {
              <MoviesList
                filters={this.props.moviesPageStore.filters}
                page={this.props.moviesPageStore.page}
                onChangePage={this.props.moviesPageStore.onChangePage}
                onChangeFilters={this.props.moviesPageStore.onChangeFilters}
                getTotalPages={this.props.moviesPageStore.getTotalPages}
                user={this.props.userStore.user}
                toggleLoginModal={this.props.loginFormStore.toggleLoginModal}
                showLoginModal={this.props.loginFormStore.showLoginModal}
                session_id={this.props.userStore.session_id}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MoviesPage);

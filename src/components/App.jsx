import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import Cookies from "universal-cookie";
import { API_URL, API_KEY_3, fetchApi } from "../api/api";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far);

const cookies = new Cookies();

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "2018",
        with_genres: []
      },
      user: null,
      session_id: null,
      page: 1,
      total_pages: "",
      showModal: false
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  updateUser = user => {
    this.setState({
      user
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
    });
  };

  onChangeFilters = e => {
    const newFilters = {
      ...this.state.filters,
      [e.target.name]: e.target.value
    };
    this.setState(prevState => ({
      filters: newFilters
    }));
  };

  onChangePage = page => {
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

  componentDidMount() {
    const session_id = cookies.get("session_id");
  
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user);
        this.updateSessionId(session_id);
      });
    }
  }

  render() {
    const {
      filters,
      page,
      total_pages,
      user,
      showModal
    } = this.state;
    return (
      <div>
        <Header
          updateUser={this.updateUser}
          user={user}
          updateSessionId={this.updateSessionId}
          toggleModal={this.toggleModal}
          showModal={showModal}
        />
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
              {
                <MoviesList
                  filters={filters}
                  page={page}
                  onChangePage={this.onChangePage}
                  onChangeFilters={this.onChangeFilters}
                  getTotalPages={this.getTotalPages}
                  user={user}
                  toggleModal={this.toggleModal}
                  showModal={showModal}
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
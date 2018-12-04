import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import Cookies from "universal-cookie";
import Authtorization from "./Header/Login/Authtorization";
import CallApi from "../api/api";
import { Modal, ModalBody } from "reactstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far);

const cookies = new Cookies();

export const AppContext = React.createContext();

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
      showLoginModal: false,
      favorite: [],
      watchlist: []
    };
  }

  toggleLoginModal = () => {
    this.setState(prevState => ({
      showLoginModal: !prevState.showLoginModal
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

  resetUserInfo = () => {
    this.setState({
      user: null,
      session_id: null,
      favorite: [],
      watchlist: []
    });
  };

  onChangeFilters = e => {
    const { user, session_id } = this.state;
    const newFilters = {
      ...this.state.filters,
      [e.target.name]: e.target.value
    };
    this.setState(prevState => ({
      filters: newFilters
    }));
    if (user) {
      this.getAddedMovies(user.id, session_id, "favorite");
      this.getAddedMovies(user.id, session_id, "watchlist");
    }
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

  getAddedMovies = (userId, sessionId, type) => {
    const userMoviesArray = [];
    CallApi.get(`/account/${userId}/${type}/movies`, {
      params: {
        session_id: sessionId,
        language: "ru-RU"
      }
    }).then(data => {
      const movies = data.results;
      movies.map(movie => {
        return userMoviesArray.push(movie.id);
      });
      this.setState({
        [type]: userMoviesArray
      });
    });
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");

    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id: session_id
        }
      }).then(user => {
        this.updateUser(user);
        this.updateSessionId(session_id);
        this.getAddedMovies(user.id, session_id, "favorite");
        this.getAddedMovies(user.id, session_id, "watchlist");
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { user, session_id } = this.state;
    if (this.state.user !== prevState.user && user !== null) {
      this.getAddedMovies(user.id, session_id, "favorite");
      this.getAddedMovies(user.id, session_id, "watchlist");
    }
  }

  render() {
    const {
      filters,
      page,
      total_pages,
      user,
      showLoginModal,
      session_id,
      favorite,
      watchlist
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          user: user,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          session_id: session_id,
          resetUserInfo: this.resetUserInfo,
          favorite: favorite,
          watchlist: watchlist,
          getAddedMovies: this.getAddedMovies
        }}
      >
        <div>
          <Header user={user} toggleLoginModal={this.toggleLoginModal} />
          <Modal isOpen={showLoginModal} toggle={this.toggleLoginModal}>
            <ModalBody>
              <Authtorization toggleLoginModal={this.toggleLoginModal} />
            </ModalBody>
          </Modal>
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
                    toggleLoginModal={this.toggleLoginModal}
                    showLoginModal={showLoginModal}
                    session_id={session_id}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

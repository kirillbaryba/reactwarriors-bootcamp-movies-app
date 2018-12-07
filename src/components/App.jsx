import React from "react";
import Header from "./Header/Header";
import Cookies from "universal-cookie";
import MoviesPage from "../components/pages/MoviesPage/MoviesPage";
import MoviePage from "../components/pages/MoviePage/MoviePage";
import LoginModal from "../components/Header/LoginModal";
import CallApi from "../api/api";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
    cookies.remove('session_id', {path: "/"});
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
        this.updateSessionId(session_id);
        this.updateUser(user);
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
      user,
      showLoginModal,
      session_id,
      favorite,
      watchlist
    } = this.state;

    return (
      <Router>
        <AppContext.Provider
          value={{
            user: user,
            updateUser: this.updateUser,
            updateSessionId: this.updateSessionId,
            session_id: session_id,
            resetUserInfo: this.resetUserInfo,
            favorite: favorite,
            watchlist: watchlist,
            getAddedMovies: this.getAddedMovies,
            toggleLoginModal: this.toggleLoginModal
          }}
        >
          <div>
            <Header user={user} toggleLoginModal={this.toggleLoginModal} />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
          </div>
          <LoginModal
            showLoginModal={showLoginModal}
            toggleLoginModal={this.toggleLoginModal}
          />
        </AppContext.Provider>
      </Router>
    );
  }
}

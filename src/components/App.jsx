import React from "react";
import Header from "./Header/Header";
import MoviesPage from "../components/pages/MoviesPage/MoviesPage";
import MoviePage from "../components/pages/MoviePage/MoviePage";
import UserFavoriteMovies from "../components/pages/MoviesPage/UserFavoriteMovies";
import LoginModal from "../components/Header/LoginModal";
import CallApi from "../api/api";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import { inject, observer } from "mobx-react";

library.add(fas, far);

export const AppContext = React.createContext();

@inject(({ userStore, loginFormStore }) => ({
  userStore,
  loginFormStore
}))
@observer
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: [],
      watchlist: []
    };
  }

  getAddedMovies = (userId, sessionId, type) => {
    CallApi.get(`/account/${userId}/${type}/movies`, {
      params: {
        session_id: sessionId,
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({
        [type]: data.results
      });
    });
  };

  componentDidMount() {
    this.props.userStore.getUser();
  }

  componentDidUpdate(prevProps, prevState) {
    const { user, session_id } = this.props.userStore;
    if (this.state.user !== prevState.user && user !== null) {
      this.getAddedMovies(user.id, session_id, "favorite");
      this.getAddedMovies(user.id, session_id, "watchlist");
    }
  }

  render() {
    const { favorite, watchlist } = this.state;

    return (
      <Router>
        <AppContext.Provider
          value={{
            favorite: favorite,
            watchlist: watchlist,
            getAddedMovies: this.getAddedMovies
          }}
        >
          <React.Fragment>
            <Header />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
            <Route path="/favorites" component={UserFavoriteMovies} />
          </React.Fragment>
          <LoginModal
            showLoginModal={this.props.loginFormStore.showLoginModal}
            toggleLoginModal={this.props.loginFormStore.toggleLoginModal}
          />
        </AppContext.Provider>
      </Router>
    );
  }
}

export default App;

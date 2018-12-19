import React from "react";
import CallApi from "../../../api/api";
import AppContextHOC from "../../HOC/AppContextHOC";
import MoviePageContent from "./MoviePageContent";
import UILoader from "../../UIComponents/UILoader";
import Details from "./Details";
import Videos from "./Videos";
import Credits from "./Credits";
import MoviePageTabs from "../../Movies/MoviePageTabs";
import { Route, Switch } from "react-router-dom";

class MoviePage extends React.Component {
  constructor() {
    super();

    this.state = {
      movie: "",
      isLoading: false
    };
  }

  componentDidMount() {
    const { user, session_id, getAddedMovies } = this.props;

    this.setState({ isLoading: true });

    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({ movie: data, isLoading: false });
      if (user) {
        getAddedMovies(user.id, session_id, "favorite");
        getAddedMovies(user.id, session_id, "watchlist");
      }
    });
  }

  render() {
    const { movie, isLoading } = this.state;
    const { user, session_id, toggleLoginModal } = this.props;

    if (isLoading) {
      return <UILoader />;
    }

    return (
      <React.Fragment>
        <MoviePageContent
          user={user}
          session_id={session_id}
          toggleLoginModal={toggleLoginModal}
          movie={movie}
        />
        <MoviePageTabs movie={movie} />
        <Switch>
          <Route path="/movie/:id/details" component={Details} />
          <Route path="/movie/:id/videos" component={Videos} />
          <Route path="/movie/:id/credits" component={Credits} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default AppContextHOC(MoviePage);

import React from "react";
import CallApi from "../../../api/api";
import { Route, Link, Switch } from "react-router-dom";
import FavoriteIcon from "../../Movies/FavoriteIcon";
import WatchlistIcon from "../../Movies/WatchlistIcon";
import AppContextHOC from "../../HOC/AppContextHOC";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import Details from "./Details";
import Videos from "./Videos";
import Credits from "./Credits";
import Loader from "react-loader-spinner";

class MoviePage extends React.Component {
  constructor() {
    super();

    this.state = {
      movie: "",
      activeTab: "1",
      isLoading: false
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
    console.log(movie);
    if (isLoading) {
      return (
        <span className="spinner">
          <Loader type="TailSpin" color="salmon" height={80} width={80} />
        </span>
      );
    }

    return (
      <div className="page-wrap">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="img-wrap">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${
                      movie.poster_path
                    }`}
                    alt={movie.name}
                  />
                ) : null}
              </div>
            </div>
            <div className="col-8">
              <h2>{movie.original_title}</h2>
              <span>({String(movie.release_date).substring(0, 4)})</span>
              <h3>Описание</h3>
              <span>{movie.overview ? movie.overview : "Нет описания"}</span>
            </div>
            <FavoriteIcon
              item={movie}
              user={user}
              session_id={session_id}
              toggleLoginModal={toggleLoginModal}
            />
            <WatchlistIcon
              item={movie}
              user={user}
              session_id={session_id}
              toggleLoginModal={toggleLoginModal}
            />
          </div>
        </div>
        <Nav tabs>
          <NavItem>
            <NavLink
              tag="span"
              className={classnames({ active: this.state.activeTab === "1" })}
            >
              <Link
                onClick={() => {
                  this.toggle("1");
                }}
                to={`/movie/${this.state.movie.id}/details`}
              >
                Details
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag="span"
              className={classnames({ active: this.state.activeTab === "2" })}
            >
              <Link
                to={`/movie/${this.state.movie.id}/videos`}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Videos
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag="span"
              className={classnames({ active: this.state.activeTab === "3" })}
            >
              <Link
                to={`/movie/${this.state.movie.id}/credits`}
                onClick={() => {
                  this.toggle("3");
                }}
              >
                Credits
              </Link>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={this.state.activeTab}>
            <Switch>
              <Route path="/movie/:id/details" component={Details} />
              <Route path="/movie/:id/videos" component={Videos} />
              <Route path="/movie/:id/credits" component={Credits} />
            </Switch>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default AppContextHOC(MoviePage);

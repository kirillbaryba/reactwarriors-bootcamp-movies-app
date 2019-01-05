import { observable, action, configure, reaction, values } from "mobx";
import CallApi from "../api/api";

configure({ enforceActions: "always" });

class MoviesPageStore {
  constructor() {
    reaction(
      () => values(this.filters),
      () => {
        this.getMovies(this.filters, 1);
      }
    );
  }
  //  autorun(reaction => {
  //       () => values(this.page),
  //       () => {
  //         this.getMovies(this.filters, this.page);
  //       }
  //     };
  //   });

  @observable movies = [];

  @observable filters = {
    sort_by: "popularity.desc",
    primary_release_year: "2018",
    with_genres: []
  };

  @observable page = 1;

  @observable total_pages = "";

  @observable isLoading = false;

  @observable favorite = [];
  @observable watchlist = [];

  @action
  getMovies = (filters, page) => {
    this.updateLoading(true);
    const { sort_by, primary_release_year, with_genres } = filters;

    const queryStringParams = {
      language: "ru-RU",
      sort_by: sort_by,
      page: page,
      primary_release_year: primary_release_year
    };

    if (with_genres.length > 0)
      queryStringParams.with_genres = with_genres.join(",");

    CallApi.get("/discover/movie", {
      params: queryStringParams
    }).then(data => {
      this.updateMovies(data.results);
      this.updateLoading(false);
      this.getTotalPages(data.total_pages);
    });
  };

  @action
  updateMovies = movies => {
    this.movies = movies;
  };

  @action
  updateLoading = value => {
    this.isLoading = value;
  };

  @action
  getTotalPages = total_pages => {
    this.total_pages = total_pages;
  };

  @action
  onChangePage = page => {
    this.page = page;
  };

  @action
  clearAllFilters = () => {
    this.filters = {
      sort_by: "popularity.desc",
      primary_release_year: "2018",
      with_genres: []
    };
    this.page = 1;
    this.total_pages = "";
  };

  @action
  onChangeFilters = event => {
    //const { user, session_id } = this.props;
    this.filters[event.target.name] = event.target.value;
    // if (user) {
    //   this.props.getAddedMovies(user.id, session_id, "favorite");
    //   this.props.getAddedMovies(user.id, session_id, "watchlist");
    // }
  };

  @action
  nextPage = () => {
    this.onChangePage(this.page + 1);
  };

  @action
  prevPage = () => {
    this.onChangePage(this.page - 1);
  };
}

export const moviesPageStore = new MoviesPageStore();

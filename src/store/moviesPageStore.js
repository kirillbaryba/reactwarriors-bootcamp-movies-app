import { observable, action, configure, reaction, values } from "mobx";
import CallApi from "../api/api";

configure({ enforceActions: "always" });

const initialFilters = {
  sort_by: "popularity.desc",
  primary_release_year: "2018",
  with_genres: []
};

class MoviesPageStore {
  constructor() {
    reaction(
      () => values(this.filters),
      () => {
        this.onChangePage(1);
        this.getMovies();
      }
    );

    reaction(
      () => this.page,
      () => {
        this.getMovies();
      }
    );
  }

  // reactionByFilters = reaction(
  //   () => values(this.filters),
  //   () => {
  //     this.onChangePage(1);
  //     this.getMovies();
  //   }
  // );

  // reactionByPage = reaction(
  //   () => this.page,
  //   () => {
  //     this.getMovies();
  //   }
  // );

  @observable movies = [];

  @observable isLoading = false;

  @observable filters = initialFilters;

  @observable page = 1;

  @observable total_pages = "";

  @action
  getMovies = () => {
    this.updateLoading(true);
    const { sort_by, primary_release_year, with_genres } = this.filters;

    const queryStringParams = {
      language: "ru-RU",
      sort_by,
      primary_release_year,
      page: this.page
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
    for (let key in initialFilters) {
      this.filters[key] = initialFilters[key];
    }
    // console.log("filters", this.filters);
    // console.log("initialFilters", initialFilters);
    // this.filters = initialFilters;
    // this.filters = {
    //   sort_by: "popularity.desc",
    //   primary_release_year: "2018",
    //   with_genres: []
    // };
    this.page = 1;
    this.total_pages = "";
  };

  @action
  onChangeFilters = event => {
    //const { user, session_id } = this.props;
    this.filters[event.target.name] = event.target.value;
    console.log("onChangeFilters initialFilters", initialFilters);
    console.log("onChangeFilters filters", this.filters);
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
// filters = {
//   sort_by: "popularity.desc",
//   primary_release_year: "2018",
//   with_genres: []
// };

// =>

// ["popularity.desc", "2018",  []]

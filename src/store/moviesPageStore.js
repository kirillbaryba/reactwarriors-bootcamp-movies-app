import { observable, action, configure, reaction, values } from "mobx";
import CallApi from "../api/api";

configure({ enforceActions: "always" });

const defaultFilters = {
  sort_by: "popularity.desc",
  primary_release_year: "2019",
  with_genres: []
};

class MoviesPageStore {
  @observable movies = [];

  @observable isLoading = false;

  @observable filters = {
    sort_by: "popularity.desc",
    primary_release_year: "2019",
    with_genres: []
  };

  @observable genresList = [];

  @observable page = 1;

  @observable total_pages = "";

  @action
  getMovies = () => {
    this.updateLoading(true);
    const { sort_by, primary_release_year, with_genres } = this.filters;

    const queryStringParams = {
      language: "ru-RU",
      sort_by: sort_by,
      page: this.page,
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
  getGenres = () => {
    CallApi.get("/genre/movie/list", {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.updateGenresList(data.genres);
    });
  };

  @action
  updateGenresList = genres => {
    this.genresList = genres;
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
  updateFilters = filters => {
    for (const key in filters) {
      this.filters[key] = filters[key];
    }
  };

  @action
  clearAllFilters = () => {
    this.updateFilters(defaultFilters);
    this.page = 1;
    this.total_pages = "";
  };

  @action
  onChangeFilters = event => {
    this.filters[event.target.name] = event.target.value;
  };

  @action
  onChangeGenres = event => {
    this.onChangeFilters({
      target: {
        name: "with_genres",
        value: event.target.checked
          ? [...this.filters.with_genres, event.target.value]
          : this.filters.with_genres.filter(
              genre => genre !== event.target.value
            )
      }
    });
  };

  @action
  resetGenres = () => {
    this.onChangeFilters({
      target: {
        name: "with_genres",
        value: []
      }
    });
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

reaction(
  () => values(moviesPageStore.filters),
  () => {
    moviesPageStore.onChangePage(1);
    moviesPageStore.getMovies();
  }
);

reaction(
  () => moviesPageStore.page,
  () => {
    moviesPageStore.getMovies();
  }
);

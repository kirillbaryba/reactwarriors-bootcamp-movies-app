import React from "react";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class Genres extends React.Component {
  componentDidMount() {
    this.props.moviesPageStore.getGenres();
  }
  render() {
    const {
      moviesPageStore: {
        genresList,
        resetGenres,
        onChangeGenres,
        filters: { with_genres }
      }
    } = this.props;
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-outline-dark mb-2 w-100"
          onClick={resetGenres}
        >
          Показать все жанры
        </button>

        <div className="mb-3">
          {genresList.map(genre => {
            return (
              <div key={genre.id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={genre.id}
                  id={`genre${genre.id}`}
                  onChange={onChangeGenres}
                  checked={with_genres.includes(String(genre.id))}
                />
                <label
                  className="form-check-label"
                  htmlFor={`genre${genre.id}`}
                >
                  {genre.name}
                </label>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Genres;

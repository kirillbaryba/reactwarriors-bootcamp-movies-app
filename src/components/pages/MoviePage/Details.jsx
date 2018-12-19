import React from "react";
import AppContextHOC from "../../HOC/AppContextHOC";
import CallApi from "../../../api/api";
import { Container } from "reactstrap";

class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      movie: "",
      countries: [],
      companies: [],
      genres: []
    };
  }

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({
        movie: data,
        countries: data.production_countries,
        companies: data.production_companies,
        genres: data.genres
      });
    });
  }

  render() {
    const { movie, countries, companies, genres } = this.state;

    return (
      <Container>
          <div className="table">
            <div className="table-item">
              <span>Статус</span>
              <span>{movie.status}</span>
            </div>
            <div className="table-item">
              <span>Дата выхода </span>
              <span>{movie.release_date}</span>
            </div>
            <div className="table-item">
              <span>Язык оригинала</span>
              <span>{movie.original_language}</span>
            </div>
            <div className="table-item">
              <span>Страна</span>
              {countries.map(country => (
                <span key={country.name}>{country.name}</span>
              ))}
            </div>
            <div className="table-item">
              <span>Бюджет</span>
              <span>{movie.budget}$</span>
            </div>
            <div className="table-item">
              <span>Сборы</span>
              <span>{movie.revenue}$</span>
            </div>
            <div className="table-item">
              <span>Продолжительность</span>
              <span>{movie.runtime}min</span>
            </div>
            <div className="table-item">
              <span>Компания</span>
              {companies.map((company, index) => (
                <span key={company.name}>
                  {company.name}
                  {companies.length - 1 !== index && ","}{" "}
                </span>
              ))}
            </div>
            <div className="table-item">
              <span>Жанры</span>
              {genres.map(genre => (
                <span key={genre.name}>{genre.name}</span>
              ))}
            </div>
          </div>
      </Container>
    );
  }
}

export default AppContextHOC(Details);

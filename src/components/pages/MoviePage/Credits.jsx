import React from "react";
import AppContextHOC from "../../HOC/AppContextHOC";
import CallApi from "../../../api/api";
import { Container, Row, Col } from "reactstrap";

class Credits extends React.Component {
  constructor() {
    super();

    this.state = {
      credits: []
    };
  }

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}/credits`, {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({ credits: data.cast });
    });
  }

  render() {
    const { credits } = this.state;
    console.log(credits, "credits");
    return (
      <Container>
        <Row>
          {credits.map(actor =>
            actor.profile_path !== null ? (
              <Col xs="3" key={actor.cast_id}>
                <img
                  className="actor-img"
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                />
              </Col>
            ) : (
              false
            )
          )}
        </Row>
      </Container>
    );
  }
}

export default AppContextHOC(Credits);

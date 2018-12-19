import React from "react";
import AppContextHOC from "../../HOC/AppContextHOC";
import CallApi from "../../../api/api";

class Videos extends React.Component {
  constructor() {
    super();

    this.state = {
      videos: []
    };
  }

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}/videos`, {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({ videos: data.results});
    });
  }

  render() {
    const { videos } = this.state;
   
    return (
      <React.Fragment>
        {videos.map(video => (
          <iframe
            key={video.key}
            title="vgrvw4"
            width="640"
            height="360"
            src={`https://www.youtube-nocookie.com/embed/${video.key}`}
            allowFullScreen
            frameBorder="0"
          />
        ))}
      </React.Fragment>
    );
  }
}

export default AppContextHOC(Videos);

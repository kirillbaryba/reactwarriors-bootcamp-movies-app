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
      this.setState({ videos: data.results });
    });
  }

  render() {
    const { videos } = this.state;
    if (videos.length <= 0) {
      return <span>No videos</span>;
    }
    console.log(videos);
    return (
      <div>
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
      </div>
    );
  }
}

export default AppContextHOC(Videos);

import React from "react";
import CallApi from "../../api/api";

const ActionIconsHOC = (Component, type) =>
  class ActionIconsHOC extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isAdd: this.findIncludedMovie(this.props[type], this.props.item.id)
      };
    }

    findIncludedMovie = (moviesArray, movieId) => {
      return moviesArray.find(item => item.id === movieId);
    };

    addMovieAction = () => {
      const {
        user,
        item,
        session_id,
        toggleLoginModal,
        getAddedMovies
      } = this.props;

      if (session_id) {
        this.setState(
          {
            isAdd: !this.state.isAdd
          },
          () => {
            CallApi.post(`/account/${user.id}/${type}`, {
              params: {
                session_id: session_id
              },
              body: {
                media_type: "movie",
                media_id: item.id,
                [type]: this.state.isAdd
              }
            }).then(() => {
              getAddedMovies(user.id, session_id, type);
            });
          }
        );
      } else {
        toggleLoginModal();
      }
    };

    componentDidUpdate(prevProps, prevState) {
      if (
        this.findIncludedMovie(prevProps[type], this.props.item.id) !==
        this.findIncludedMovie(this.props[type], this.props.item.id)
      ) {
        this.setState({
          isAdd: this.findIncludedMovie(this.props[type], this.props.item.id)
        });
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          onClick={this.addMovieAction}
          isAdd={this.state.isAdd}
        />
      );
    }
  };

export default ActionIconsHOC;

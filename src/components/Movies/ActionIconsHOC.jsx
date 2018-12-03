import React from "react";
import CallApi from "../../api/api";

const ActionIconsHOC = (Component, type) =>
  class ActionIconsHOC extends React.Component {
    displayName: "ActionIconsHOC";

    constructor() {
      super();

      this.state = {
        isAdd: false
      };
    }

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
            });
            getAddedMovies(user.id, session_id, type);
          }
        );
      } else {
        toggleLoginModal();
      }
    };

    componentDidUpdate(prevProps, prevState) {
      if (prevProps[type] !== this.props[type]) {
        const a = this.props[type].includes(this.props.item.id);
        this.setState({
          isAdd: a
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

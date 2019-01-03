import React from "react";

export default class Login extends React.Component {
  render() {
    const { toggleLoginModal } = this.props;

    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={toggleLoginModal}
        >
          Login
        </button>
      </div>
    );
  }
}

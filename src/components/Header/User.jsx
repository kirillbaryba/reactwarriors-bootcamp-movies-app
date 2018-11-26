import React from "react";

export default class User extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <img className="rounded-circle" src={`https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64`} alt="" />
      </div>
    );
  }
}

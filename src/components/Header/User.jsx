import React from "react";
import { AppContext } from "../App";

class User extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <img
          className="rounded-circle"
          src={`https://www.gravatar.com/avatar/${
            user.avatar.gravatar.hash
          }.jpg?s=64`}
          alt=""
        />
      </div>
    );
  }
}

const UserContainer = (props) => {
  
  return (
    <AppContext.Consumer>
      {context => {
        console.log(context, "context from user component");
        return <User user={context.user} {...props}/>;
      }}
    </AppContext.Consumer>
  );
};

UserContainer.displayName = "UserContainer";

export default UserContainer;
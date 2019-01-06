import React from "react";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
import AppContextHOC from "../HOC/AppContextHOC";
import { inject, observer } from "mobx-react";

@inject(({ userStore }) => ({
  userStore
}))
@observer
class User extends React.Component {
  state = {
    logoutDropdown: false
  };

  logoutDropdownToggle = () => {
    this.setState({
      logoutDropdown: !this.state.logoutDropdown
    });
  };

  render() {
    const {
      userStore: { user, resetUserInfo }
    } = this.props;
    return (
      <React.Fragment>
        <UncontrolledDropdown>
          <DropdownToggle nav>
            <img
              className="rounded-circle"
              src={`https://www.gravatar.com/avatar/${
                user.avatar.gravatar.hash
              }.jpg?s=40`}
              alt="avatar"
              onClick={this.logoutDropdownToggle}
            />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Выйти?</DropdownItem>
            <DropdownItem onClick={() => resetUserInfo()}>Да</DropdownItem>
            <DropdownItem>Нет</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </React.Fragment>
    );
  }
}

export default User;

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

  logout = () => {
    this.props.userStore.resetUserInfo();
  };

  render() {
    return (
      <React.Fragment>
        <UncontrolledDropdown>
          <DropdownToggle nav>
            <img
              className="rounded-circle"
              src={`https://www.gravatar.com/avatar/${
                this.props.userStore.user.avatar.gravatar.hash
              }.jpg?s=40`}
              alt="avatar"
              onClick={this.logoutDropdownToggle}
            />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Выйти?</DropdownItem>
            <DropdownItem onClick={this.logout}>Да</DropdownItem>
            <DropdownItem>Нет</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </React.Fragment>
    );
  }
}

export default AppContextHOC(User);

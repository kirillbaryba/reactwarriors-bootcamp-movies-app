import React from "react";
import Login from "./Login/Login";
import User from "./User";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    const { user, toggleLoginModal } = this.props;

    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <Link style={{ color: "white" }} to="/">
              Home
            </Link>
          </ul>
          {user ? (
            <User user={user} />
          ) : (
            <Login toggleLoginModal={toggleLoginModal} />
          )}
        </div>
      </nav>
    );
  }
}

Header.defaultProps = {
  user: null
};

Header.propTypes = {
  user: PropTypes.object,
  toggleLoginModal: PropTypes.func.isRequired
};

export default Header;

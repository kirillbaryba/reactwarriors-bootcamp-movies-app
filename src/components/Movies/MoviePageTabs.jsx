import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, NavLink as NavLinkTab } from "reactstrap";

const MoviePageTabs = props => {
  const activeTabStyle = {
    fontWeight: "bold",
    color: "salmon",
    border: "1px solid",
    borderBottom: "none"
  };
  const linkStyle = {
    display: "block",
    padding: "10px 20px"
  };
  return (
    <React.Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            activeStyle={activeTabStyle}
            style={linkStyle}
            to={`/movie/${props.movie.id}/details`}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            activeStyle={activeTabStyle}
            style={linkStyle}
            to={`/movie/${props.movie.id}/videos`}
          >
            Videos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            activeStyle={activeTabStyle}
            style={linkStyle}
            to={`/movie/${props.movie.id}/credits`}
          >
            Credits
          </NavLink>
        </NavItem>
      </Nav>
    </React.Fragment>
  );
};

export default MoviePageTabs;

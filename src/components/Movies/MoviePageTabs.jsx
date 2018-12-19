import React from "react";
import { NavLink } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink as NavLinkTab
} from "reactstrap";

const MoviePageTabs = props => {
  return (
    <React.Fragment>
      <Nav tabs>
        <NavItem>
          <NavLinkTab tag="div">
            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "salmon"
              }}
              to={`/movie/${props.movie.id}/details`}
            >
              Details
            </NavLink>
          </NavLinkTab>
        </NavItem>
        <NavItem>
          <NavLinkTab tag="div">
            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "salmon"
              }}
              to={`/movie/${props.movie.id}/videos`}
            >
              Videos
            </NavLink>
          </NavLinkTab>
        </NavItem>
        <NavItem>
          <NavLinkTab tag="div">
            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "salmon"
              }}
              to={`/movie/${props.movie.id}/credits`}
            >
              Credits
            </NavLink>
          </NavLinkTab>
        </NavItem>
      </Nav>
    </React.Fragment>
  );
};

export default MoviePageTabs;

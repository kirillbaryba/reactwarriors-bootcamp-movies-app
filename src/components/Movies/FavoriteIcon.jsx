import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionIconsHOC from "./ActionIconsHOC";
import AppContextHOC from "../HOC/AppContextHOC";

class FavoriteIcon extends React.Component {
  render() {
    const { onClick, isAdd } = this.props;
    return (
      <span
        onClick={onClick}
        className={`${isAdd ? "red" : null} icon-favorite`}
      >
        <FontAwesomeIcon icon={[isAdd ? "fas" : "far", "heart"]} />
      </span>
    );
  }
}

export default AppContextHOC(ActionIconsHOC(FavoriteIcon, "favorite"));

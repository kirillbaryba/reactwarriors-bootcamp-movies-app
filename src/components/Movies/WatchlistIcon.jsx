import React from "react";
import UIIcon from "../UIComponents/UIIcon";
import ActionIconsHOC from "./ActionIconsHOC";
import AppContextHOC from "../HOC/AppContextHOC";

class WatchlistIcon extends React.Component {
  render() {
    const { onClick, isAdd } = this.props;
    return <UIIcon onClick={onClick} isAdd={isAdd} type="bookmark" />;
  }
}

export default AppContextHOC(ActionIconsHOC(WatchlistIcon, "watchlist"));

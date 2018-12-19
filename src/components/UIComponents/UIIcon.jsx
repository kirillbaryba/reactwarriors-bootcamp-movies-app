import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UIIcon = props => {
  const { onClick, isAdd, type } = props;  
  return (
    <span onClick={onClick} className={`${isAdd ? "red" : null} icon-favorite`}>
      <FontAwesomeIcon icon={[isAdd ? "fas" : "far", `${type}`]} />
    </span>
  );
};

export default UIIcon;

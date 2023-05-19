import React from "react";

const Header = (props) => {
  return <div className="header">You have {props.tasksLeft} tasks left!</div>;
};

export default Header;

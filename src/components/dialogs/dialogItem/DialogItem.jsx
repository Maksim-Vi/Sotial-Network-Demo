import React from "react";
import classes from "../../dialogs/Dialogs.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = props => {
  let path = "/Dialogs/" + props.id;
  return (
    <div className={classes.chatsItems}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;

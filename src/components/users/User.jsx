import React from "react";
import classes from "../users/Users.module.css";
import userPhoto from "../../img/unnamed.png";
import { NavLink } from "react-router-dom";



let User = ({ user, followingIsProgresing, unfollow, follow }) => {
  return (
    <div>
      <span>
        <div className={classes.avatar}>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              alt=""
            ></img>
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingIsProgresing.some(id => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              UnFollow
            </button>
          ) : (
            <button
              disabled={followingIsProgresing.some(id => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <div>{user.name}</div>
        <div>{user.status}</div>
      </span>
      <span>
        <div>{"u.location.sity"}</div>
        <div>{"u.location.scountreyity"}</div>
      </span>
    </div>
  );
};

export default User;

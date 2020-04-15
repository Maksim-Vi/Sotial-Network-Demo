import React from 'react';
import classes from '../header/Header.module.css';
import { NavLink } from 'react-router-dom';

const Header =(props)=>{
    return (
        <header className={classes.header}>
            {/* <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Inkscape.logo.svg/390px-Inkscape.logo.svg.png' /> */}
            <div className={classes.lodinBlock}> 
                {props.isAuth  
                ? <div>{props.userLogin} <button className={classes.logout} onClick={props.deleteLogout}>Logout</button></div>
                : 
                <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header
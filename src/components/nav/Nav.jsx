import React from 'react';
import classes from '../nav/Nav.module.css'
import profileIMG from '../../img/nav/profile.png'
import usersIMG from '../../img/nav/users.png'
import messageIMG from '../../img/nav/message.png'
import newsIMG from '../../img/nav/news.png'
import musicIMG from '../../img/nav/music.png'
import settingsIMG from '../../img/nav/settings.png'
import { NavLink } from 'react-router-dom';


const Nav =()=>{
    return  (
        <nav className={classes.nav}>
            <ul>

                <li>
                    <NavLink to='/profile' activeClassName={classes.active}>
                        <div className={classes.img}>
                            <img  src={profileIMG} alt="" />
                            <div className={classes.items}>
                                <span>Profile</span>
                            </div>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/users' activeClassName={classes.active}>
                        <div className={classes.img}>
                            <img  src={usersIMG} alt="" />
                            <div className={classes.items}>
                                <span>Users</span>
                            </div>
                        </div>
                    </NavLink>
                </li>
                <li> 
                    <NavLink to='/dialogs' activeClassName={classes.active}>
                        <div className={classes.img}>
                            <img  src={messageIMG} alt="" />
                            <div className={classes.items}>
                                <span>Message</span>
                            </div>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/news' activeClassName={classes.active}>
                        <div className={classes.img}>
                            <img  src={newsIMG} alt="" />
                            <div className={classes.items}>
                                <span>News</span>
                            </div>
                        </div>
                    </NavLink>
                </li>
                <li>                    
                    <NavLink to='/music' activeClassName={classes.active}>
                        <div className={classes.img}>
                            <img  src={musicIMG} alt="" />
                            <div className={classes.items}>
                                <span>Music</span>
                            </div>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/settings' activeClassName={classes.active}>
                        <div className={classes.img}>
                            <img  src={settingsIMG} alt="" />
                            <div className={classes.items}>
                                <span>Settings</span>
                            </div>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )    
}

export default Nav
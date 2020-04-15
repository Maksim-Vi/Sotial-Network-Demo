import React from 'react'
import imgPreloder from '../../../img/preloader 4.gif';
import classes from './../../users/Users.module.css';

let Preloader = (props) => {
    return (
    <div className={classes.parent}>
        <div className={classes.block}>
            <img className={classes.block_img} src={imgPreloder} alt=""/>
        </div>
    </div>
    );
}

export default Preloader;

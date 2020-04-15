import React from 'react';
import classes from './Post.module.css'
import avatar from './../../../../img/noavatar_user.png'

const Post =(props)=>{
    //console.log(props)
    return  (
        <div className={classes.item}> 
                <img src={avatar} alt=""/>     
            <p>{props.messages}</p>
        </div>
    )    
}

export default Post
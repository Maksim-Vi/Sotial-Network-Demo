import React, { useState } from 'react';
import classes from '../Profile.module.css';
import avatar from './../../../img/noavatar_user.png';
import Edit from './../../../img/buttonEdit.png';
import ProfileStatusHook from './../profileStatus/ProfileStatusHook'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm';

// аватар
const AvatarPhoto = ({props}) =>{  
  
  const onSavePhoto = (e) => {
    if(e.target.files.length){
      props.saveMainPhotoFile(e.target.files[0])
    }
  }
  
  return <div className={classes.ContainerPhoto}>
  <div>
    <figure className={classes.Avatar}>
      {props.profile.photos.large === null ? (
        <img src={avatar} alt="" />
      ) : (
        <img src={props.profile.photos.large} alt="" />
      )}
    </figure>
  </div>
  {props.isOwner && 
    <div className={classes.containerButton}>
      <input type={"file"} onChange={onSavePhoto}/>
    </div>
    }
</div>
}

// данные по пользователю
const ProfileData = ({props,profile,setEditMode}) =>{
  return <div className={classes.ContainerDescription}>
        <div className={classes.AboutMeName}>
          <div>
            <h3>{profile.fullName}</h3>
          </div>
          <div className={classes.aboutMe}>
            <ProfileStatusHook
              status={props.status}
              updateUserStatus={props.updateUserStatus}
            />
          </div>
        </div>
          
      <div className={classes.SotialContainer}>
          <div className={classes.blickItem1}>
            {Object.keys(profile.contacts).map( (key) => {
              return <Contact key={key} concactTittle={key} concactValue={profile.contacts[key]}/>})}
          </div>
          <div className={classes.blickItem2}>
            <p>{"About me: "}{profile.aboutMe}</p>
            <p>{"Looking Job: "}{profile.lookingForAJob ? "Yes" : "No"}</p>
            {profile.lookingForAJob &&
              <p>{"Description: "}{profile.lookingForAJobDescription}</p>}
          </div>
          {props.isOwner &&
            <div className={classes.buttonEdit}><button onClick={setEditMode}><img src={Edit} alt=""/></button></div>
          }
        </div>
  </div>
}


// о себе
const AboutMe = ({props}) =>{
  return  <div className={classes.AboutMe}>
  <div>
    <h3>{props.profile.fullName}</h3>
  </div>
  <div className={classes.description}>
    <ProfileStatusHook
      status={props.status}
      updateUserStatus={props.updateUserStatus}
    />
  </div>
</div>
}

const Contact = ({concactTittle, concactValue}) =>{
  return <div><p className={classes.concactTittle}>{concactTittle}: </p>{concactValue}</div>
}

const ProfileInfo = (props) => {
  
  let [editMode , setEditMode] = useState(false);
  
  const onSubmit = (formData) =>{
    props.saveProfileData(formData)
      setEditMode(false)
  }

  return (
    <div  className={classes.ContainerProfileInfo}>
      <AvatarPhoto props={props} />
      {editMode 
        ? <ProfileDataForm initialValues={props.profile} profile={props.profile} setEditMode={()=>{setEditMode(false)}} onSubmit={onSubmit}/> 
        : <ProfileData props={props} profile={props.profile} setEditMode={()=>{setEditMode(true)}}/>}
    </div>
  );
};


export default ProfileInfo;

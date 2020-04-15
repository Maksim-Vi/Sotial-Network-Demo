import React from "react";
import ProfileInfo from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import classes from "./Profile.module.css";
import Preloader from "../common/preloader/preloader"



const Profile = (props) => {

  if(!props.profile){
    return <Preloader />
  }

  return (
    <div className={classes.MainContainer}>
        <ProfileInfo profile={props.profile} 
                    status={props.status} 
                    updateUserStatus={props.updateUserStatus}
                    saveProfileData={props.saveProfileData}
                    isOwner={props.isOwner}
                    saveMainPhotoFile={props.saveMainPhotoFile}/>
      <div className={classes.ContainerMyPosts}>
        <MyPostsContainer />
      </div>
    </div>
  );
};

export default Profile;

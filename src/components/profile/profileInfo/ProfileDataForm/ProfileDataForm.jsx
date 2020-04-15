import React from 'react';
import classes from '../../Profile.module.css';
import { CreateField, Input, Textarea } from '../../../validation/FormsControl/FormsControl';
import { reduxForm } from 'redux-form';
import classesError from '../../../Login/login.module.css'

const ProfileDataForm = ({handleSubmit,profile,error}) =>{
  return  (
    <div className={classes.ContainerDescription}>
        <div className={classes.AboutMeName}>
          <div className={classes.AboutMeNameForm}>
          Full Name:{CreateField("Full Name", "fullName", Textarea, [])}
          </div>
        </div>
          
    <form className={classes.SotialContainer} onSubmit={handleSubmit}>
        <div className={classes.blickItem1}>
          {Object.keys(profile.contacts).map( (key) => {
            return <div  key={key}>
              {key}: {CreateField(key, "contacts." + key, Input, [])}
            </div>
            })}
        </div>

        <div className={classes.blickItem2}>
          About me:{CreateField("About me", "aboutMe", Textarea, [])}
          Looking Job:{CreateField("", "lookingForAJob", Input, [], {type:"checkbox"})}
          Description:{CreateField("Description", "lookingForAJobDescription", Textarea, [])}
        </div>
    
        <div className={classes.buttonEdit}><button>Save</button></div>
        {error && ( <div className={classesError.formSummeryError}>{error}</div>)}
  </form>
  </div>
  )
}

const ProfileDataReduxForm  = reduxForm({form: 'profile-DataForm'})(ProfileDataForm)

export default ProfileDataReduxForm
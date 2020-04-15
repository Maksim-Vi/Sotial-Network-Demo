import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile, getUserStatus, updateUserStatus, saveProfileData, saveMainPhotoFile} from "../../redux/reducer/profile-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";


class ProfileContainer extends React.Component {

  refreshProfile(){
    let userID = this.props.match.params.userID;

    if (!userID){
      userID = this.props.autorizedUserId;
       if(!userID){
        this.props.history.push("/login")
        }
      //userID = 5779
    }
    this.props.getUserProfile(userID);
    this.props.getUserStatus(userID);
  }

  componentDidMount() {
   this.refreshProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userID !== prevProps.match.params.userID){
      this.refreshProfile();
    }
    
  }

  render() {
    return  (
      <div>
        <Profile {...this.props} 
                 isOwner={!this.props.match.params.userID} // псевдоистина или лож (! - если истина) (!! - если лож) показывать вложености если мой профиль
                 profile={this.props.profile} 
                 status={this.props.status} 
                 updateUserStatus={this.props.updateUserStatus}
                 saveProfileData={this.props.saveProfileData}
                 saveMainPhotoFile={this.props.saveMainPhotoFile}/>
      </div>
    );
  }

}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  autorizedUserId: state.auth.usersID,
  autorizedIsAuth: state.auth.isAuth
});

export default compose(
  connect (mapStateToProps, {getUserProfile, updateUserStatus, getUserStatus, saveProfileData, saveMainPhotoFile}),  //3
  withRouter                                    //2
)(ProfileContainer);                            //1

//--HOK--//  зарефактили выше в compose
// let withAutchRedirectComponent = withAuthRedirect(ProfileContainer);
// let withUrlDataComponent = withRouter(withAutchRedirectComponent);
//  connect (mapStateToProps, {getUserProfile})(withUrlDataComponent);

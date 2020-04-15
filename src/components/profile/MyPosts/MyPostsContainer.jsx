import {addPostActionCreater } from "./../../../redux/reducer/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import { compose } from 'redux';

// const MyPostsContainer = (props) => {

//   // Писали сами общение Контента с Постами

//   let state = props.store.getState();

//   let onAddPosts = () => {
  
//     props.store.dispatch(addPostActionCreater());

//   }

//   let onPostChange = (text) =>{

//     props.store.dispatch(updateNewPostTextActionCreater(text));
//   }

//   return (<MyPosts store = { props.store } addPost = {onAddPosts} updateNewPostText = {onPostChange}
//       posts={state.profilePage.postsData} 
//       newPostText={state.profilePage.newPostText}
//   />)
// };

// Создаем уже с библиотки react-redux функцию conect для общения межу Контентом с Постами

let mapStateToProps = (state) =>{
  return {
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.postsData
  }
}

let mapDispatchTooProps = (dispatch)=>{
  return {
    addPost: (PostMessage) =>{
      dispatch(addPostActionCreater(PostMessage));
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchTooProps)
  )(MyPosts)

import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {validationForm, maxLengthCreator} from './../../validation/validationForm';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from "../../validation/FormsControl/FormsControl";


const MyPosts = React.memo(props => {
  //console.log("yo");
  let postsElement = props.posts.map(p => (
    <Post messages={p.message} id={p.id} key={p.id} />
  ));

  let onAddPosts = values => {
    // пример с js обработка форм
    //let text = document.getElementById('nePost').value;
    props.addPost(values.PostMessage); // заменили на функцию dispatch в файле state
  };
  return (
    <div className={classes.MyPostsBlock}>
      <PostsReduserForm onSubmit={onAddPosts} />
      {postsElement}
    </div>
  );
});

const maxLength10 = maxLengthCreator(10);


const ProfileForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <h3>My posts</h3>
        <div>
          <Field
            name="PostMessage"
            placeholder="Enter your message"
            component={Textarea}
            cols="50"
            rows="2"
            validate={[validationForm, maxLength10]}
          />
        </div>
        <div>
          <button>Send</button>
        </div>
      </div>
    </form>
  );
};

const PostsReduserForm  = reduxForm({form: 'PostMessage'})(ProfileForm)

export default MyPosts;

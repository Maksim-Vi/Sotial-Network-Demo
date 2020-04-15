import React from "react";
import classes from "../dialogs/Dialogs.module.css";
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import PostMessage from './MessageForm'

const Dialogs = (props) => {

// мини база даных друзей для диалогов, вынесли в Index.js
// let dialogs = [];
// let messages = [];
let state = props.dialogsPage;

let DialogsElements = state.dialogs.map( dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />);
let MessagesElements = state.messages.map( message => <Message message={message.message} id={message.id} key={message.id} />);

  return (
    <div className={classes.dialogs}>
      <div className={classes.chats}>
        { DialogsElements }
        {/* <DialogItem name={dialogs[0].name} id={dialogs[0].id} />*/}
      </div>
      <div className={classes.messages}>
         {/* <Message message={messages [0].message} id={messages [0].id} />*/}
        <div>{ MessagesElements }</div>
        <div> 
         {/* <MessageReduxForm onSubmit={onSubmit} /> */}
         <PostMessage data={props}/>
        </div>
        </div>  
      </div>
  );
};


export default Dialogs;

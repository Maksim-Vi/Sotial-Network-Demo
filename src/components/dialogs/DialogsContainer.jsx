import {sendMessageCreater} from "./../../redux/reducer/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../HOK/withAuthRedirect";
import { compose } from "redux";



// const DialogsContainer = (props) => {

// let state = props.store.getState().dialogsPage;

// let sendMessageonClick = () =>{
//   //alert('send message')
//   props.store.dispatch(sendMessageCreater());
// }

// let newMessageChange = (Message) =>{
//   //alert ('change');
//   props.store.dispatch(updateNewMessageTextCreater(Message));
// }
//   return ( <Dialogs newMessageChange = {newMessageChange}  sendMessageonClick = {sendMessageonClick} 
//                 dialogsPage = {state}
//   /> );
// };

let mapStateToProps = (state) => {
  return{
    dialogsPage: state.dialogsPage,
  }
}

let mapDispatchTooProps = (dispatch) => {
  return{
    sendMessageonClick: (newMessageText) => {
      dispatch(sendMessageCreater(newMessageText));
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchTooProps),  //3
  withAuthRedirect                                //2
)(Dialogs);                                       //1

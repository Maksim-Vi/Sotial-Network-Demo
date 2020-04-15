import React from 'react'
import classes from "../dialogs/Dialogs.module.css";
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, validationForm } from '../validation/validationForm';
import { Textarea } from '../validation/FormsControl/FormsControl';

const maxLength100 = maxLengthCreator(100);

const MessageForm = (props) =>{

      return  (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.Form}>
                <Field  className={classes.FormField} 
                        placeholder = "Enter your message" 
                        component={Textarea}
                        name="message"
                        validate={[validationForm,maxLength100]} >
                </Field>
            </div>
            <div className={classes.buttonSend}>
                <button>Send</button>
            </div>
        </form>
    )
}

const MessageReduxForm  = reduxForm({form: 'message'})(MessageForm)

const PostMessage = (props) =>{
    
    const onSubmit = (values) =>{
        props.data.sendMessageonClick(values.message)
    }

    return <div>
        <MessageReduxForm onSubmit={onSubmit} />
    </div>
}

export default PostMessage
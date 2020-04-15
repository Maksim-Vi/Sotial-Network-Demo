import React from "react";
import classes from "./FormControl.module.css";
import { Field } from "redux-form";


const FormControl = ({input,meta,child,...props}) =>{
    const showError = meta.touched && meta.error;
    return(
        <div className={classes.formControl +" "+ (showError ? classes.error : "")}>
            <div>
               {props.children}
            </div>
           <div> 
                {(( showError && <span>{meta.error}</span>))}   
           </div>
        </div>
    )
}

export const Textarea = (props) =>{
    const {input,meta,child,...restProps} = props;
    return <FormControl className={classes.FormControl} {...props}><textarea {...input} {...restProps} /></FormControl> // <FormControl {...props}> - передаем пропсы от основной формы
}

export const Input = (props) =>{
    const {input,meta,child,...restProps}  = props ;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
           
}

export const CreateField = (placeholder, name, component, validate, props = {}, text="") => (
    <div className={classes.formText}>
        <Field placeholder={placeholder}
            name={name}
            component={component}
            {...props}
            validate={validate} /> {text}
    </div>
)

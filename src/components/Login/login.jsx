import React from 'react'
import classes from './login.module.css'
import { reduxForm } from 'redux-form'
import { Input, CreateField } from '../validation/FormsControl/FormsControl'
import { validationFormInput } from '../validation/validationForm'
import { connect } from 'react-redux'
import {postLogin, getCaprchaUrlSuccess} from '../../redux/reducer/auth-reducer'
import { Redirect } from 'react-router-dom'

const LoginForm = ({handleSubmit,captchaURL,error}) => {
  return (
    <form onSubmit={handleSubmit}>
      {CreateField("Email", "email", Input, [validationFormInput])}
      {CreateField("Password", "password", Input, [validationFormInput], {type: "password"})}
      {CreateField( null,"rememberMe", Input,[],{ type: "checkbox" }, "remember me")}
      {/* <Field placeholder={"Email"} name={"email"} component={Input} validate={[validationFormInput]}/> */}
      {/* если каптча присуцтвует отприсовать картинку */}
      {captchaURL && <img src={captchaURL} alt=""/>}
      {captchaURL && CreateField( "Symbol from image","captcha", Input,[validationFormInput],{})}
      
      {error && (
        <div className={classes.formSummeryError}>{error}</div>
      )}

      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm  = reduxForm({form: 'Login'})(LoginForm)



const Login = (props) => {

    // данные для програмиста с формы, что пришли с handleSubmit, в formData - данные с LoginForm с формы Field 
    const onSubmit = (formData) =>{
        props.postLogin(formData.email,formData.password,formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return (
        <Redirect to={"/profile"} />
        )
    }

    return ( <div className={classes.HeaderLog}>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL}/>  
    </div>    
    )
}

const mapStateToProps = (state) =>{
    return{
      captchaURL: state.auth.captchaURL,
      isAuth: state.auth.isAuth 
    }  
}

export default connect(mapStateToProps,{postLogin,getCaprchaUrlSuccess})(Login)
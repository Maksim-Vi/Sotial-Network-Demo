import React from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux';


let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

// Component - это компонента ту что передаем из вне 
// AuthRedirect - создаем новую компоненту и дальше пишем условие что будет повторятся при выхове хока
export const withAuthRedirect = (Component) =>{
    let AuthRedirect = (props) =>{
        if (!props.isAuth){
            return ( 
                <Redirect to={'/login'}/>
            )
        } 
        
        return <Component {...props}/> //...props - передать пропсы что пришли в основную компоненту
    }

    let CreatedWithAuthRedirect = connect(mapStateToProps)(AuthRedirect);

    return CreatedWithAuthRedirect
}
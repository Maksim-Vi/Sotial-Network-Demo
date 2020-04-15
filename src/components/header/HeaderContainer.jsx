import React from 'react';
import Header from './Header';
import {deleteLogout} from './../../redux/reducer/auth-reducer'
import { connect } from 'react-redux';


class HeaderComponent extends React.Component{
    render () {
        return <Header {...this.props} />             
    }
}

let mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
        userLogin: state.auth.userLogin,
        isFetching: state.usersPage.isFetching // проброс из стейта загрузчик
    };
  };

export default connect(mapStateToProps,{ deleteLogout })(HeaderComponent)
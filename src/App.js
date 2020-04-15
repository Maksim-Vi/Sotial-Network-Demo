import React from 'react';
import './App.css';
import HeaderComponent from './components/header/HeaderContainer';
import Nav from './components/nav/Nav';
import News from './components/news/News';
import Music from './components/music/Music';
import Settings from './components/settings/Settings';
import UsersContainer from './components/users/UsersContainer';
import Login from './components/Login/login';
import Preloader from './components/common/preloader/preloader';

import { Route, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {initializeApp} from './redux/reducer/app-reducer'

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/redux-state';
import { withSuspense } from './components/HOK/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/profile/ProfileContainer'));

class App extends React.Component {
 
  // вывести глабальную ошибку кода
  chatchAllUnhandleErrors = (reason,promise) =>{
    alert("Some errors occured")
  }

  componentDidMount(){
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.chatchAllUnhandleErrors);
  }

  componentWillUnmount(){
    window.removeEventListener("unhandledrejection", this.chatchAllUnhandleErrors);
  }

  render() {
  if (!this.props.initialized){
    return <Preloader />
  }
    return (
      <div className='app-container'>
        <HeaderComponent />
        <div className='app-wrapper' >
          <Nav />
          <div className='app-wrapper-content'>
              <Route path='/' render={() =><Redirect to={'/profile'} />}/>
              {/* <Route  path='/Profile' component={Profile} /> */}
              <Route path='/profile/:userID?' render={ withSuspense(ProfileContainer)}/>
              <Route path='/dialogs' render={ withSuspense(DialogsContainer)}/>
              <Route path='/users' render={() =><UsersContainer />}/>
              <Route path='/news' component={News} />
              <Route path='/music' component={Music} />
              <Route path='/settings' component={Settings} />
              <Route path='/login' render={() =><Login />}/>
              {/* <Route path='*' render={() =><div>404</div>}/> */}
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  initialized: state.app.initialized // c app-reduser проинециализирован или нет 
});

let AppContainer =  compose(
  withRouter,
  connect(mapStateToProps,{ initializeApp })
  )(App);

const MainApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default MainApp
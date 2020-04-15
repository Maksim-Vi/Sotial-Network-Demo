import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import profileReducer from "./reducer/profile-reducer";
import dialogsReducer from "./reducer/dialogs-reducer";
import sidebarReducer from "./reducer/sidebar-reducer";
import usersReducer from "./reducer/users-reducer";
import authReducer from "./reducer/auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form"
import AppReducer from "./reducer/app-reducer";

let reducers = combineReducers({
    app:AppReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,

    form:formReducer,
    
    auth: authReducer
    }
);


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));

//let store = createStore(reducers, applyMiddleware(thunkMiddleware)); // в будущем изменить state на store

window.store = store;

export default store;
import { getAuchMe } from './auth-reducer';

const SET_INITIALIZED = "SET_INITIALIZED";

let initialState = {
    initialized: false
};

const AppReducer = (state = initialState, action) =>{
    
    switch (action.type) {
        
        case SET_INITIALIZED:{
            return {
                ...state,
                initialized: true
            }
        }

        default:
            return state;
    }
} 

export const initializedSaccess = () => ({ type: SET_INITIALIZED})

export const initializeApp = () => (dispatch) =>{
    let Promise = dispatch(getAuchMe());
    Promise.then( ()=>{
        dispatch(initializedSaccess());
    })
}

export default AppReducer;
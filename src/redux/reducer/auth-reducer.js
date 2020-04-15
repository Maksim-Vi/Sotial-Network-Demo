import { AuchAPI, SecurityAPI } from '../../API/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const GET_CUPTCHA_URL = 'GET_CUPTCHA_URL';

let initialState = {

    usersID: null,
    userEmail: null,
    userLogin: null, 
    isAuth: false, // проверка залогинен или нет со старта нет
    isFetching: false, // значение отрсовки загружчика
    captchaURL: null
};


const authReducer = (state = initialState, action) =>{
    
    switch (action.type) {
        
        case SET_USER_DATA:{
            return {
                ...state,
                ...action.data,
            }
        }

        case TOGGLE_IS_FETCHING:{
            return {...state, isFetching: action.preloaderToggle}
        }

        case GET_CUPTCHA_URL:{
            return {...state,
                    captchaURL: action.captchaURL
                }
        }

        default:
            return state;
    }
} 

//--------------------------THUNK--------------------------//
export const setAuthUserData = (usersID, userEmail, userLogin, isAuth) => ({type: SET_USER_DATA, data:{usersID,userEmail,userLogin,isAuth}})
export const getCaprchaUrlSuccess = (captchaURL) => ({type: GET_CUPTCHA_URL, captchaURL})

export  const toggleIsFetching = (togglePreloader) => ({ type: TOGGLE_IS_FETCHING, preloaderToggle: togglePreloader })

export const getAuchMe = () => async (dispatch) => {
    dispatch(toggleIsFetching(true)); // если пошел запрос на сервер включаем гифку загрузки
    const response = await AuchAPI.getAuchMeAPI()
    // проверка на залогиненость если 0 все хорошо если 1 нет (данные прописаны бекендом)
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data // 2 раза дата потому что у нас переменная так названа и так же в базе данных. 1 дата это наша переменная куда записываем а потом что 
        dispatch(setAuthUserData(id, email, login, true));
        dispatch(toggleIsFetching(false)); // если пришел ответ от сервера выключаем гифку загрузки
    }
} 

export const postLogin = (email, password, rememberMe, captcha) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const response = await AuchAPI.postLogin(email, password, rememberMe,captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuchMe()) // задиспатчили проверку о себе после регистрации, что бы показались данные в профиле 
        dispatch(toggleIsFetching(false)); // если пришел ответ от сервера выключаем гифку загрузки
    } else {
        if(response.data.resultCode === 10){
            dispatch(getCaptcha()) // диспатчим запуск каптчи если ответ 10 и показываем ошибку
        }
        // если ответ не 10 а другой выводим ошибку другую 
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
        let action = stopSubmit("Login", { _error: message });
        dispatch(action);
    }
}

export const getCaptcha = () => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const response = await SecurityAPI.getCaptchaAPI()
    const captchaURL = response.data.url
    dispatch(getCaprchaUrlSuccess(captchaURL))
}

export const deleteLogout = () => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await AuchAPI.deleteLogout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
        dispatch(toggleIsFetching(false)); // если пришел ответ от сервера выключаем гифку загрузки
    }

}
        
export default authReducer;
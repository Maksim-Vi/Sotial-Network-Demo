import { profileAPI } from '../../API/api';
import { stopSubmit } from 'redux-form';

const ADD_POST = 'ADD_POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DEL_POST = 'DEL_POST';
const SET_PHOTO_SUCSSES = 'SET_PHOTO_SUCSSES';

let initialState = {
    postsData : [
        { id: 1, message: "это 1 пост" },
        { id: 2, message: "это 2 пост" },
        { id: 3, message: "это 3 пост" },
        { id: 4, message: "это 4 пост" },
        { id: 5, message: "это 5 пост" }
    ],
    newPostText: 'Write new Post',
    profile: null,
    status: ''
}


const profileReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ADD_POST: {
            let addNewPost = {
                id: 6,
                message: action.PostMessage
            }
            return {
                ...state,
                postsData: [...state.postsData, addNewPost], // создани новый скопированый ростДата и запушии новый пост командой addNewPost
            }; // создание копии стейта для перезаписи изменения значения
            //stateCopy.postsData = [...state.postsData]; // создание копии постов так как это массив и он отдельно создан от своего стейта
            //stateCopy.postsData.push(addNewPost);
            // занулили пост после написания его
            //stateCopy.newPostText = '';
            //return stateCopy; // по хорошему использовать break но и через ретупн будет ост. свитч без провала в кейсы
        }

        case SET_USERS_PROFILE:{
            return {...state, profile: action.profile};
        }

        case SET_STATUS:{
            return {...state, status: action.status};
        }

        case DEL_POST:{
           return {...state, postsData: state.postsData.filter( p => p.id !== action.postId)} 
        }

        case SET_PHOTO_SUCSSES:{
            return {...state, profile: {...state.profile, photos:action.photos}} 
         }
        default:
            return state;
    }

} 

// c файла NewPosts - перенесли функции записи и изменения ввода текста с формы
export const addPostActionCreater = (PostMessage) => ({type: ADD_POST, PostMessage})

// ----------еще нету этой функции, для тест кейса делали-----------
export const deletePost = (postId) => ({type: DEL_POST, postId})

//--------------------------THUNK--------------------------//
export const setUsersProfile = (profile) => ({type: SET_USERS_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS,status})
export const setPhotoSucsses = (photos) => ({type: SET_PHOTO_SUCSSES, photos})

// получить пользователя для профайла
export const getUserProfile = (userID) => async (dispatch) => {
    let response = await profileAPI.getUserProfileAPI(userID)
    dispatch(setUsersProfile(response.data)); // получить пользователей
} 

// получить статус пользователя
export const getUserStatus = (userID) => async (dispatch) => {
    try{
        let response = await profileAPI.getUserStatus(userID)
        dispatch(setStatus(response.data)); // получить пользователей
    } catch (error){
        debugger
    }
} 

//обновить статус пользователя
export const updateUserStatus = (status) => async (dispatch) => {
    try{
        let response = await profileAPI.updateStatesUser(status)

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status)); // получить status
        }
    } catch(error){
        debugger
        // console.log("Something happened");
    }  
} 

//обновить данные профиля (работа соцсети ...)
export const saveProfileData = (profile) => async (dispatch, setState) => {
    const userID = setState().auth.usersID
    const response = await profileAPI.saveProfileData(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userID)); // получить status
    } else{
        let action = stopSubmit("profile-DataForm", { _error: response.data.messages[0]});
        // для получения по разным ошибкам, нужно пропарсить response.data.messages[0] и получить от каждого ошибку, и в место фейсбука ставить свое имя
        // let action = stopSubmit("profile-DataForm", {"contacts": {"facebook": response.data.messages[0]}});
        dispatch(action);
        return Promise.reject(); // возвращает промис в ProfileInfo для onSubmit .then
    }
} 

export const saveMainPhotoFile = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(setPhotoSucsses(response.data.data.photos)); 
    }
} 

export default profileReducer;
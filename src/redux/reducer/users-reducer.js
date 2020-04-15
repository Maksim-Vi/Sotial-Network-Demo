import { usersAPI } from '../../API/api';
import {updateObjectInArray} from './../../utilits/objectHelpers'

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS ='SET_USERS';
const SET_CURRENT_PAGE ='SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRES = 'TOGGLE_IS_FOLLOWING_PROGRES';

let initialState = {
   users: [],
   pageSize: 5,
   totalUserCount:0, // изменить на 0 если нужно вытащить все страницы
   currentPage: 1,
   isFetching: false, // значение отрсовки загружчика
   followingIsProgresing: [] // создаем масив для айди человека кого фловим или анфоловим

};

const usersReducer = (state = initialState, action) =>{
    switch (action.type) {
        case FOLLOW:{
            return {
                ...state, 
                users: updateObjectInArray(state.users,"id",action.usersId,{followed:true})
                /*
                users: state.users.map( u => {
                    if (u.id === action.usersId){  // если айди совпало с айди пользователя не подписаного подписаться если нажата кнопка
                        return {...u, followed:true}
                    }
                    return u;
                } )
                */
            }
        }
        case UNFOLLOW:{
            return {
                ...state, 
                users: updateObjectInArray(state.users,"id",action.usersId,{followed:false})
                // users: state.users.map( u => {
                //     if (u.id === action.usersId){  // если айди совпало с айди пользователя не подписаного подписаться если нажата кнопка
                //         return {...u, followed:false}
                //     }
                //     return u;
                // } )
            }
        }
        case SET_USERS:{
            return {...state, users:action.users} // users: [...state.users, ...action.users] - склейка 2 массивов
        }
        case SET_CURRENT_PAGE:{
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT:{
            return {...state, totalUserCount: action.count}
        }
        case TOGGLE_IS_FETCHING:{
            return {...state, isFetching: action.preloaderToggle}
        }
        case TOGGLE_IS_FOLLOWING_PROGRES:{
            return {
                ...state, 
                followingIsProgresing: action.following // если нажали на подписка/отписка тогда
                ? [...state.followingIsProgresing, action.userId] // если тру -> добавить айди пользователя в массив followingIsProgresing для некликабельности кнопки
                : state.followingIsProgresing.filter(id => id !== action.userId) //если фалс -> удалить айди пользователя из массива followingIsProgresing для некликабельности кнопки
            }
        }
        default:
            return state;
    }
} 

//--------------------------ACTION-CREATER--------------------------//

export const followSuccess = (usersId) => ({type: FOLLOW, usersId})
export  const unfollowSuccess = (usersId) => ({ type: UNFOLLOW, usersId })
export  const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export  const toggleIsFollowingProgres = (following, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRES, following, userId })


//--------------------------THUNK--------------------------//

export  const setUsers = (users) => ({ type: SET_USERS, users })
export  const setTotalUsersCount = (totalUserCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUserCount })
export  const toggleIsFetching = (togglePreloader) => ({ type: TOGGLE_IS_FETCHING, preloaderToggle: togglePreloader })

export const requastUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true)); // если пошел запрос на сервер включаем гифку загрузки
    dispatch(setCurrentPage(currentPage));

    let data = await usersAPI.getUsersApi(currentPage, pageSize)
    dispatch(toggleIsFetching(false)); // если пришел ответ от сервера выключаем гифку загрузки
    dispatch(setUsers(data.items)); // получить пользователей
    dispatch(setTotalUsersCount(data.totalCount)); // получить количество пользователей
} 

const FollowUnFollowFlow = async (dispatch,userId,ApiMethod,actionCreator) => {
    dispatch(toggleIsFollowingProgres(true, userId));

    let response = await ApiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleIsFollowingProgres(false, userId));
}

export const follow = (userId) => async (dispatch) => {
    let ApiMethod = usersAPI.postFollowAPI.bind(usersAPI);
    let actionCreator = followSuccess;
    FollowUnFollowFlow(dispatch,userId,ApiMethod,actionCreator);
} 

export const unfollow = (userId) => async (dispatch) => {
    let ApiMethod = usersAPI.deleteUnfollowAPI.bind(usersAPI);
    let actionCreator = unfollowSuccess;
    FollowUnFollowFlow(dispatch,userId,ApiMethod,actionCreator);
} 

export default usersReducer;
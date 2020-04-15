import * as axios from 'axios'


const InstenceAPI = axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/', // обязательно такая запись иначе не работает baseURL
    headers:{
        "API-KEY":"aedbdfbc-2d8c-48e7-8be7-983e64025c44"
      } 
})

export const usersAPI = {
    getUsersApi(currentPage = 1,pageSize = 10) {
        return InstenceAPI.get(`users?page=${currentPage}&count=${pageSize}`)
        .then (response => {
            return response.data;
        })
    },
    postFollowAPI(id){
        return InstenceAPI.post(`follow/${id}`)
    },
    deleteUnfollowAPI(id,follow,toggleIsFollowingProgres){
        return InstenceAPI.delete(`follow/${id}`)
    }
}

export const profileAPI = {
    getUserProfileAPI(userID) {
        return InstenceAPI.get(`profile/` + userID)
    },
    getUserStatus(userID){
        return InstenceAPI.get(`profile/status/` + userID)
    },
    updateStatesUser(status){
        return InstenceAPI.put(`profile/status`, {
            status: status
        })
    },    
    saveProfileData(profile){
        return InstenceAPI.put(`profile`, profile)
    },
    // отправка фото на сервер
    savePhoto(photoFile){
        const formData = new FormData() // создали специальную форму, для axios
        formData.append("image",photoFile) // заапендили фото с параметром что указан в сервере image
        return InstenceAPI.put(`profile/photo`,formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }) // создали 3 параметром вложеность 
    }
}

export const AuchAPI = {
    getAuchMeAPI(){
        return InstenceAPI.get(`auth/me`)
    },
    postLogin(email,password,rememberMe=false,captcha=null){
        return InstenceAPI.post(`auth/login`,{email,password,rememberMe,captcha})
    },
    deleteLogout(){
        return InstenceAPI.delete(`auth/login`)
    }
}

export const SecurityAPI = {
    getCaptchaAPI(){
        return InstenceAPI.get(`security/get-captcha-url`)
    }
}
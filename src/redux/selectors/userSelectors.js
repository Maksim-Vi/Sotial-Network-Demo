export const getUsers = (state) =>{
    return  state.usersPage.users //  проброс из стейта отдаем в Users пользователей
}

export const getPageSize = (state) =>{
    return  state.usersPage.pageSize // проброс из стейта взяли с редюсера количество страниц
}

export const getTotalUserCount = (state) =>{
    return state.usersPage.totalUserCount // проброс из стейта сколько в базе данных пользовалелей
}

export const getCurrentPage = (state) =>{
    return state.usersPage.currentPage // проброс из стейта текущая страница
}

export const getIsFetching = (state) =>{
    return state.usersPage.isFetching // проброс из стейта загрузчик
}

export const getFollowingIsProgresing = (state) =>{
    return state.usersPage.followingIsProgresing // показывает фактическую страничку в погинации 
}


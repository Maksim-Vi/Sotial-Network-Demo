import React from 'react'
import Preloader from './../common/preloader/preloader'


// Component - это компонента ту что передаем из вне 
// AuthRedirect - создаем новую компоненту и дальше пишем условие что будет повторятся при выхове хока
export const withSuspense = (Component) =>{
    return (props) =>{
        return <React.Suspense fallback={<Preloader />}>
        <Component {...props} />
      </React.Suspense>
    }
}
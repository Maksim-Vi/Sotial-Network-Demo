export const updateObjectInArray = (item, objectName, itemId, properties) => {
    return item.map((u)=>{
        if (u[objectName] === itemId){  
            return {...u, ...properties}
        }
        return u;
    })
}

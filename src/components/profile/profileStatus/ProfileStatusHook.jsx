import React, {useState,useEffect} from "react";

const ProfileStatusHook = (props) => {

    let [editMode , setEditMode] = useState(false); // с библиотеки React hook (локальный стейт) запись массива с деструктуризацией editMode - элемент массива, сам false, setEditMode -  2 элемент массива, элемент что изменяет с  false на true
    let [status , setState] = useState(props.status); 

    useEffect(()=>{
        setState(props.status);
    }, [props.status]);


    const onMode = () =>{
        setEditMode(true);
    }

    const offMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onChangeStatus = (e) =>{
        setState(e.currentTarget.value);
    }

  return (
        <>
            {!editMode  &&
            <div>
                <span  onDoubleClick={onMode}>{props.status || "No status"}</span>
            </div>
            }
            {editMode &&
            <div>
                {/* value={this.state.status} - сначала запускаем статус тот что в локальном стейте, потом его перезаписываем с сервера   */}
                <input onChange={onChangeStatus} 
                       autoFocus={true} 
                       onBlur={offMode}
                       value={status} />
            </div>
            }
        </>
    )
};

export default ProfileStatusHook;

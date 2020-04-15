import profileReducer from "./reducer/profile-reducer";
import dialogsReducer from "./reducer/dialogs-reducer";
import sidebarReducer from "./reducer/sidebar-reducer";
 
 let store = {
    
    _state: {
        profilePage:{ 
            postsData : [
                { id: 1, message: "это 1 пост" },
                { id: 2, message: "это 2 пост" },
                { id: 3, message: "это 3 пост" },
                { id: 4, message: "это 4 пост" },
                { id: 5, message: "это 5 пост" }
            ],
            newPostText: 'Write new Post'
        },
        dialogsPage:{
            dialogs : [
                { id: 1, name: "Dima" },
                { id: 2, name: "Sara" },
                { id: 3, name: "Katya" },
                { id: 4, name: "Andrey" },
                { id: 5, name: "Micha" }
              ],    
             messages : [
                {id: 1, message: "Hi"},
                {id: 2, message: "how are you, man?"}, 
                {id: 3, message: "Hi"}, 
                {id: 4, message: "I'm fine"}
              ],
            newMessageText: ''
        },
        sidebar: {}
    },

    getState(){
        return this._state;
    },

    _callSubscriber() { 
        console.log('123')
    },

    subscribe (observer) {
        this._callSubscriber = observer;
    },

    dispatch (action){ // action.type === 'ADD-POST'

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}

window.store = store;
export default store



// video 40 - React JS Практика - добавление Сообщения -- 30-47min
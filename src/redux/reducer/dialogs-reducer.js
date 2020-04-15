const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState ={
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
      ]
}

const dialogsReducer = (state = initialState, action) =>{
    // let stateCopy; // --> вместо stateCopy помтапвили return 
    switch (action.type) {

        case SEND_MESSAGE: { 
            let newText = action.newMessageText; // записываем текст что вбит в форму 
            return {
                ...state,
                messages: [...state.messages, { id: 5, message: newText}] // вместо старой записи   stateCopy.messages.push({ id: 5, message: newText}); // пушим в dialogsPage
            }  
        }         
        default:
            return state;
    }    
} 

export const sendMessageCreater = (newMessageText) => ({type: SEND_MESSAGE, newMessageText })

export default dialogsReducer;
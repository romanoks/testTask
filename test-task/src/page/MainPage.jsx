import React, {useReducer} from "react"
import ChatComponent from "../components/chat/ChatComponent";
import ChatReducer from "../reducers/ChatReducer";

function MainPage () {

    const handleSend = (value) => {
        dispatch({type: 'send', payload: value})

    }

    const handleModalOk = (value) => {
        return new Promise((resolve, reject) => {
            if (value.length === 2
                && value[1].length > 0 && value[0].length > 0) {
                dispatch({type: 'addUser', payload: value})
                resolve('Success')
            } else
                reject('Error')
        })
    }

    const initialReducer = () => {
        let reducer = localStorage.getItem('chats')
        return reducer !== null ? JSON.parse(reducer) : {chat:[], users:[]};
    }

    const [state, dispatch] = useReducer(ChatReducer, initialReducer())

    const getNames = () => {
        let userString = localStorage.getItem("users");
        return (state.users.length === 0 ? userString === null ? [] : userString.split(',') : state.users);
    }

    return (
        <div>
            <ChatComponent
                chatObject={state}
                names={getNames()}
                handleSend={handleSend}
                handleModalOk={handleModalOk}
            />
        </div>
    )
}

export default MainPage;
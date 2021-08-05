function ChatReducer(state, action) {
    switch (action.type) {
        case 'send':
            state.chat.push(action.payload);
            localStorage.removeItem('chats');
            localStorage.setItem('chats', JSON.stringify(state))
            return state;
        case 'addUser':
            if (localStorage.getItem('users') === null) {
                localStorage.setItem('users', action.payload.join(','))
                action.payload.forEach(item => state.users.push(item));
            }
            return state
        default:
            throw new Error('Message')
    }
}

export default ChatReducer;
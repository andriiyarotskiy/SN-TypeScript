const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
    newMessageBody: string
}

export type MessageType = {
    message: string,
    id: number,
}
export type DialogsType = {
    name: string,
    id: string
}

export type ActionType = sendMessageCreatorType |
    updateNewMessageBodyCreatorType
export type sendMessageCreatorType = {
    type: typeof SEND_MESSAGE
}
export type updateNewMessageBodyCreatorType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY
    body: string
}

let initialState: DialogsPageType = {
    dialogs: [
        {name: "Andriy", id: '1'},
        {name: "Dimych", id: '2'},
        {name: "Vika", id: '3'},
        {name: "Alina", id: '4'},
        {name: "Maxim", id: '5'}
    ],
    messages: [
        {message: 'Hay', id: 1},
        {message: 'How are you?', id: 2},
        {message: 'Bye', id: 3},
        {message: 'Yo', id: 4},
        {message: 'Yo', id: 5},
    ],
    newMessageBody: ''
}

const dialogsReducer = (state = initialState, action: ActionType): DialogsPageType => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {message: body, id: 6}]
            }
        default:
            return state
    }
}

export const sendMessageCreator = (): sendMessageCreatorType => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (text: string): updateNewMessageBodyCreatorType =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: text})

export default dialogsReducer;
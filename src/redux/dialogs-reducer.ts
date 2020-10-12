const SEND_MESSAGE = 'SEND_MESSAGE'

export type DialogsPageType = {
    dialogs: DialogsType[]
    messages: Array<MessageType>
    newMessageBody?: string
}

export type MessageType = {
    message: string,
    id: number,
}
export type DialogsType = {
    name: string,
    id: string
}
export type sendMessageCreatorType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
export type ActionType = sendMessageCreatorType

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
    ]
}

const dialogsReducer = (state: DialogsPageType = initialState, action: ActionType): DialogsPageType => {

    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {message: action.newMessageBody, id: 6}]
            }
        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorType => ({
    type: SEND_MESSAGE,
    newMessageBody
})

export default dialogsReducer;
import {ActionType, DialogsPageType} from "./state";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'


const dialogsReducer = (state: DialogsPageType, action: ActionType) => {

    switch (action.type) {
        case "UPDATE_NEW_MESSAGE_BODY":
            state.newMessageBody = action.body
            return state
        case "SEND_MESSAGE":
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.messages.push({message: body, id: 6})
            return state
        default:
            return state
    }
}

export type sendMessageCreatorType = {
    type: typeof SEND_MESSAGE
}
export type updateNewMessageBodyCreatorType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY
    body: string
}

export const sendMessageCreator = (): sendMessageCreatorType => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (text: string): updateNewMessageBodyCreatorType =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: text})

export default dialogsReducer;
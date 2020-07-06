import profileReducer, {AddPostActionCreatorType, ChangeNewTextActionCreatorType} from "./profile-reducer";
import dialogsReducer, {sendMessageCreatorType, updateNewMessageBodyCreatorType} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

export type ActionType = AddPostActionCreatorType |  // Типизация action
    ChangeNewTextActionCreatorType | sendMessageCreatorType |
    updateNewMessageBodyCreatorType

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: sidebarType
}

export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
    newMessageBody: string
}
export type sidebarType = {}

export type MessageType = {
    message: string,
    id: number,
}
export type DialogsType = {
    name: string,
    id: string
}
export type PostsType = {
    message: string,
    id?: number,   // здесь для id необезательный тип указал
    likesCount: string,
}


export type StoreType = { // Типизация STORE
    _state: RootStateType
    _callSubscriber: (state: RootStateType) => void
    getState: () => RootStateType
    subscribe: (observer: (state: RootStateType) => void) => void // ????
    dispatch: (action: ActionType) => void // ????
}

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {message: 'Hello, how are you doing', likesCount: '10',},
                {message: 'Hay, nothing', likesCount: '25',},
                {message: 'learn React, nigger!', likesCount: '1',},
            ],
            newPostText: ''
        },
        dialogsPage: {
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
        },
        sidebar: {},
    },
    _callSubscriber(state: RootStateType) {
    },
    getState() {
        return this._state
    },
    subscribe(observer: (state: RootStateType) => void) { // <= Правильная ли типизация тут???
        this._callSubscriber = observer // Паттерн (наблюдатель)
    },
    dispatch(action) {
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }
}


export default store;




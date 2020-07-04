const ADD_POST = 'ADD-POST';
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';


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



// export type ActionType = { // Типизация action ????
//     type: string
//     newText: string
// }

export type StoreType = { // Типизация STORE
    _state: RootStateType
    _callSubscriber: (state: RootStateType) => void
    getState: () => RootStateType
    subscribe: (observer: (state: RootStateType) => void) => void // ????
    dispatch: (action: ProfileActionType) => void // ????
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
            ]
        },
        sidebar: {},
    },
    _callSubscriber(state:RootStateType) {
    },
    getState() {
        return this._state
    },
    subscribe (observer: (state: RootStateType) => void) { // <= Правильная ли типизация тут???
        this._callSubscriber = observer // Паттерн (наблюдатель)
    },
    dispatch(action) {
        if (action.type === ADD_POST) {  // Добавление постов в <My posts />
            let newPost: PostsType = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: '28'
            };
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber(this._state)
        } else if (action.type === CHANGE_NEW_TEXT) {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber(this._state)
        }
    }
}

export type AddPostActionCreatorType = {
    type: typeof ADD_POST
}
export type ChangeNewTextActionCreatorType = {
    type: typeof CHANGE_NEW_TEXT
    newText: string // ????
}

export type ProfileActionType = AddPostActionCreatorType | ChangeNewTextActionCreatorType

export const addPostActionCreator = (): AddPostActionCreatorType => ({type: ADD_POST})
export const changeNewTextActionCreator = (text: string): ChangeNewTextActionCreatorType =>
    ({type: CHANGE_NEW_TEXT, newText: text})



export default store;



/*export const changeNewText = (newText: string) => { // Обновление значения инпута через стейт

}*/
/*
export const subscribe = (observer: (state: RootStateType) => void) => {
    _callSubscriber = observer // Паттерн (наблюдатель)
}
*/






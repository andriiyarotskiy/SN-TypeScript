import {rerenderEntireTree} from "../render";

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: sidebarType
}

export type ProfilePageType = {
    posts: Array<PostsType>
}
export type DialogsPageType = {
    dialogs : Array<DialogsType>
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

let state: RootStateType = {
    profilePage: {
        posts: [
            {message: 'Hello, how are you doing', likesCount: '10',},
            {message: 'Hay, nothing', likesCount: '25',},
            {message: 'learn React, nigger!', likesCount: '1',},
        ]
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
}

export const addPost = (postText: string) => {  // postMessage - cюда заходит строка с текстАреа
    const newPost: PostsType = {
        id: 5,
        message: postText,
        likesCount: '28'
    };
    state.profilePage.posts.push(newPost)
    rerenderEntireTree(state)
}

export default state;



const ADD_POST = 'ADD-POST';
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';

export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type PostsType = {
    message: string,
    id?: number,   // здесь для id необезательный тип указал
    likesCount: string,
}

export type ActionType = AddPostActionCreatorType |  // Типизация action
    ChangeNewTextActionCreatorType

export type AddPostActionCreatorType = {
    type: typeof ADD_POST
}
export type ChangeNewTextActionCreatorType = {
    type: typeof CHANGE_NEW_TEXT
    newText: string
}

let initialState = {
    posts: [
        {message: 'Hello, how are you doing', likesCount: '10',},
        {message: 'Hay, nothing', likesCount: '25',},
        {message: 'learn React, nigger!', likesCount: '1',},
    ],
    newPostText: ''
}

const profileReducer = (state = initialState, action: ActionType): ProfilePageType => {

    switch (action.type) {
        case ADD_POST:
            let newPost: PostsType = {
                id: 5,
                message: state.newPostText,
                likesCount: '28'
            };
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case CHANGE_NEW_TEXT:
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}



export const addPostActionCreator = (): AddPostActionCreatorType => ({type: ADD_POST})
export const changeNewTextActionCreator = (text: string): ChangeNewTextActionCreatorType =>
    ({type: CHANGE_NEW_TEXT, newText: text})

export default profileReducer;
import {PostsType, ActionType, ProfilePageType} from "./state";

const ADD_POST = 'ADD-POST';
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';

const profileReducer = (state: ProfilePageType, action: ActionType) => {

    switch (action.type) {
        case "ADD-POST":
            let newPost: PostsType = {
                id: 5,
                message: state.newPostText,
                likesCount: '28'
            };
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case "CHANGE-NEW-TEXT":
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}

export type AddPostActionCreatorType = {
    type: typeof ADD_POST
}
export type ChangeNewTextActionCreatorType = {
    type: typeof CHANGE_NEW_TEXT
    newText: string
}

export const addPostActionCreator = (): AddPostActionCreatorType => ({type: ADD_POST})
export const changeNewTextActionCreator = (text: string): ChangeNewTextActionCreatorType =>
    ({type: CHANGE_NEW_TEXT, newText: text})

export default profileReducer;
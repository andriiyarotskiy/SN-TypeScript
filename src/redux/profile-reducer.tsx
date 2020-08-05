const ADD_POST = 'ADD-POST';
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

export type ProfileRootType = {
    profile: ProfileType | null
}

export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
    profile: ProfileType | null
}
export type PostsType = {
    message: string,
    id?: number,   // здесь для id необезательный тип указал
    likesCount: string,
}
export type ProfileType = {
    aboutMe: string,
    contacts?: ProfileContactType,
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: ProfilePhotosType
}

export type ProfileContactType = {
    facebook: string
    website: null | string
    vk: string
    twitter: string
    instagram: string
    youtube: null | string
    github: string
    mainLink: null | string
}
export type ProfilePhotosType = {
    small: string
    large: string
}


export type ActionType = AddPostActionCreatorType |  // Типизация action
    ChangeNewTextActionCreatorType | SetUserProfileACTYPE

export type AddPostActionCreatorType = {
    type: typeof ADD_POST
}
export type ChangeNewTextActionCreatorType = {
    type: typeof CHANGE_NEW_TEXT
    newText: string
}

let initialState: ProfilePageType = {
    posts: [
        {message: 'Hello, how are you doing', likesCount: '10',},
        {message: 'Hay, nothing', likesCount: '25',},
        {message: 'learn React, nigger!', likesCount: '1',},
    ],
    newPostText: '',
    profile: null
}

const profileReducer = (state = initialState, action: ActionType): ProfilePageType => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: '28'
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }

        case CHANGE_NEW_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state
    }
}


export const addPostActionCreator = (): AddPostActionCreatorType => ({type: ADD_POST})
export const changeNewTextActionCreator = (text: string): ChangeNewTextActionCreatorType =>
    ({type: CHANGE_NEW_TEXT, newText: text})

export type SetUserProfileACTYPE = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileACTYPE => ({type: SET_USER_PROFILE, profile})

export default profileReducer;
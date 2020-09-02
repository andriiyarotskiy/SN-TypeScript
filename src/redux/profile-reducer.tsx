import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

export type ProfileRootType = {
    profile: ProfileType | null
}

export type ProfilePageType = {
    posts: Array<PostsType>
    profile: ProfileType | null
    status: string
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
    SetUserProfileACTYPE | setStatusType

export type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}

let initialState: ProfilePageType = {
    posts: [
        {message: 'Hello, how are you doing', likesCount: '10',},
        {message: 'Hay, nothing', likesCount: '25',},
        {message: 'learn React, nigger!', likesCount: '1',},
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action: ActionType): ProfilePageType => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: '28'
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state
    }
}


export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({type: ADD_POST, newPostText})


export type SetUserProfileACTYPE = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type setStatusType = ReturnType<typeof setStatus>

export const setUserProfile = (profile: ProfileType): SetUserProfileACTYPE => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string) => ({type: SET_STATUS, status}) as const

export const getUserProfile = (userId: string) => (dispatch: any) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    })
}
export const getStatus = (userId: string) => (dispatch: any) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}
export const updateStatus = (status: string) => (dispatch: any) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}

export default profileReducer;
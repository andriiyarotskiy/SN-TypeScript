import {profileAPI, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {NullableType} from "../utils/typeAssist";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

export type ProfilePageType = {
    profile: any // NullableType<ProfileType>
    posts: Array<PostsType>
    status: string
}
export type PostsType = {
    message: string,
    id?: number,   // здесь для id необезательный тип указал
    likesCount: string,
}

export type ProfilePhotosType = {
    small: string
    large: string
}

export type ProfileContactType = {
    facebook: string
    website: NullableType<string>
    vk: string
    twitter: string
    instagram: string
    youtube: NullableType<string>
    github: string
    mainLink: NullableType<string>
}

export type KeyContactsType = Array<keyof ProfileContactType>

export type ProfileType = {
    aboutMe: string,
    contacts: ProfileContactType //ProfileContactType,
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: ProfilePhotosType
}

export type ActionType = AddPostActionCreatorType
    | SetUserProfileACTYPE
    | setStatusType
    | deletePostActionCreatorType
    | savePhotoSuccessType

export type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}

let initialState: ProfilePageType = {
    posts: [
        {message: 'Hello, how are you doing', likesCount: '10', id: 1},
        {message: 'Hay, nothing', likesCount: '25', id: 2},
        {message: 'learn React, nigger!', likesCount: '1', id: 3},
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action: ActionType): ProfilePageType => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                message: action.newPostText,
                likesCount: '28'
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
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
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state
    }
}


export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({type: ADD_POST, newPostText})
export const deletePost = (postId: number) => ({type: DELETE_POST, postId} as const)
export type SetUserProfileACTYPE = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileACTYPE => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string) => ({type: SET_STATUS, status}) as const
export const savePhotoSuccess = (photos: ProfilePhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos}) as const


export type deletePostActionCreatorType = ReturnType<typeof deletePost>
export type setStatusType = ReturnType<typeof setStatus>
export type savePhotoSuccessType = ReturnType<typeof savePhotoSuccess>


// THUNK
export const getUserProfile = (userId: string) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const getStatus = (userId: string) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error) {
        // catching error
    }
}
export const savePhoto = (file: Blob) => async (dispatch: Dispatch) => { // any!!!!!!!
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => { // any!!!!!!!
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;
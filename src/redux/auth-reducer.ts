import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";
import {NullableType} from "../utils/typeAssist";

const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'


export type SetAuthUserDataACTYPE = ReturnType<typeof setAuthUserData>
export type getCaptchaUrlACTYPE = ReturnType<typeof getCaptchaUrlSuccess>
type ActionType = SetAuthUserDataACTYPE | getCaptchaUrlACTYPE

export type AuthType = {
    id: NullableType<number>,
    email: NullableType<string>,
    login: NullableType<string>
    isAuth: boolean
    userId: NullableType<number>
    captchaUrl: NullableType<string>
}

let initialState: AuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    userId: 9460,
    captchaUrl: null // if null captcha is not required
    // isFetching: true,
}

const authReducer = (state = initialState, action: ActionType): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}
// ACTION CREATORS
export const setAuthUserData = (userId: NullableType<number>, email: NullableType<string>, login: NullableType<string>, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
} as const)

export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {
        captchaUrl
    }
} as const)

//THUNK
export const getAuthUserData = () => async (dispatch: Dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean) => async (dispatch: any) => {
    dispatch(stopSubmit("login", {_error: "Common error"}))
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const logout = () => async (dispatch: Dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))

    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}


export default authReducer;
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";

const SET_USER_DATA = 'SET_USER_DATA'


export type SetAuthUserDataACTYPE = ReturnType<typeof setAuthUserData>
type ActionType = SetAuthUserDataACTYPE

export type AuthType = {
    id: null | number,
    email: null | string,
    login: null | string
    isAuth: boolean
    userId: number | null
}

let initialState: AuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    userId: 9460
    // isFetching: true,
}

const authReducer = (state = initialState, action: ActionType): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
} as const)

//THUNK
export const getAuthUserData = () => async (dispatch: Dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(stopSubmit("login", {_error: "Common error"}))
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
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


export default authReducer;
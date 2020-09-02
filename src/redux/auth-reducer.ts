import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'


type SetAuthUserDataACTYPE = ReturnType<typeof setAuthUserData>
type ActionType = SetAuthUserDataACTYPE

export type AuthType = {
    id: null | number,
    email: null | string,
    login: null | string
    isAuth: boolean
}

let initialState: AuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
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



export const getAuthUserData = () => (dispatch: any) => {
    authAPI.me()
        .then((response) => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        });
}
export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
    authAPI.login(email, password, rememberMe)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        });
}
export const logout = () => (dispatch: any) => {
    authAPI.logout()
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))

            }
        });
}


export default authReducer;
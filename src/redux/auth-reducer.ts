const SET_USER_DATA = 'SET_USER_DATA'


type DataType = {
    userId: number,
    email: string,
    login: string
}
type SetAuthUserDataACTYPE = {
    type: typeof SET_USER_DATA,
    data: DataType
}
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
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}


export const setAuthUserData = (userId: number, email: string, login: string): ActionType => ({
    type: SET_USER_DATA,
    data: {userId, email, login}
})


export default authReducer;
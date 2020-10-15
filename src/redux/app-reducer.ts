import {getAuthUserData, SetAuthUserDataACTYPE} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'


type InitializeSuccessACTYPE = ReturnType<typeof initializedSuccess>
type ActionType = InitializeSuccessACTYPE | SetAuthUserDataACTYPE

export type AppType = {
    initialized: boolean
    globalError: null
}

let initialState: AppType = {
    initialized: false,
    globalError: null

}

const appReducer = (state = initialState, action: ActionType): AppType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS,
} as const)


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}
export default appReducer;
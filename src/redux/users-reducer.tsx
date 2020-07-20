const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

export type UsersPageType = {
    users: Array<UsersType>
}
export type UsersType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}
export type LocationType = {
    country: string,
    city: string
}

export type FollowACType = {
    type: typeof FOLLOW
    userId: number
}
export type UnfollowACType = {
    type: typeof UNFOLLOW
    userId: number
}
export type SetUsersACType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
export type UsersACTYPE = FollowACType | UnfollowACType | SetUsersACType

let initialState = {
    users: [] as Array<UsersType>,
}

const usersReducer = (state = initialState, action: UsersACTYPE): UsersPageType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        default:
            return state
    }
}


export const followAC = (userId: number): FollowACType => ({type: FOLLOW, userId})
export const unfollowAC = (userId: number): UnfollowACType =>
    ({type: UNFOLLOW, userId})
export const setUsersAC = (users: Array<UsersType>): SetUsersACType =>
    ({type: SET_USERS, users})

export default usersReducer;
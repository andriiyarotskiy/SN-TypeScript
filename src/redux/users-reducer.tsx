const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'

export type UsersPageType = {
    users: Array<UsersType>
    pagesize: number
    totalUsersCount: number
    currentPage: number
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
export type SetCurrentPageAC = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export type SetTotalUsersCountAC = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export type UsersACTYPE = FollowACType | UnfollowACType | SetUsersACType
    | SetCurrentPageAC
    | SetTotalUsersCountAC

let initialState = {
    users: [] as Array<UsersType>,
    pagesize: 4,
    totalUsersCount: 0,
    currentPage: 1,
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
                users: action.users
            }
        case SET_CURRENT_PAGE : { // TEST!!!!!
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT : { // TEST!!!!!
            return {...state, totalUsersCount: action.count}
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

export const currentPageAC = (currentPage: number): SetCurrentPageAC => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountAC => {
    return {type: SET_TOTAL_USERS_COUNT, count: totalUsersCount}
}

export default usersReducer;
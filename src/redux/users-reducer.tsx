import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


export type usersStatePageType = {
    usersPage: UsersPageType
}

export type UsersPageType = {
    users: Array<UsersType>
    pagesize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
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
export type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export type SetTotalUsersCountAC = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export type ToggleIsFetchingACType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export type ToggleFollowingProgressACTYPE = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export type UsersACTYPE = FollowACType | UnfollowACType | SetUsersACType
    | SetCurrentPageACType
    | SetTotalUsersCountAC
    | ToggleIsFetchingACType
    | ToggleFollowingProgressACTYPE

let initialState: UsersPageType = {
    users: [] as Array<UsersType>,
    pagesize: 4,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
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
        case TOGGLE_IS_FETCHING : { // TEST!!!!!
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS : {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}


export const followSuccess = (userId: number): FollowACType => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId: number): UnfollowACType =>
    ({type: UNFOLLOW, userId})
export const setUsers = (users: Array<UsersType>): SetUsersACType =>
    ({type: SET_USERS, users})

export const setCurrentPage = (currentPage: number): SetCurrentPageACType => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountAC => {
    return {type: SET_TOTAL_USERS_COUNT, count: totalUsersCount}
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingACType => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressACTYPE => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}
}
export const requestUsers = (page: number, pageSize: number) => (dispatch: any) => { // any dispatch
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    usersAPI.getUser(page, pageSize)
        .then((data) => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
}
export const follow = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId)
            // в посте withCredentials передается не вторым а третьим параметром
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            });
    }
}

export const unfollow = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unfollow(userId)
            // в посте withCredentials передается не вторым а третьим параметром
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            });
    }
}

export default usersReducer;
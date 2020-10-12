import {AppStateType} from "./redux-store";
import {createSelector} from 'reselect'
import {UsersType} from "./users-reducer";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users: UsersType[]) => {
    return users.filter((u: UsersType) => true)
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pagesize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

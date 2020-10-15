import React from "react";
import {connect} from "react-redux";
import {
    setCurrentPage,
    follow,
    unfollow, UsersPageType, toggleFollowingProgress, requestUsers,
} from "../../redux/users-reducer";
import Users from "./Users";
import {Preloader} from "../common/preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {AppStateType} from "../../redux/redux-store";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";

// type UsersContainerType = {
//     toggleIsFetching: (arg0: boolean) => void
//     setUsers: (items: any) => void
//     setTotalUsersCount: (totalCount: number) => void
//     setCurrentPage: (pageNumber: number) => void
//     pageSize: number
//     currentPage: number
//     isFetching: boolean
//     totalItemsCount: number
//     users: Array<UsersType>
//     follow: boolean
//     unfollow: boolean
// }

class UsersContainer extends React.Component<any, UsersPageType> { // первый пропсы && второй стейт
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}


// let mapStateToProps = (state: usersStatePageType) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pagesize,
//         totalItemsCount: state.usersPage.totalItemsCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }
let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<any>(
    WithAuthRedirect,
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage,
        toggleFollowingProgress, getUsers: requestUsers
    })
)(UsersContainer)

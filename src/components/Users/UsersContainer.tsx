import React from "react";
import {connect} from "react-redux";
import {
    setCurrentPage,
    follow,
    unfollow, UsersPageType, usersStatePageType, toggleFollowingProgress, getUsers,
} from "../../redux/users-reducer";
import Users from "./Users";
import {Preloader} from "../common/preloader/Preloader";
import {compose} from "redux";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";

// type UsersContainerType = {
//     toggleIsFetching: (arg0: boolean) => void
//     setUsers: (items: any) => void
//     setTotalUsersCount: (totalCount: number) => void
//     setCurrentPage: (pageNumber: number) => void
//     pageSize: number
//     currentPage: number
//     isFetching: boolean
//     totalUsersCount: number
//     users: Array<UsersType>
//     follow: boolean
//     unfollow: boolean
// }

class UsersContainer extends React.Component<any, UsersPageType> { // первый пропсы && второй стейт
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
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


let mapStateToProps = (state: usersStatePageType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pagesize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default compose<any>(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers})
)(UsersContainer)

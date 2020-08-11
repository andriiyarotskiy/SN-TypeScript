import React from "react";
import {connect} from "react-redux";
import {
    setCurrentPage,
    follow,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unfollow, UsersPageType, usersStatePageType,
} from "../../redux/users-reducer";
import Users from "./Users";
import {Preloader} from "../common/preloader/Preloader";
import {usersAPI} from "../../api/api";

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
        this.props.toggleIsFetching(true)
        usersAPI.getUser(this.props.currentPage, this.props.pageSize)
            .then((data) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount);
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        usersAPI.getUser(pageNumber, this.props.pageSize)
            .then((data) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            });
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
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
})(UsersContainer)
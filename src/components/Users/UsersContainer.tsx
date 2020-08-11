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
import axios from 'axios';
import Users from "./Users";
import {Preloader} from "../common/preloader/Preloader";

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
        axios.get<any>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
            {withCredentials: true})
            .then((response) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount);
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get<any>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,
            {withCredentials: true})
            .then((response) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
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
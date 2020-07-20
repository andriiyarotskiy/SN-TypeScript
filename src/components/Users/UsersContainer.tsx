import React from "react";
import Users from "./Users";
import {followAC, setUsersAC, unfollowAC} from "../../redux/users-reducer";
import { connect } from "react-redux";


let mapStateToProps = (state: any) => {
    return{
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return{
        follow: (userId: any) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: any) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: any) => {
            dispatch(setUsersAC(users))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
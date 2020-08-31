import React from 'react';
import Profile from "./Profile";
import {connect} from 'react-redux';
import {getUserProfile, ProfileType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter, Redirect} from 'react-router-dom';
import {AppStateType} from "../../redux/redux-store";
import {compose} from 'redux';
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    profile: ProfileType | null
    // isAuth: boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
}
type OwnPropsType = MapStatePropsType & MapDispatchPropsType

type RootPropsType = RouteComponentProps<PathParamsType> & OwnPropsType


class ProfileContainer extends React.Component<RootPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "2"
        }
        this.props.getUserProfile(userId)
    }

    render() {

        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    // isAuth: state.auth.isAuth
})

export default compose<any>(
    // WithAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getUserProfile}),
)(ProfileContainer)
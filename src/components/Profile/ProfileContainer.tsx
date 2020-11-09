import React from 'react';
import Profile from "./Profile";
import {connect} from 'react-redux';
import {
    getStatus,
    getUserProfile,
    ProfileType, savePhoto, saveProfile,
    updateStatus
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {AppStateType} from "../../redux/redux-store";
import {compose} from 'redux';
import {NullableType} from "../../utils/typeAssist";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    profile: NullableType<ProfileType>
    status: string
    authorizedUserId: NullableType<number>
    isAuth: boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId: number | null) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    savePhoto: any // ANY!!!!!!!!!!!!!!
    saveProfile: any
}
type OwnPropsType = MapStatePropsType & MapDispatchPropsType

type RootPropsType = RouteComponentProps<PathParamsType> & OwnPropsType


class ProfileContainer extends React.Component<RootPropsType> {

    refreshProfile() {
        let userId: number = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId || 0
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId.toString())
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<RootPropsType>, prevState: Readonly<{}>): void {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return (
            <div>
                <Profile
                    {...this.props}
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    savePhoto={this.props.savePhoto}
                />
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose<any>(
    withRouter,
    connect(mapStateToProps, {
        getUserProfile, getStatus, updateStatus,
        savePhoto, saveProfile
    }),
)(ProfileContainer)
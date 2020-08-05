import React from 'react';
import Profile from "./Profile";
import {connect} from 'react-redux';
import axios from "axios";
import {ProfileRootType, ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {AppStateType} from "../../redux/redux-store";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    profile: ProfileType | null
}
type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileType) => void
}
type OwnPropsType = MapStatePropsType & MapDispatchPropsType

type RootPropsType = RouteComponentProps<PathParamsType> & OwnPropsType


class ProfileContainer extends React.Component<RootPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        axios.get<any>(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then((response) => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({profile: state.profilePage.profile})

let WithUrlDataContainerComponentwithRouter = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponentwithRouter);

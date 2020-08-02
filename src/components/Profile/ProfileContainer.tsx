import React from 'react';
import Profile from "./Profile";
import {connect} from 'react-redux';
import axios from "axios";
import {ProfileStateType, setUserProfile, ProfilePageType} from "../../redux/profile-reducer";

class ProfileContainer extends React.Component<any, ProfilePageType> {
    componentDidMount() {
        axios.get<any>(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

let mapStateToProps = (state: ProfileStateType) => ({profile: state.profilePage.profile})

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);

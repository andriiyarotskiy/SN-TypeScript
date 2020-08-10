import React from 'react';
import s from './Header.module.css'
import Header from "./Header";
import {connect} from "react-redux";
import axios from "axios";
import {setAuthUserData, AuthStateType, AuthType} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps} from "react-router-dom";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchPropsType = {
    setAuthUserData: (id: number, email: string, login: string) => void
}
type RootPropsType = MapStatePropsType & MapDispatchPropsType


class HeaderContainer extends React.Component<RootPropsType> {
    componentDidMount() {
        axios.get<any>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then((response) => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    this.props.setAuthUserData(id, email, login);
                }
            });
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);

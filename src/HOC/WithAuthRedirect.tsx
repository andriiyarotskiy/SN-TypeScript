import React from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

type RedirectComponentTYPE = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export const WithAuthRedirect = (Component: React.ComponentType) => {
    class RedirectComponent extends React.Component<RedirectComponentTYPE> {
        render() {
            if (!this.props.isAuth) return <Redirect to={"/login"}/>
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}
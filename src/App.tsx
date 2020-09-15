import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from './components/Login/Login';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import { connect } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import { AppStateType } from "./redux/redux-store";
import { Preloader } from "./components/common/preloader/Preloader";

type AppType = {
    initialized: boolean
    initializeApp: () => boolean
}


class App extends React.Component<AppType> {

    componentDidMount() {
        this.props.initializeApp()
    }


    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className={'app-wrapper'}>
                <HeaderContainer />
                <Navbar />
                <div className={'app-wrapper-content'}>
                    <Route path='/dialogs' render={() =>
                        <DialogsContainer />}
                    />
                    <Route path='/profile/:userId?' render={() =>
                        <ProfileContainer />}
                    />
                    <Route path='/users' render={() =>
                        <UsersContainer />}
                    />
                    <Route path='/login' render={() =>
                        <Login />}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})


export default compose<any>(
    withRouter,
    connect(mapStateToProps, { initializeApp }))
    (App);

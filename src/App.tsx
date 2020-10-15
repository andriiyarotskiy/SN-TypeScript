import React from 'react';
import {HashRouter, Route, withRouter, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from './components/Login/Login';
import UsersContainer from "./components/Users/UsersContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import store, {AppStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/preloader/Preloader";
import {WithSuspense} from "./HOC/WithSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type AppType = {
    initialized: boolean
    initializeApp: () => boolean
}


class App extends React.Component<AppType> {

    catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
        alert("Some error occured")
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount(): void {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }


    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Navbar/>

                <div className={'app-wrapper-content'}>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>

                        <Route path='/dialogs' render={WithSuspense(DialogsContainer)}/>
                        <Route path='/profile/:userId?' render={WithSuspense(ProfileContainer)}/>
                        <Route path='/users' render={() =>
                            <UsersContainer/>}
                        />
                        <Route path='/login' render={() =>
                            <Login/>}
                        />
                        <Route path='*' render={() =>
                            <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<any>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))
(App);

const SamuraiJSApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SamuraiJSApp;

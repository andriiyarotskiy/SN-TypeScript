import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from './components/Dialogs/Dialogs';
import {ProfileActionType, RootStateType, StoreType} from "./redux/state";

type PropsType = {
    state: RootStateType
    dispatch: (action: ProfileActionType) => void
    store: StoreType
}

const App: React.FC<PropsType> = (props) => {

    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/dialogs' render={() => <Dialogs
                        store={props.store}
                    />}/>
                    <Route path='/profile' render={() =>
                        <Profile
                            profilePage={props.state.profilePage}
                            dispatch={props.dispatch}
                        />}
                    />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

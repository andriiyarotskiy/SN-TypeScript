import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from './components/Dialogs/Dialogs';
import {RootStateType} from "./redux/state";

type PropsType = {
    state: RootStateType
    addPost: () => void
    changeNewText: (newText: string) => void
}

const App: React.FC<PropsType> = (props) => {

    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/dialogs' render={() => <Dialogs
                        state={props.state.dialogsPage}
                    />}/>
                    <Route path='/profile' render={() => <Profile
                        profilePage={props.state.profilePage}
                        addPost={props.addPost}
                        changeNewText={props.changeNewText}
                    />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

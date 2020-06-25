import state, {subscribe} from "./redux/state";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, changeNewText, RootStateType} from "./redux/state";


let rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} changeNewText={changeNewText}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
rerenderEntireTree(state)


subscribe(rerenderEntireTree)


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "./storeContext";
import store from "./redux/redux-store";
import {ProfilePageType} from "./redux/profile-reducer";
import {DialogsPageType} from "./redux/dialogs-reducer";
import {sidebarType} from "./redux/sidebar-reducer";


let rerenderEntireTree = (state: { readonly "[$CombinedState]"?: undefined } & { profilePage: ProfilePageType ; dialogsPage: DialogsPageType; sidebarPage: sidebarType }) => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderEntireTree(store.getState())

store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree(store.getState())
})
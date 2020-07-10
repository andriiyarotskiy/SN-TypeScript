import React from "react";
import {
    sendMessageCreator,
    updateNewMessageBodyCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../storeContext";


const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>
            {
                (store:any) => { // ANY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    let state = store.getState().dialogsPage;
                    let onsendMessageCreator = () => {
                        store.dispatch(sendMessageCreator())
                    }
                    let onNewMessageChange = (body: string) => {
                        store.dispatch(updateNewMessageBodyCreator(body))
                    }
                    return <Dialogs
                        updateNewMessageBody={onNewMessageChange}
                        sendMessage={onsendMessageCreator}
                        dialogsPage={state}
                    />
                }
            }
        </StoreContext.Consumer>
    )
}

export default DialogsContainer;
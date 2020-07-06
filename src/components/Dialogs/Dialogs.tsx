import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import Message from "./Message/Message";
import DialogItem from "./DialogsItem/DialogsItem";
import {sendMessageCreator, StoreType, updateNewMessageBodyCreator} from "../../redux/state";


type DialogsType = {
    store: StoreType
}

const Dialogs = (props: DialogsType) => {

    let state = props.store.getState().dialogsPage // Прокинул state в компоненту

    let dialogElement = state.dialogs.map(d => <DialogItem key={d.id}
                                                           name={d.name}
                                                           id={d.id}/>)

    let messageElement = state.messages.map(m => <Message key={m.id}
                                                          message={m.message}/>)

    let newMessageBody = state.newMessageBody


    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElement}
            </div>
            <div className={s.messages}>
                <div>{messageElement}</div>
                <div>
                    <textarea
                        value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder={'send message'}
                    ></textarea>
                </div>
                <div>
                    <button onClick={onSendMessageClick}>Send Message</button>
                </div>

            </div>
        </div>

    )
}

export default Dialogs;
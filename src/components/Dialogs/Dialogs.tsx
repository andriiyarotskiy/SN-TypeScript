import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import Message from "./Message/Message";
import DialogItem from "./DialogsItem/DialogsItem";
import {DialogsPageType} from "../../redux/dialogs-reducer";
import {Redirect} from "react-router-dom";


type DialogsType = {
    dialogsPage: DialogsPageType
    sendMessage: () => void
    updateNewMessageBody: (body: string) => void
    isAuth: boolean
}

const Dialogs = (props: DialogsType) => {

    let state = props.dialogsPage

    let dialogElement = state.dialogs.map(d => <DialogItem key={d.id}
                                                           name={d.name}
                                                           id={d.id}/>)

    let messageElement = state.messages.map(m => <Message key={m.id}
                                                          message={m.message}/>)

    let newMessageBody = state.newMessageBody


    let onSendMessageClick = () => {
        props.sendMessage()
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.updateNewMessageBody(body)
    }

    if (!props.isAuth) return <Redirect to={"/login"}/>

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
                    >
                    </textarea>
                </div>
                <div>
                    <button onClick={onSendMessageClick}>Send Message</button>
                </div>

            </div>
        </div>

    )
}

export default Dialogs;
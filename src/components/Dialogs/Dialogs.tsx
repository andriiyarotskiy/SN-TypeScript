import React from "react";
import s from "./Dialogs.module.css"
import Message from "./Message/Message";
import DialogItem from "./DialogsItem/DialogsItem";
import {DialogsPageType} from "../../redux/dialogs-reducer";
import {Redirect} from "react-router-dom";
import AddMessegeForm from "./AddMessageForm/AddMessegeForm";


type DialogsType = {
    dialogsPage: DialogsPageType
    sendMessage: (newMessageBody: string) => void
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

    let addNewMessage = (values: any) => {
        props.sendMessage(values.newMessageBody)
    }

    if (!props.isAuth) return <Redirect to={"/login"}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElement}
            </div>
            <div className={s.messages}>

                <div>{messageElement}</div>
                <AddMessegeForm onSubmit={addNewMessage}/>
            </div>
        </div>

    )
}

export default Dialogs;
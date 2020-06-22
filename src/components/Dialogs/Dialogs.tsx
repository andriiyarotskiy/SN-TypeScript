import React, {createRef} from "react";
import s from "./Dialogs.module.css"
import Message from "./Message/Message";
import DialogItem from "./DialogsItem/DialogsItem";
import {DialogsPageType} from "../../redux/state";


type DialogsType = {
    state: DialogsPageType
}

const Dialogs = (props: DialogsType) => {

    let dialogElement = props.state.dialogs.map(d => <DialogItem key={d.id}
                                                                 name={d.name}
                                                                 id={d.id}/>)

    let messageElement = props.state.messages.map(m => <Message key={m.id}
                                                                message={m.message}/>)


    let MessageArea = createRef<HTMLTextAreaElement>()


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElement}
            </div>
            <div className={s.messages}>
                {messageElement}
                <textarea ref={MessageArea}></textarea>
                <button>Send Message</button>
            </div>
        </div>

    )
}

export default Dialogs;
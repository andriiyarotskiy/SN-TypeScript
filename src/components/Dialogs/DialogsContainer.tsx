import React from "react";
import {
    DialogsPageType,
    sendMessageCreator,
    updateNewMessageBodyCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";

type MapStatePropsType = {
    // isAuth: boolean;
    dialogsPage: DialogsPageType
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
        // isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator())
        },
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyCreator(body))
        }
    }
}
export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs);

import {ActionType} from "./store";

export type sidebarType = {}

let inititalState: sidebarType = {
    sidebar: {}
}

const sidebarReducer = (state = inititalState, action: ActionType): sidebarType => {

    return state
}

export default sidebarReducer;
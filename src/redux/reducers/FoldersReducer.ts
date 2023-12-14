import { FolderType } from "../../Models/FolderType";
import { SET_FOLDERS } from "../constants";
import {produce} from "immer"

interface FoldersState {
    folders: FolderType[]
}

const initialState: FoldersState = {
    folders: []
}

const foldersReducer = (state: FoldersState = initialState, action: any) => {
    switch (action.type) {
        case SET_FOLDERS:
            return {
                ...state,
                folders: action.folders
            }
            return produce(state, draftState => {
                draftState.folders = action.folders
            })
        default:
            return state;
    }
};
export default foldersReducer;
import { FolderType, UpdateFolderModel } from "../../Models/FolderType";
import {  SET_FOLDER, SET_FOLDERS, ADD_FOLDER, GET_FOLDERS, UPDATE_FOLDER } from "../constants";

export const setFolder = (folder?: FolderType) => ({
    type: SET_FOLDER,
    folder: folder
});

export const setFolders = (folders: FolderType[]) => ({
    type: SET_FOLDERS,
    folders: folders
});

export const addFolder = () => ({
    type: ADD_FOLDER,
});

export const getFolders = () => ({
    type: GET_FOLDERS,
});

export const updateFolder = (folder: UpdateFolderModel) => ({
    type: UPDATE_FOLDER,
    folder: folder
});
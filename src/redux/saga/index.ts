import { call, put, takeEvery} from "redux-saga/effects";
import { ADD_FOLDER, ADD_LINK, DELETE_FOLDER, DELETE_LINK, GET_ALL_LINKS, GET_FOLDERS, MOVE_LINK, SET_FOLDER,  SET_SEARCH, SET_SORTING, UPDATE_FOLDER, UPDATE_LINK } from "../constants";
import { getAllLinks, setAllLinks, setLinkToRemove, setSelectedLink, updateLink, updateLinks } from "../actions/LinkActionCreator";
import { getFolders, setFolder, setFolders} from "../actions/FolderActionCreator";
import { getLinks } from "../../Firebase/Link/getLinks";
import { LinkType } from "../../Models/LinkType";
import { FolderType } from "../../Models/FolderType";
import { getFoldersAsync } from "../../Firebase/folders/getFoldersAsync";
import { addFolder } from "../../Firebase/folders/addFolder";
import { updateLinkAsync } from "../../Firebase/Link/updateLinkAsync";
import { updateFolderAsync } from "../../Firebase/folders/updateFolderAsync";
import { deleteLinkAsync } from "../../Firebase/Link/deleteLinkAsync";
import { addLinkAsync } from "../../Firebase/Link/addLinkAsync";
import { deleteFolderAsync } from "../../Firebase/folders/deleteFolderAsync";

export function* getAllLinksSaga() {
    const links: LinkType[] = yield call(getLinks);
    yield put(setAllLinks(links));
    yield put(updateLinks());
}

export function* addLinkSaga(action: any) {
    yield call(addLinkAsync, action.id);
    yield put(getAllLinks());
    yield put(getFolders());
}

export function* updateLinkSaga(action: any) {
    yield call(updateLinkAsync, action.link);
    yield put(getAllLinks());
    yield put(setSelectedLink(undefined));
}

export function* moveLinkSaga(action: any) {
    yield put(updateLink(action.link));
    yield put(getFolders());
}

export function* updateLinksSaga() {
    yield put(updateLinks());
}

export function* deleteLinkSaga(action: any) {
    yield call(deleteLinkAsync, action.id);
    yield put(getAllLinks());
}

export function* addFolderSaga() {
    yield call(addFolder);
    yield put(getFolders());
}

export function* getFoldersSaga() {
    const folders: FolderType[] = yield call(getFoldersAsync);  
    yield put(setFolders(folders));
}

export function* updateFolderSaga(action: any) {
    yield call(updateFolderAsync, action.folder);
    yield put(getFolders());
}

export function* deleteFolderSaga(action: any) {
    yield call(deleteFolderAsync, action.id);
    yield put(setFolder(undefined));
    yield put(getFolders());
}


export default function* rootSaga() {
    yield takeEvery(SET_SORTING, updateLinksSaga);
    yield takeEvery(SET_SEARCH, updateLinksSaga);
    yield takeEvery(GET_ALL_LINKS, getAllLinksSaga);
    yield takeEvery(UPDATE_LINK, updateLinkSaga);
    yield takeEvery(ADD_LINK, addLinkSaga);
    yield takeEvery(DELETE_LINK, deleteLinkSaga);
    yield takeEvery(MOVE_LINK, moveLinkSaga);

    yield takeEvery(SET_FOLDER, updateLinksSaga);
    yield takeEvery(GET_FOLDERS, getFoldersSaga);
    yield takeEvery(ADD_FOLDER, addFolderSaga);
    yield takeEvery(UPDATE_FOLDER, updateFolderSaga);
    yield takeEvery(DELETE_FOLDER, deleteFolderSaga);
}
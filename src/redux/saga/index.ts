import { call, put, takeEvery} from "redux-saga/effects";
import { ADD_FOLDER, GET_ALL_LINKS, GET_FOLDERS, MOVE_LINK, SET_FOLDER,  SET_SEARCH, SET_SORTING, UPDATE_FOLDER, UPDATE_LINK } from "../constants";
import { getAllLinks, setAllLinks, updateLink, updateLinks } from "../actions/LinkActionCreator";
import { getFolders, setFolders} from "../actions/FolderActionCreator";
import { getLinks } from "../../Firebase/Link/getLinks";
import { LinkType } from "../../Models/LinkType";
import { FolderType } from "../../Models/FolderType";
import { getFoldersAsync } from "../../Firebase/folders/getFoldersAsync";
import { addFolder } from "../../Firebase/folders/addFolder";
import { updateLinkAsync } from "../../Firebase/Link/updateLinkAsync";
import { updateFolderAsync } from "../../Firebase/folders/updateFolderAsync";

export function* getAllLinksSaga() {
    const links: LinkType[] = yield call(getLinks);
    yield put(setAllLinks(links));
    yield put(updateLinks());
}

export function* addFolderSaga() {
    yield call(addFolder);
    yield put(getFolders());
}

export function* getFoldersSaga() {
    const folders: FolderType[] = yield call(getFoldersAsync);  
    yield put(setFolders(folders));
}

export function* updateLinkSaga(action: any) {
    yield call(updateLinkAsync, action.link);
    yield put(getAllLinks());
}

export function* moveLinkSaga(action: any) {
    yield put(updateLink(action.link));
    yield put(getFolders());
}

export function* updateFolderSaga(action: any) {
    yield call(updateFolderAsync, action.folder);
    yield put(getFolders());
}

export function* updateLinksSaga() {
    yield put(updateLinks());
}

export default function* rootSaga() {
    yield takeEvery(GET_ALL_LINKS, getAllLinksSaga);
    yield takeEvery(SET_SORTING, updateLinksSaga);
    yield takeEvery(SET_SEARCH, updateLinksSaga);
    yield takeEvery(SET_FOLDER, updateLinksSaga);
    yield takeEvery(UPDATE_LINK, updateLinkSaga);
    yield takeEvery(MOVE_LINK, moveLinkSaga);
    yield takeEvery(GET_FOLDERS, getFoldersSaga);
    yield takeEvery(ADD_FOLDER, addFolderSaga);
    yield takeEvery(UPDATE_FOLDER, updateFolderSaga);
}
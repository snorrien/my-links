import { call, put, takeEvery} from "redux-saga/effects";
import { ADD_FOLDER, GET_ALL_LINKS, GET_FOLDERS, SET_FOLDER,  SET_SEARCH, SET_SORTING, UPDATE_FOLDER, UPDATE_LINK } from "../constants";
import { getAllLinks, setAllLinks, updateLinks } from "../actions/LinkActionCreator";
import { getFolders, setFolders} from "../actions/FolderActionCreator";
import { getLinks } from "../../Firebase/Link/getLinks";
import { LinkType } from "../../Models/LinkType";
import { FolderType } from "../../Models/FolderType";
import { getFoldersAsync } from "../../Firebase/folders/getFoldersAsync";
import { addFolder } from "../../Firebase/folders/addFolder";
import { updateLinkAsync } from "../../Firebase/Link/updateLinkAsync";
import { updateFolderAsync } from "../../Firebase/folders/updateFolderAsync";

export function* fetchAllLinks() {
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
    yield put(getFolders());
}

export function* updateFolderSaga(action: any) {
    yield call(updateFolderAsync, action.folder);
    yield put(getFolders());
}

export function* callUpdateLinks() {
    yield put(updateLinks());
}

export default function* rootSaga() {
    yield takeEvery(GET_ALL_LINKS, fetchAllLinks);
    yield takeEvery(SET_SORTING, callUpdateLinks);
    yield takeEvery(SET_SEARCH, callUpdateLinks);
    yield takeEvery(SET_FOLDER, callUpdateLinks);
    yield takeEvery(UPDATE_LINK, updateLinkSaga);
    yield takeEvery(GET_FOLDERS, getFoldersSaga);
    yield takeEvery(ADD_FOLDER, addFolderSaga);
    yield takeEvery(UPDATE_FOLDER, updateFolderSaga);

  
}
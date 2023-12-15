import { call, put, takeEvery} from "redux-saga/effects";
import { GET_ALL_LINKS, GET_FOLDERS, SET_FOLDER,  SET_SEARCH, SET_SORTING } from "../constants";
import { setAllLinks, setFolders, updateLinks } from "../actions/LinkActionCreator";
import { getLinks } from "../../Firebase/Link/getLinks";
import { LinkType } from "../../Models/LinkType";
import { FolderType } from "../../Models/FolderType";
import { getFolders } from "../../Firebase/folders/getFolders";
import { getLinksCount } from "../../Firebase/Link/getLinksCount";

export function* fetchAllLinks() {
    const links: LinkType[] = yield call(getLinks);
    yield put(setAllLinks(links));
    yield put(updateLinks());
}

export function* fetchFolders() {
    const folders: FolderType[] = yield call(getFolders);
    
    yield put(setFolders(folders));
}

export function* callUpdateLinks() {
    yield put(updateLinks());
}

export default function* rootSaga() {
    yield takeEvery(GET_ALL_LINKS, fetchAllLinks);
    yield takeEvery(SET_SORTING, callUpdateLinks);
    yield takeEvery(SET_SEARCH, callUpdateLinks);
    yield takeEvery(SET_FOLDER, callUpdateLinks);
    yield takeEvery(GET_FOLDERS, fetchFolders);
}
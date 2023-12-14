import { call, put, takeEvery} from "redux-saga/effects";
import { GET_ALL_LINKS, SET_FOLDER_ID, SET_SEARCH, SET_SORTING } from "../constants";
import { setAllLinks, updateLinks } from "../actions/actionCreator";
import { getLinks } from "../../Firebase/Link/getLinks";
import { LinkType } from "../../Models/LinkType";

export function* fetchAllLinks() {
    const data: LinkType[] = yield call(getLinks);
    yield put(setAllLinks(data));
    console.log(setAllLinks);
    yield put(updateLinks());
}

export function* callUpdateLinks() {
    yield put(updateLinks());
}

export default function* rootSaga() {
    yield takeEvery(GET_ALL_LINKS, fetchAllLinks);
    yield takeEvery(SET_SORTING, callUpdateLinks);
    yield takeEvery(SET_SEARCH, callUpdateLinks);
    yield takeEvery(SET_FOLDER_ID, callUpdateLinks);
}
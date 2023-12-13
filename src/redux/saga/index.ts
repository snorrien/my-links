import { call, put, takeEvery} from "redux-saga/effects";
import { GET_ALL_LINKS } from "../constants";
import { setAllLinks } from "../actions/actionCreator";
import { getLinks } from "../../Firebase/Link/getLinks";
import { LinkType } from "../../Models/LinkModel";

export function* fetchAllLinks() {
    const data: LinkType[] = yield call(getLinks);
    yield put(setAllLinks(data));
}

export default function* rootSaga() {
    yield takeEvery(GET_ALL_LINKS, fetchAllLinks);
}
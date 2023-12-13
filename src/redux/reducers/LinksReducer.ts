import { LinkType } from "../../Models/LinkModel";
import { SET_ALL_LINKS, GET_LINKS_REQUEST, GET_ALL_LINKS,  GET_LINKS_LOADED} from "../constants";

interface LinksState {
    links: LinkType[],
    loading: boolean
}

const initialState: LinksState = {
    links: [],
    loading: false
}

const linksReducer = (state: LinksState = initialState, action: any) => {
    switch (action.type) {
        case SET_ALL_LINKS:
            return { ...state, posts: action.links }
        case GET_LINKS_REQUEST:
            return { ...state, loading: true }
        case  GET_LINKS_LOADED:
            return { ...state, loading: false }
        default:
            return state;
    }
};
export default linksReducer;
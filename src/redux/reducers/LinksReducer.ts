import { LinkSortField } from "../../Enums/LinkSortField";
import { LinkType } from "../../Models/LinkType";
import { SET_ALL_LINKS, GET_LINKS_REQUEST, GET_LINKS_LOADED, SET_LINKS, SET_FOLDER_ID, SET_SEARCH, SET_SORTING, UPDATE_LINKS } from "../constants";
import {produce} from "immer"


interface LinksState {
    allLinks: LinkType[],
    links: LinkType[],
    loading: boolean,
    folderId?: string,
    search: string,
    sortField?: LinkSortField
}

const initialState: LinksState = {
    allLinks: [],
    links: [],
    loading: false,
    search: ''
}

const filterLinks = (allLinks: LinkType[], search: string, folderId?: string, sortField?: LinkSortField) => {
    let links = [...allLinks];

    if (folderId) {
        links = links.filter(l => l.folderId === folderId);
    }

    if (search) {
        links = links.filter(l => l.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }

    if (sortField === LinkSortField.title) {
        links = links.sort((a, b) => a.title.localeCompare(b.title))
    } else {
        links = links.sort((a, b) => a.createDate < b.createDate ? -1 : 1)
    }

    return links;
}


const linksReducer = (state: LinksState = initialState, action: any) => {
    switch (action.type) {
        case SET_ALL_LINKS:
            return {
                ...state,
                allLinks: action.allLinks
            }
        case SET_FOLDER_ID:
            return {
                ...state,
                folderId: action.folderId
            }
        case SET_SEARCH:
            return produce(state, draftState => {
                draftState.search = action.search
            })
        case SET_SORTING:
            return {
                ...state,
                sortField: action.sortField
            }
        case UPDATE_LINKS:
            return {
                ...state,
                links: filterLinks(state.allLinks, state.search, state.folderId, state.sortField)
            }
        case GET_LINKS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_LINKS_LOADED:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};
export default linksReducer;
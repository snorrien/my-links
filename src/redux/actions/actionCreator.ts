import { LinkSortField } from "../../Enums/LinkSortField";
import { LinkType } from "../../Models/LinkType";
import { GET_ALL_LINKS, SET_ALL_LINKS, GET_LINKS_LOADED, GET_LINKS_REQUEST, SET_LINKS, SET_FOLDER_ID, SET_SEARCH, SET_SORTING, UPDATE_LINKS } from "../constants";

export const setAllLinks = (allLinks: LinkType[]) => ({
    type: SET_ALL_LINKS,
    allLinks: allLinks
});

export const getAllLinks = () => ({
    type: GET_ALL_LINKS,
});

export const setLinks = (links: LinkType[]) => ({
    type: SET_LINKS,
    links: links
});

export const updateLinks = () => ({
    type: UPDATE_LINKS,
});

export const setFolderId = (folderId?: string) => ({
    type: SET_FOLDER_ID,
    folderId: folderId
});

export const setSearch = (search?: string) => ({
    type: SET_SEARCH,
    search: search
});
export const setSorting = (sortField?: LinkSortField) => ({
    type: SET_SORTING,
    sortField: sortField
});

export const getLinksRequest = () => ({
    type: GET_LINKS_REQUEST,
});

export const linksLoaded = () => ({
    type: GET_LINKS_LOADED,
});


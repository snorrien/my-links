import { LinkSortField } from "../../Enums/LinkSortField";
import { LinkType, UpdateLinkModel } from "../../Models/LinkType";
import { GET_ALL_LINKS, SET_ALL_LINKS, GET_LINKS_LOADED, GET_LINKS_REQUEST, SET_SEARCH, SET_SORTING, UPDATE_LINKS, UPDATE_LINK } from "../constants";

export const setAllLinks = (allLinks: LinkType[]) => ({
    type: SET_ALL_LINKS,
    allLinks: allLinks
});

export const getAllLinks = () => ({
    type: GET_ALL_LINKS,
});

export const updateLinks = () => ({
    type: UPDATE_LINKS,
});

export const setSearch = (search?: string) => ({
    type: SET_SEARCH,
    search: search
});
export const setSorting = (sortField?: LinkSortField) => ({
    type: SET_SORTING,
    sortField: sortField
});

export const updateLink = (link: UpdateLinkModel) => ({
    type: UPDATE_LINK,
    link: link
});

export const getLinksRequest = () => ({
    type: GET_LINKS_REQUEST,
});

export const linksLoaded = () => ({
    type: GET_LINKS_LOADED,
});


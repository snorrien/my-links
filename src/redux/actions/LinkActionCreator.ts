import { LinkSortField } from "../../Enums/LinkSortField";
import { LinkType, UpdateLinkModel } from "../../Models/LinkType";
import { GET_ALL_LINKS, SET_ALL_LINKS, GET_LINKS_LOADED, GET_LINKS_REQUEST, SET_SEARCH, SET_SORTING, UPDATE_LINKS, UPDATE_LINK, MOVE_LINK, DELETE_LINK, ADD_LINK, SET_SELECTED_LINK, SET_LINK_TO_REMOVE } from "../constants";

export const addLink = (id?: string) => ({
    type: ADD_LINK,
    id: id
});

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

export const moveLink = (link: UpdateLinkModel) => ({
    type: MOVE_LINK,
    link: link
});

export const deleteLink = (id: string) => ({
    type: DELETE_LINK,
    id: id
});

export const getLinksRequest = () => ({
    type: GET_LINKS_REQUEST,
});

export const linksLoaded = () => ({
    type: GET_LINKS_LOADED,
});


export const setSelectedLink = (selectedLink?: LinkType) => ({
    type: SET_SELECTED_LINK,
    selectedLink: selectedLink
});

export const setLinkToRemove = (linkToRemove?: LinkType) => ({
    type: SET_LINK_TO_REMOVE,
    linkToRemove: linkToRemove
});


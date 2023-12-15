import { LinkSortField } from "../../Enums/LinkSortField";
import { FolderType } from "../../Models/FolderType";
import { LinkType } from "../../Models/LinkType";
import { GET_ALL_LINKS, SET_ALL_LINKS, GET_LINKS_LOADED, GET_LINKS_REQUEST, SET_LINKS, SET_FOLDER, SET_SEARCH, SET_SORTING, UPDATE_LINKS, SET_FOLDERS, GET_FOLDERS } from "../constants";

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

export const setFolder = (folder?: FolderType) => ({
    type: SET_FOLDER,
    folder: folder
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

export const setFolders = (folders: FolderType[]) => ({
    type: SET_FOLDERS,
    folders: folders
});

export const getFolders = () => ({
    type: GET_FOLDERS,
});
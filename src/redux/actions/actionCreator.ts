import { LinkType } from "../../Models/LinkModel";
import { GET_ALL_LINKS, SET_ALL_LINKS, GET_LINKS_LOADED, GET_LINKS_REQUEST } from "../constants";

export const setAllLinks = (payload: LinkType[]) => ({
    type: SET_ALL_LINKS,
});

export const getAllLinks = () => ({
    type: GET_ALL_LINKS,
});

export const getLinksRequest = () => ({
    type: GET_LINKS_REQUEST,
});

export const linksLoaded = () => ({
    type: GET_LINKS_LOADED,
});


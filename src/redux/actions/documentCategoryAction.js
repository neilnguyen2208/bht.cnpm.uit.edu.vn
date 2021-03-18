import {
    GET_DOCUMENT_CATEGORIES_REQUEST,
    GET_DOCUMENT_CATEGORIES_SUCCESS,
    GET_DOCUMENT_CATEGORIES_FAILURE,
    GET_DOCUMENT_CATEGORIES_HAVE_ALL_SUCCESS,
} from "../constants.js"

//my post
export function get_DocumentCategoriesRequest() {
    return {
        type: GET_DOCUMENT_CATEGORIES_REQUEST,
    }
}

export function get_DocumentCategoriesSuccess(data) {

    return {
        type: GET_DOCUMENT_CATEGORIES_SUCCESS,
        payload: data
    }
}

export function get_DocumentCategoriesHaveAllSuccess(data) {
    return {
        type: GET_DOCUMENT_CATEGORIES_HAVE_ALL_SUCCESS,
        payload: data
    }
}

export function get_DocumentCategoriesFailure(error) {
    return {
        type: GET_DOCUMENT_CATEGORIES_FAILURE,
        payload: error
    }
}


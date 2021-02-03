import {
    GET_DOC_CATEGORIES_REQUEST,
    GET_DOC_CATEGORIES_SUCCESS,
    GET_DOC_CATEGORIES_FAILURE
} from "../constants.js"

//my post
export function get_DocCategoriesRequest() {
    return {
        type: GET_DOC_CATEGORIES_REQUEST,
    }
}

export function get_DocCategoriesSuccess(data) {
    return {
        type: GET_DOC_CATEGORIES_SUCCESS,
        payload: data
    }
}

export function get_DocCategoriesFailure(error) {
    return {
        type: GET_DOC_CATEGORIES_FAILURE,
        payload: error
    }
}


import {
    GET_POST_CATEGORIES_REQUEST,
    GET_POST_CATEGORIES_SUCCESS,
    GET_POST_CATEGORIES_HAVE_ALL_SUCCESS,
    GET_POST_CATEGORIES_FAILURE
} from "../constants.js"

//my post
export function get_PostCategoriesRequest() {
    return {
        type: GET_POST_CATEGORIES_REQUEST,
    }
}

export function get_PostCategoriesSuccess(data) {
    return {
        type: GET_POST_CATEGORIES_SUCCESS,
        payload: data
    }
}


export function get_PostCategoriesHaveAllSuccess(data) {
    return {
        type: GET_POST_CATEGORIES_HAVE_ALL_SUCCESS,
        payload: data
    }
}

export function get_PostCategoriesFailure(error) {
    return {
        type: GET_POST_CATEGORIES_FAILURE,
        payload: error
    }
}


import {
    GET_SUBJECTS_REQUEST,
    GET_SUBJECTS_SUCCESS,
    GET_SUBJECTS_HAVE_ALL_SUCCESS,
    GET_SUBJECTS_FAILURE
} from "../constants.js"

//my post
export function get_DocumentSubjectsRequest() {
    return {
        type: GET_SUBJECTS_REQUEST,
    }
}

export function get_DocumentSubjectsSuccess(data) {
    return {
        type: GET_SUBJECTS_SUCCESS,
        payload: data
    }
}

export function get_DocumentSubjectsHaveAllSuccess(data) {
    return {
        type: GET_SUBJECTS_HAVE_ALL_SUCCESS,
        payload: data
    }
}
export function get_DocumentSubjectsFailure(error) {
    return {
        type: GET_SUBJECTS_FAILURE,
        payload: error
    }
}


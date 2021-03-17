import {
    GET_DOCUMENT_SUBJECTS_REQUEST,
    GET_DOCUMENT_SUBJECTS_SUCCESS,
    GET_DOCUMENT_SUBJECTS_FAILURE
} from "../constants.js"

//my post
export function get_DocumentSubjectsRequest() {
    return {
        type: GET_DOCUMENT_SUBJECTS_REQUEST,
    }
}

export function get_DocumentSubjectsSuccess(data) {
    return {
        type: GET_DOCUMENT_SUBJECTS_SUCCESS,
        payload: data
    }
}

export function get_DocumentSubjectsFailure(error) {
    return {
        type: GET_DOCUMENT_SUBJECTS_FAILURE,
        payload: error
    }
}


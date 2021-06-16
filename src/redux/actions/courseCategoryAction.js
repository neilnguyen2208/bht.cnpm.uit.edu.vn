import {
    GET_COURSE_FACULTIES_REQUEST,
    GET_COURSE_FACULTIES_SUCCESS,
    GET_COURSE_FACULTIES_FAILURE
} from "../constants.js"

//my post
export function get_CourseFacultiesRequest() {
    return {
        type: GET_COURSE_FACULTIES_REQUEST,
    }
}

export function get_CourseFacultiesSuccess(data) {
    return {
        type: GET_COURSE_FACULTIES_SUCCESS,
        payload: data
    }
}

export function get_CourseFacultiesFailure(error) {
    return {
        type: GET_COURSE_FACULTIES_FAILURE,
        payload: error
    }
}


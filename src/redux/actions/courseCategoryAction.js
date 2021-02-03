import {
    GET_COURSE_FALCUTY_CATEGORIES_REQUEST,
    GET_COURSE_FALCUTY_CATEGORIES_SUCCESS,
    GET_COURSE_FALCUTY_CATEGORIES_FAILURE
} from "../constants.js"

//my post
export function get_CourseFalcutyCategoriesRequest() {
    return {
        type: GET_COURSE_FALCUTY_CATEGORIES_REQUEST,
    }
}

export function get_CourseFalcutyCategoriesSuccess(data) {
    return {
        type: GET_COURSE_FALCUTY_CATEGORIES_SUCCESS,
        payload: data
    }
}

export function get_CourseFalcutyCategoriesFailure(error) {
    return {
        type: GET_COURSE_FALCUTY_CATEGORIES_FAILURE,
        payload: error
    }
}


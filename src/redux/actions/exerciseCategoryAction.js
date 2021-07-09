import {
    GET_EXERCISE_CATEGORIES_REQUEST,
    GET_EXERCISE_CATEGORIES_SUCCESS,
    GET_EXERCISE_CATEGORIES_HAVE_ALL_SUCCESS,
    GET_EXERCISE_CATEGORIES_FAILURE
} from "../constants.js"

//my post
export function get_ExerciseCategoriesRequest() {
    return {
        type: GET_EXERCISE_CATEGORIES_REQUEST,
    }
}

export function get_ExerciseCategoriesSuccess(data) {
    return {
        type: GET_EXERCISE_CATEGORIES_SUCCESS,
        payload: data
    }
}


export function get_ExerciseCategoriesHaveAllSuccess(data) {
    return {
        type: GET_EXERCISE_CATEGORIES_HAVE_ALL_SUCCESS,
        payload: data
    }
}

export function get_ExerciseCategoriesFailure(error) {
    return {
        type: GET_EXERCISE_CATEGORIES_FAILURE,
        payload: error
    }
}


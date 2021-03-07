import {
    GET_DAI_CUONG_COURSES_LIST_REQUEST,
    GET_DAI_CUONG_COURSES_LIST_SUCCESS,
    GET_DAI_CUONG_COURSES_LIST_FAILURE,

    GET_CS_NHOM_NGANH_COURSES_LIST_REQUEST,
    GET_CS_NHOM_NGANH_COURSES_LIST_SUCCESS,
    GET_CS_NHOM_NGANH_COURSES_LIST_FAILURE,

    GET_COURSES_LIST_REQUEST,
    GET_COURSES_LIST_SUCCESS,
    GET_COURSES_LIST_FAILURE,

    GET_MY_COURSES_REQUEST,
    GET_MY_COURSES_SUCCESS,
    GET_MY_COURSES_FAILURE,

    GET_COURSE_SEARCH_REQUEST,
    GET_COURSE_SEARCH_SUCCESS,
    GET_COURSE_SEARCH_FAILURE,


} from "../constants.js"


//my posts
export function get_MyCoursesRequest() {
    return {
        type: GET_MY_COURSES_REQUEST,
    }
}

export function get_MyCoursesSuccess(data) {
    return {
        type: GET_MY_COURSES_SUCCESS,
        payload: data
    }
}

export function get_MyCoursesFailure(error) {
    return {
        type: GET_MY_COURSES_FAILURE,
        payload: error
    }
}

//posts list 
export function get_CoursesListRequest() {
    return { type: GET_COURSES_LIST_REQUEST }
}

export function get_CoursesListSuccess(data) {
    return {
        type: GET_COURSES_LIST_SUCCESS,
        payload: data
    }
}

export function get_CoursesListFailure(error) {
    return {
        type: GET_COURSES_LIST_FAILURE,
        error: error
    }
}


//post search result
export function get_CourseSearchResultRequest() {
    return {
        type: GET_COURSE_SEARCH_REQUEST
    }
}

export function get_CourseSearchResultSuccess(data) {
    return {
        type: GET_COURSE_SEARCH_SUCCESS,
        payload: data
    }
}

export function get_CourseSearchResultFailure(error) {
    return {
        type: GET_COURSE_SEARCH_FAILURE,
        payload: error
    }
}

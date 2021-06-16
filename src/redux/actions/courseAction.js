import {

    GET_COURSES_LIST_REQUEST,
    GET_COURSES_LIST_SUCCESS,
    GET_COURSES_LIST_FAILURE,

    GET_MY_COURSES_REQUEST,
    GET_MY_COURSES_SUCCESS,
    GET_MY_COURSES_FAILURE,

    GET_COURSE_SEARCH_REQUEST,
    GET_COURSE_SEARCH_SUCCESS,
    GET_COURSE_SEARCH_FAILURE,
    GET_DC_COURSES_LIST_REQUEST,
    GET_DC_COURSES_LIST_SUCCESS,
    GET_DC_COURSES_LIST_FAILURE,
    GET_CSNN_COURSES_LIST_REQUEST,
    GET_CSNN_COURSES_LIST_SUCCESS,
    GET_CSNN_COURSES_LIST_FAILURE,
    GET_COURSE_TOPICS_WITH_EXCERCISES_REQUEST,
    GET_COURSE_TOPICS_WITH_EXCERCISES_SUCCESS,
    GET_COURSE_TOPICS_WITH_EXCERCISES_FAILURE,

    GET_COURSE_DETAIL_BY_ID_REQUEST,
    GET_COURSE_DETAIL_BY_ID_SUCCESS,
    GET_COURSE_DETAIL_BY_ID_FAILURE,

} from "../constants.js"


//my courses
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

//courses list 
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

//dai cuong
export function get_DCCoursesListRequest() {
    return { type: GET_DC_COURSES_LIST_REQUEST }
}

export function get_DCCoursesListSuccess(data) {
    return {
        type: GET_DC_COURSES_LIST_SUCCESS,
        payload: data
    }
}

export function get_DCCoursesListFailure(error) {
    return {
        type: GET_DC_COURSES_LIST_FAILURE,
        error: error
    }
}

//csnn list 
export function get_CSNNCoursesListRequest() {
    return { type: GET_CSNN_COURSES_LIST_REQUEST }
}

export function get_CSNNCoursesListSuccess(data) {
    return {
        type: GET_CSNN_COURSES_LIST_SUCCESS,
        payload: data
    }
}

export function get_CSNNCoursesListFailure(error) {
    return {
        type: GET_CSNN_COURSES_LIST_FAILURE,
        error: error
    }
}

//course search result
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

//course search result
export function get_CourseTopicsWithExercisesRequest() {
    return {
        type: GET_COURSE_TOPICS_WITH_EXCERCISES_REQUEST
    }
}

export function get_CourseTopicsWithExercisesSuccess(data) {
    return {
        type: GET_COURSE_TOPICS_WITH_EXCERCISES_SUCCESS,
        payload: data
    }
}

export function get_CourseTopicsWithExercisesFailure(error) {
    return {
        type: GET_COURSE_TOPICS_WITH_EXCERCISES_FAILURE,
        payload: error
    }
}

export function get_CourseDetailByIdRequest() {
    return {
        type: GET_COURSE_DETAIL_BY_ID_REQUEST
    }
}

export function get_CourseDetailByIdSuccess(data) {
    return {
        type: GET_COURSE_DETAIL_BY_ID_SUCCESS,
        payload: data
    }
}

export function get_CourseDetailByIdFailure(error) {
    return {
        type: GET_COURSE_DETAIL_BY_ID_FAILURE,
        payload: error
    }
}


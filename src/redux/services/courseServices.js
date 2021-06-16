import {

    //my courses
    get_MyCoursesRequest,
    get_MyCoursesSuccess,
    get_MyCoursesFailure,

    //coursess list 
    get_CoursesListRequest,
    get_CoursesListSuccess,
    get_CoursesListFailure,

    get_DCCoursesListRequest,
    get_DCCoursesListSuccess,
    get_DCCoursesListFailure,

    get_CSNNCoursesListRequest,
    get_CSNNDCCoursesListSuccess,
    get_CSNNDCCoursesListFailure,

    //courses search result 
    get_CourseSearchResultRequest,
    get_CourseSearchResultSuccess,
    get_CourseSearchResultFailure,
    get_CSNNCoursesListSuccess,
    get_CSNNCoursesListFailure,
} from "redux/actions/courseAction.js";
import { authRequest } from "utils/requestUtils";
import { generateSearchParam } from "utils/urlUtils";

export function uploadCourse(courses) {
    return dispatch => {

    }
}

export function getCourseByID(uid, pid) {
    return dispatch => {

    }
}

// my courses
export function getMyCourses() { //this API to get all approved document of a specific user.
    return dispatch => {
        dispatch(get_MyCoursesRequest());
    }
}

//courses list
export function getCoursesList(searchParamObject) {
    return dispatch => {
        dispatch(get_CoursesListRequest());
        authRequest.get(`/exercises/subjects?${generateSearchParam(searchParamObject)}`).then(response => {
            dispatch(get_CoursesListSuccess(response.data))
        }).catch(error => dispatch(get_CoursesListFailure(error)))
    }
}

export function getDCCoursesList() {
    return dispatch => {
        dispatch(get_DCCoursesListRequest());
        authRequest.get(`/exercises/subjects?subjectGroup=1`).then(response => {
            dispatch(get_DCCoursesListSuccess(response.data))
        }).catch(error => dispatch(get_DCCoursesListFailure(error)))
    }
}

export function getCSNNCoursesList() {
    return dispatch => {
        dispatch(get_CSNNCoursesListRequest());
        authRequest.get(`/exercises/subjects?subjectGroup=2`).then(response => {
            dispatch(get_CSNNCoursesListSuccess(response.data))
        }).catch(error => dispatch(get_CSNNCoursesListFailure(error)))
    }
}

//coursess search result
export function getCourseSearchResult(searchParamObject) {
    return dispatch => {
        dispatch(get_CourseSearchResultRequest());
    }
}


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

    //courses search result 
    get_CourseSearchResultRequest,
    get_CourseSearchResultSuccess,
    get_CourseSearchResultFailure,
    get_CSNNCoursesListSuccess,
    get_CSNNCoursesListFailure,
    get_CourseTopicsWithExercisesBySubjectIdRequest,
    get_CourseTopicsWithExercisesBySubjectIdSuccess,
    get_CourseTopicsWithExercisesBySubjectIdFailure,
    get_CourseDetailByIdRequest,
    get_CourseDetailByIdSuccess,
    get_CourseDetailByIdFailure,
    get_ExerciseByIdFailure,
    get_ExerciseByIdSuccess,
    get_ExerciseByIdRequest,
    get_CourseTopicsWithExercisesByExerciseIdRequest,
    get_CourseTopicsWithExercisesByExerciseIdSuccess,
    get_CourseTopicsWithExercisesByExerciseFailure,
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

export function getCourseTopicsWithExercisesBySubjectId(subjectId) {
    return dispatch => {
        dispatch(get_CourseTopicsWithExercisesBySubjectIdRequest());
        authRequest.get(`/exercises/topicsWithExercises?subjectID=5`).then(response => {
            dispatch(get_CourseTopicsWithExercisesBySubjectIdSuccess(response.data))
        }).catch(error => dispatch(get_CourseTopicsWithExercisesBySubjectIdFailure(error)))
    }
}

export function getCourseTopicsWithExercisesByExerciseId(exerciseId) {
    return dispatch => {
        dispatch(get_CourseTopicsWithExercisesByExerciseIdRequest());
        authRequest.get(`/exercises/subjects/fromExercise/${exerciseId}`).then(response => {
            dispatch(get_CourseTopicsWithExercisesByExerciseIdSuccess(response.data))
        }).catch(error => dispatch(get_CourseTopicsWithExercisesByExerciseFailure(error)));
    }
}


export function getCourseDetailById(courseId) {
    return dispatch => {
        dispatch(get_CourseDetailByIdRequest());
        authRequest.get(`/exercises/subjects?id=5`).then(response => {
            dispatch(get_CourseDetailByIdSuccess(response.data))
        }).catch(error => dispatch(get_CourseDetailByIdFailure(error)))
    }
}

export function getExerciseById(exerciseId) {
    return dispatch => {
        dispatch(get_ExerciseByIdRequest());
        authRequest.get(`/exercises/${exerciseId}`).then(response => {
            dispatch(get_ExerciseByIdSuccess(response.data))
        }).catch(error => dispatch(get_ExerciseByIdFailure(error)))
    }
}

//coursess search result
export function getCourseSearchResult(searchParamObject) {
    return dispatch => {
        dispatch(get_CourseSearchResultRequest());
    }
}


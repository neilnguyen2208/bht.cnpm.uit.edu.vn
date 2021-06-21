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
    get_ExerciseQuestionsRequest,
    get_ExerciseQuestionsSuccess,
    get_ExerciseQuestionsFailure,
    get_RelativePostsByExerciseIdRequest,
    get_RelativeDocumentsByExerciseIdRequest,
    get_RelativePostsByExerciseIdSuccess,
    get_RelativePostsByExerciseIdFailure,
    get_RelativeDocumentsByExerciseIdSuccess,
    get_RelativeDocumentsByExerciseIdFailure,
    get_CurrentUserExerciseStatisticRequest,
    get_CurrentUserExerciseStatisticSuccess,
    check_ExerciseQuestionsRequest,
    check_ExerciseQuestionsFailure,
    check_ExerciseQuestionsSuccess,
    update_ExerciseNoteReset,
    update_ExerciseNoteFailure,
    get_ExerciseNoteRequest,
    get_ExerciseNoteSuccess,
    get_ExerciseNoteFailure,
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
        authRequest.get(`/exercises/topicsWithExercises?subjectID=${subjectId}`).then(response => {
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

export function getCourseDetailById(subjectId) {
    return dispatch => {
        dispatch(get_CourseDetailByIdRequest());
        authRequest.get(`/exercises/subjects?id=${subjectId}`).then(response_1 => {
            let result_1 = response_1.data;
            dispatch(get_CourseDetailByIdSuccess(result_1))
        }).catch(error => dispatch(get_CourseDetailByIdFailure(error)))
    }
}

export function getExerciseById(exerciseId) {
    return dispatch => {
        dispatch(get_ExerciseByIdRequest());
        authRequest.get(`/exercises/${exerciseId}`).then(response => {
            authRequest.get(`/exercises/statistics?exerciseIDs=${exerciseId}`).then(response_2 => {
                dispatch(get_ExerciseByIdSuccess({ ...response.data, ...response_2.data[0] }))
            }).catch(error => dispatch(get_ExerciseByIdFailure(error)))
        })
    }
}

export function getCurrentUserExerciseStatistic(exerciseId) {
    return dispatch => {
        dispatch(get_CurrentUserExerciseStatisticRequest());
        authRequest.get(`/exercises/statistics/user?exerciseIDs=${exerciseId}`).then(response => {
            dispatch(get_CurrentUserExerciseStatisticSuccess(...response.data))
        }).catch(error => dispatch(get_ExerciseByIdFailure(error)))
    }
}

export function getExerciseQuestions(exerciseId) {
    return dispatch => {
        dispatch(get_ExerciseQuestionsRequest());
        authRequest.get(`/exercises/${exerciseId}/questionsAndAnswers`).then(response => {
            dispatch(get_ExerciseQuestionsSuccess(response.data))
        }).catch(error => dispatch(get_ExerciseQuestionsFailure(error)))
    }
}

export function checkExerciseAnswers(exerciseId, answersDTO) {
    return dispatch => {
        dispatch(check_ExerciseQuestionsRequest());
        authRequest.post(`/exercises/${exerciseId}/attempt`, JSON.stringify(answersDTO)).then(
            response => {
                dispatch(check_ExerciseQuestionsSuccess(response.data))
            }).catch(error => dispatch(check_ExerciseQuestionsFailure(error)))
    }
}

export function getRelativePostsByExerciseId(exerciseId) {
    return dispatch => {
        dispatch(get_RelativePostsByExerciseIdRequest());
        authRequest.get(`/posts/related?exerciseID=${exerciseId}`).then(response => {
            dispatch(get_RelativePostsByExerciseIdSuccess(response.data))
        }).catch(error => dispatch(get_RelativePostsByExerciseIdFailure(error)))
    }
}

export function getRelativeDocumentsByExerciseId(exerciseId) {
    return dispatch => {
        dispatch(get_RelativeDocumentsByExerciseIdRequest());
        authRequest.get(`/documents/related?exerciseID=${exerciseId}`).then(response => {
            dispatch(get_RelativeDocumentsByExerciseIdSuccess(response.data))
        }).catch(error => dispatch(get_RelativeDocumentsByExerciseIdFailure(error)))
    }
}

export function updateExerciseNote(exerciseId, noteContent) {
    return dispatch => {
        dispatch(update_ExerciseNoteReset());
        authRequest.put(`/exercises/${exerciseId}/notes`, JSON.stringify(noteContent)).then(response => {
            dispatch(update_ExerciseNoteFailure(response.data))
        }).catch(error => dispatch(update_ExerciseNoteFailure(error)))
    }
}

export function getExerciseNote(exerciseId) {
    return dispatch => {
        dispatch(get_ExerciseNoteRequest());
        authRequest.get(`/exercises/${exerciseId}/notes`).then(response => {
            dispatch(get_ExerciseNoteSuccess(response.data))
        }).catch(error => dispatch(get_ExerciseNoteFailure(error)))
    }
}

//coursess search result
export function getCourseSearchResult(searchParamObject) {
    return dispatch => {
        dispatch(get_CourseSearchResultRequest());
    }
}


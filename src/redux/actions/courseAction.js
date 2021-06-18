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
    GET_COURSE_TOPICS_WITH_EXCERCISES_BY_SUBJECT_ID_REQUEST,
    GET_COURSE_TOPICS_WITH_EXCERCISES_BY_SUBJECT_ID_SUCCESS,
    GET_COURSE_TOPICS_WITH_EXCERCISES_BY_SUBJECT_ID_FAILURE,

    GET_COURSE_TOPICS_WITH_EXCERCISES_BY_EXERCISE_ID_REQUEST,
    GET_COURSE_TOPICS_WITH_EXCERCISES_BY_EXERCISE_ID_SUCCESS,
    GET_COURSE_TOPICS_WITH_EXCERCISES_BY_EXERCISE_ID_FAILURE,

    GET_COURSE_DETAIL_BY_ID_REQUEST,
    GET_COURSE_DETAIL_BY_ID_SUCCESS,
    GET_COURSE_DETAIL_BY_ID_FAILURE,
    GET_EXERCISE_BY_ID_REQUEST,
    GET_EXERCISE_BY_ID_SUCCESS,
    GET_EXERCISE_BY_ID_FAILURE,

    GET_EXERCISE_QUESTIONS_REQUEST,
    GET_EXERCISE_QUESTIONS_SUCCESS,
    GET_EXERCISE_QUESTIONS_FAILURE,
    CHECK_EXERCISE_ANSWERS_REQUEST,
    CHECK_EXERCISE_ANSWERS_SUCCESS,
    CHECK_EXERCISE_ANSWERS_FAILURE,
    GET_CURRENT_USER_EXERCISE_STATISTIC_REQUEST,
    GET_CURRENT_USER_EXERCISE_STATISTIC_SUCCESS,
    GET_CURRENT_USER_EXERCISE_STATISTIC_FAILURE,
    CREATE_EXERCISE_NOTE_REQUEST,
    CREATE_EXERCISE_NOTE_SUCCESS,
    CREATE_EXERCISE_NOTE_FAILURE,
    UPDATE_EXERCISE_NOTE_REQUEST,
    UPDATE_EXERCISE_NOTE_SUCCESS,
    UPDATE_EXERCISE_NOTE_FAILURE,
    GET_RELATIVE_POSTS_BY_EXERCISE_ID_REQUEST,
    GET_RELATIVE_POSTS_BY_EXERCISE_ID_SUCCESS,
    GET_RELATIVE_POSTS_BY_EXERCISE_ID_FAILURE,
    GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_FAILURE,
    GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_SUCCESS,
    GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_REQUEST,
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

export function get_CourseTopicsWithExercisesBySubjectIdRequest() {
    return {
        type: GET_COURSE_TOPICS_WITH_EXCERCISES_BY_SUBJECT_ID_REQUEST
    }
}

export function get_CourseTopicsWithExercisesBySubjectIdSuccess(data) {
    return {
        type: GET_COURSE_TOPICS_WITH_EXCERCISES_BY_SUBJECT_ID_SUCCESS,
        payload: data
    }
}

export function get_CourseTopicsWithExercisesBySubjectIdFailure(error) {
    return {
        type: GET_COURSE_TOPICS_WITH_EXCERCISES_BY_SUBJECT_ID_FAILURE,
        payload: error
    }
}

export function get_CourseTopicsWithExercisesByExerciseIdRequest() {
    return {
        type: GET_COURSE_TOPICS_WITH_EXCERCISES_BY_EXERCISE_ID_REQUEST
    }
}

export function get_CourseTopicsWithExercisesByExerciseIdSuccess(data) {
    return {
        type: GET_COURSE_TOPICS_WITH_EXCERCISES_BY_EXERCISE_ID_SUCCESS,
        payload: data
    }
}

export function get_CourseTopicsWithExercisesByExerciseFailure(error) {
    return {
        type: GET_COURSE_TOPICS_WITH_EXCERCISES_BY_EXERCISE_ID_FAILURE,
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

export function get_ExerciseByIdRequest() {
    return {
        type: GET_EXERCISE_BY_ID_REQUEST
    }
}

export function get_ExerciseByIdSuccess(data) {
    return {
        type: GET_EXERCISE_BY_ID_SUCCESS,
        payload: data
    }
}

export function get_ExerciseByIdFailure(error) {
    return {
        type: GET_EXERCISE_BY_ID_FAILURE,
        payload: error
    }
}

export function get_ExerciseQuestionsRequest() {
    return {
        type: GET_EXERCISE_QUESTIONS_REQUEST
    }
}

export function get_ExerciseQuestionsSuccess(data) {
    return {
        type: GET_EXERCISE_QUESTIONS_SUCCESS,
        payload: data
    }
}

export function get_ExerciseQuestionsFailure(error) {
    return {
        type: GET_EXERCISE_QUESTIONS_FAILURE,
        payload: error
    }
}

export function check_ExerciseQuestionsRequest() {
    return {
        type: CHECK_EXERCISE_ANSWERS_REQUEST
    }
}

export function check_ExerciseQuestionsSuccess(data) {
    return {
        type: CHECK_EXERCISE_ANSWERS_SUCCESS,
        payload: data
    }
}

export function check_ExerciseQuestionsFailure(error) {
    return {
        type: CHECK_EXERCISE_ANSWERS_FAILURE,
        payload: error
    }
}

export function get_CurrentUserExerciseStatisticRequest() {
    return {
        type: GET_CURRENT_USER_EXERCISE_STATISTIC_REQUEST
    }
}

export function get_CurrentUserExerciseStatisticSuccess(data) {
    return {
        type: GET_CURRENT_USER_EXERCISE_STATISTIC_SUCCESS,
        payload: data
    }
}

export function get_CurrentUserExerciseStatisticFailure(error) {
    return {
        type: GET_CURRENT_USER_EXERCISE_STATISTIC_FAILURE,
        payload: error
    }
}

export function create_ExerciseNoteRequest() {
    return {
        type: CREATE_EXERCISE_NOTE_REQUEST
    }
}

export function create_ExerciseNoteSuccess(data) {
    return {
        type: CREATE_EXERCISE_NOTE_SUCCESS,
        payload: data
    }
}

export function create_ExerciseNoteFailure(error) {
    return {
        type: CREATE_EXERCISE_NOTE_FAILURE,
        payload: error
    }
}

export function update_ExerciseNoteRequest() {
    return {
        type: UPDATE_EXERCISE_NOTE_REQUEST
    }
}

export function update_ExerciseNoteSuccess(data) {
    return {
        type: UPDATE_EXERCISE_NOTE_SUCCESS,
        payload: data
    }
}

export function update_ExerciseNoteFailure(error) {
    return {
        type: UPDATE_EXERCISE_NOTE_FAILURE,
        payload: error
    }
}

export function get_RelativePostsByExerciseIdRequest() {
    return {
        type: GET_RELATIVE_POSTS_BY_EXERCISE_ID_REQUEST
    }
}

export function get_RelativePostsByExerciseIdSuccess(data) {
    return {
        type: GET_RELATIVE_POSTS_BY_EXERCISE_ID_SUCCESS,
        payload: data
    }
}

export function get_RelativePostsByExerciseIdFailure() {
    return {
        type: GET_RELATIVE_POSTS_BY_EXERCISE_ID_FAILURE
    }
}

export function get_RelativeDocumentsByExerciseIdRequest() {
    return {
        type: GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_REQUEST
    }
}

export function get_RelativeDocumentsByExerciseIdSuccess(data) {
    return {
        type: GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_SUCCESS,
        payload: data
    }
}

export function get_RelativeDocumentsByExerciseIdFailure() {
    return {
        type: GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_FAILURE
    }
}
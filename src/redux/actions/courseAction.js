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
    GET_EXERCISE_INFO_BY_ID_REQUEST,
    GET_EXERCISE_INFO_BY_ID_SUCCESS,
    GET_EXERCISE_INFO_BY_ID_FAILURE,

    GET_EXERCISE_QUESTIONS_REQUEST,
    GET_EXERCISE_QUESTIONS_SUCCESS,
    GET_EXERCISE_QUESTIONS_FAILURE,
    CHECK_EXERCISE_ANSWERS_REQUEST,
    CHECK_EXERCISE_ANSWERS_SUCCESS,
    CHECK_EXERCISE_ANSWERS_FAILURE,
    GET_CURRENT_USER_EXERCISE_STATISTIC_REQUEST,
    GET_CURRENT_USER_EXERCISE_STATISTIC_SUCCESS,
    GET_CURRENT_USER_EXERCISE_STATISTIC_FAILURE,
    UPDATE_EXERCISE_NOTE_SUCCESS,
    UPDATE_EXERCISE_NOTE_FAILURE,
    GET_RELATIVE_POSTS_BY_EXERCISE_ID_REQUEST,
    GET_RELATIVE_POSTS_BY_EXERCISE_ID_SUCCESS,
    GET_RELATIVE_POSTS_BY_EXERCISE_ID_FAILURE,
    GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_FAILURE,
    GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_SUCCESS,
    GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_REQUEST,
    UPDATE_TOC_SUCCESS,
    UPDATE_TOC_SET,
    GET_EXERCISE_NOTE_FAILURE,
    GET_EXERCISE_NOTE_SUCCESS,
    GET_EXERCISE_NOTE_REQUEST,
    UPDATE_EXERCISE_NOTE_RESET,
    REPORT_AN_EXERCISE_RESET,
    REPORT_AN_EXERCISE_SUCCESS,
    REPORT_AN_EXERCISE_FAILURE,
    RESOLVE_AN_EXERCISE_RESET,
    RESOLVE_AN_EXERCISE_FAILURE,
    RESOLVE_AN_EXERCISE_SUCCESS,
    CREATE_AN_EXERCISE_RESET,
    CREATE_AN_EXERCISE_FAILURE,
    CREATE_AN_EXERCISE_SUCCESS,
    GET_REPORTED_EXERCISES_REQUEST,
    GET_REPORTED_EXERCISES_SUCCESS,
    GET_REPORTED_EXERCISES_FAILURE,
    SET_TIME_NORMAL,
    SET_TIME_STOP,
    CREATE_EXERCISE_QUESTIONS_WITH_ANSWERS_RESET,
    CREATE_EXERCISE_QUESTIONS_WITH_ANSWERS_FAILURE,
    CREATE_EXERCISE_QUESTIONS_WITH_ANSWERS_SUCCESS,

    EDIT_EXERCISE_QUESTIONS_WITH_ANSWERS_RESET,
    EDIT_EXERCISE_QUESTIONS_WITH_ANSWERS_FAILURE,
    EDIT_EXERCISE_QUESTIONS_WITH_ANSWERS_SUCCESS,
    GET_EXERCISE_QUESTIONS_WITH_ANSWERS_RESET,
    GET_EXERCISE_QUESTIONS_WITH_ANSWERS_SUCCESS,
    GET_EXERCISE_QUESTIONS_WITH_ANSWERS_FAILURE,
    GET_EXERCISE_DIFFICULTY_TYPES_REQUEST,
    GET_EXERCISE_DIFFICULTY_TYPES_SUCCESS,
    GET_EXERCISE_DIFFICULTY_TYPES_FAILURE,
    GET_EXERCISE_SEARCH_REQUEST,
    GET_EXERCISE_SEARCH_SUCCESS,
    GET_EXERCISE_SEARCH_FAILURE,
    GET_EXERCISE_INFO_FOR_EDIT_BY_ID_REQUEST,
    GET_EXERCISE_INFO_FOR_EDIT_BY_ID_SUCCESS,
    GET_EXERCISE_INFO_FOR_EDIT_BY_ID_FAILURE,
    PUT_EDIT_AN_EXERCISE_INFO_RESET,
    PUT_EDIT_AN_EXERCISE_INFO_SUCCESS,
    PUT_EDIT_AN_EXERCISE_INFO_FAILURE,
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

export function get_AnExerciseInfoByIdRequest() {
    return {
        type: GET_EXERCISE_INFO_BY_ID_REQUEST
    }
}

export function get_AnExerciseInfoByIdSuccess(data) {
    return {
        type: GET_EXERCISE_INFO_BY_ID_SUCCESS,
        payload: data
    }
}

export function get_AnExerciseInfoByIdFailure(error) {
    return {
        type: GET_EXERCISE_INFO_BY_ID_FAILURE,
        payload: error
    }
}

export function get_AnExerciseInfoForEditByIdRequest() {
    return {
        type: GET_EXERCISE_INFO_FOR_EDIT_BY_ID_REQUEST
    }
}

export function get_AnExerciseInfoForEditByIdSuccess(data) {
    return {
        type: GET_EXERCISE_INFO_FOR_EDIT_BY_ID_SUCCESS,
        payload: data
    }
}

export function get_AnExerciseInfoForEditByIdFailure(error) {
    return {
        type: GET_EXERCISE_INFO_FOR_EDIT_BY_ID_FAILURE,
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

export function get_ExerciseNoteRequest() {
    return {
        type: GET_EXERCISE_NOTE_REQUEST
    }
}

export function get_ExerciseNoteSuccess(data) {
    return {
        type: GET_EXERCISE_NOTE_SUCCESS,
        payload: data
    }
}

export function get_ExerciseNoteFailure(error) {
    return {
        type: GET_EXERCISE_NOTE_FAILURE,
        payload: error
    }
}

export function update_ExerciseNoteReset() {
    return {
        type: UPDATE_EXERCISE_NOTE_RESET
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

export function post_ReportAnExerciseReset() {
    return {
        type: REPORT_AN_EXERCISE_RESET
    }
}

export function post_ReportAnExerciseSuccess() {
    return {
        type: REPORT_AN_EXERCISE_SUCCESS
    }
}

export function post_ReportAnExerciseFailure() {
    return {
        type: REPORT_AN_EXERCISE_FAILURE
    }
}

export function get_ReportedExercisesRequest() {
    return {
        type: GET_REPORTED_EXERCISES_REQUEST,
    }
}

export function get_ReportedExercisesSuccess(data) {
    return {
        type: GET_REPORTED_EXERCISES_SUCCESS,
        payload: data
    }
}

export function get_ReportedExercisesFailure() {
    return {
        type: GET_REPORTED_EXERCISES_FAILURE
    }
}

export function post_ResolveAnExerciseReset() {
    return {
        type: RESOLVE_AN_EXERCISE_RESET
    }
}

export function post_ResolveAnExerciseSuccess() {
    return {
        type: RESOLVE_AN_EXERCISE_SUCCESS
    }
}

export function post_ResolveAnExerciseFailure() {
    return {
        type: RESOLVE_AN_EXERCISE_FAILURE
    }
}

export function post_CreateAnExerciseReset() {
    return {
        type: CREATE_AN_EXERCISE_RESET
    }
}

export function post_CreateAnExerciseSuccess(data) {
    return {
        type: CREATE_AN_EXERCISE_SUCCESS,
        payload: data
    }
}

export function post_CreateAnExerciseFailure() {
    return {
        type: CREATE_AN_EXERCISE_FAILURE
    }
}

//offline action for update exercise Toc
export function update_QuestionsToCReset() {
    return {
        type: UPDATE_TOC_SET,
    }
}

export function update_QuestionsToCSucess(data) {
    return {
        type: UPDATE_TOC_SUCCESS,
        payload: data
    }
}

export function create_AQuestionWithAnswersReset() {
    return {
        type: CREATE_EXERCISE_QUESTIONS_WITH_ANSWERS_RESET,
    }
}

export function create_AQuestionWithAnswersSuccess(data) {
    return {
        type: CREATE_EXERCISE_QUESTIONS_WITH_ANSWERS_SUCCESS,
        payload: data
    }
}

export function create_AQuestionWithAnswersFailure() {
    return {
        type: CREATE_EXERCISE_QUESTIONS_WITH_ANSWERS_FAILURE,
    }
}

export function edit_ExerciseQuestionsWithAnswersReset() {
    return {
        type: EDIT_EXERCISE_QUESTIONS_WITH_ANSWERS_RESET,
    }
}

export function edit_ExerciseQuestionsWithAnswersSuccess(data) {
    return {
        type: EDIT_EXERCISE_QUESTIONS_WITH_ANSWERS_SUCCESS,
        payload: data
    }
}

export function edit_ExerciseQuestionsWithAnswersFailure() {
    return {
        type: EDIT_EXERCISE_QUESTIONS_WITH_ANSWERS_FAILURE,
    }
}

export function put_EditAnExerciseInfoReset() {
    return {
        type: PUT_EDIT_AN_EXERCISE_INFO_RESET,
    }
}

export function put_EditAnExerciseInfoSuccess(data) {
    return {
        type: PUT_EDIT_AN_EXERCISE_INFO_SUCCESS,
        payload: data
    }
}

export function put_EditAnExerciseInfoFailure() {
    return {
        type: PUT_EDIT_AN_EXERCISE_INFO_FAILURE,
    }
}

export function get_AnExerciseQuestionsWithAnswersReset() {
    return {
        type: GET_EXERCISE_QUESTIONS_WITH_ANSWERS_RESET,
    }
}

export function get_AnExerciseQuestionsWithAnswersSuccess(data) {
    return {
        type: GET_EXERCISE_QUESTIONS_WITH_ANSWERS_SUCCESS,
        payload: data
    }
}

export function get_AnExerciseQuestionsWithAnswersFailure() {
    return {
        type: GET_EXERCISE_QUESTIONS_WITH_ANSWERS_FAILURE,
    }
}

export function get_ExerciseQuestionDifficultyTypesRequest() {
    return {
        type: GET_EXERCISE_DIFFICULTY_TYPES_REQUEST,
    }
}

export function get_ExerciseQuestionDifficultyTypesSuccess(data) {
    return {
        type: GET_EXERCISE_DIFFICULTY_TYPES_SUCCESS,
        payload: data
    }
}

export function get_ExerciseQuestionDifficultyTypesFailure() {
    return {
        type: GET_EXERCISE_DIFFICULTY_TYPES_FAILURE,
    }
}

export function get_ExerciseSearchRequest() {
    return {
        type: GET_EXERCISE_SEARCH_REQUEST,
    }
}

export function get_ExerciseSearchSuccess(data) {
    return {
        type: GET_EXERCISE_SEARCH_SUCCESS,
        payload: data
    }
}

export function get_ExerciseSearchFailure() {
    return {
        type: GET_EXERCISE_SEARCH_FAILURE,
    }
}

export function set_TimeStart() {
    return { type: SET_TIME_NORMAL }
}

export function set_TimeStop() {
    return { type: SET_TIME_STOP }
}
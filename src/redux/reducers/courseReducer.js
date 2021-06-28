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
    GET_CSNN_COURSES_LIST_SUCCESS,
    GET_DC_COURSES_LIST_REQUEST,
    GET_DC_COURSES_LIST_SUCCESS,
    GET_DC_COURSES_LIST_FAILURE,
    GET_CSNN_COURSES_LIST_REQUEST,
    GET_CSNN_COURSES_LIST_FAILURE,
    GET_COURSE_TOPICS_WITH_EXCERCISES_BY_SUBJECT_ID_REQUEST,
    GET_COURSE_TOPICS_WITH_EXCERCISES_BY_SUBJECT_ID_FAILURE,
    GET_COURSE_TOPICS_WITH_EXCERCISES_BY_SUBJECT_ID_SUCCESS,
    GET_COURSE_TOPICS_WITH_EXCERCISES_BY_EXERCISE_ID_REQUEST,
    GET_COURSE_TOPICS_WITH_EXCERCISES_BY_EXERCISE_ID_FAILURE,
    GET_COURSE_TOPICS_WITH_EXCERCISES_BY_EXERCISE_ID_SUCCESS,
    GET_COURSE_DETAIL_BY_ID_REQUEST,
    GET_COURSE_DETAIL_BY_ID_FAILURE,
    GET_COURSE_DETAIL_BY_ID_SUCCESS,
    GET_EXERCISE_BY_ID_FAILURE,
    GET_EXERCISE_BY_ID_SUCCESS,
    GET_EXERCISE_BY_ID_REQUEST,
    GET_EXERCISE_QUESTIONS_REQUEST,
    GET_EXERCISE_QUESTIONS_SUCCESS,
    GET_EXERCISE_QUESTIONS_FAILURE,
    CHECK_EXERCISE_ANSWERS_REQUEST,
    CHECK_EXERCISE_ANSWERS_SUCCESS,
    CHECK_EXERCISE_ANSWERS_FAILURE,

    //intergate with exercise detail
    GET_CURRENT_USER_EXERCISE_STATISTIC_REQUEST,
    GET_CURRENT_USER_EXERCISE_STATISTIC_SUCCESS,
    GET_CURRENT_USER_EXERCISE_STATISTIC_FAILURE,

    //
    GET_RELATIVE_POSTS_BY_EXERCISE_ID_REQUEST,
    GET_RELATIVE_POSTS_BY_EXERCISE_ID_SUCCESS,
    GET_RELATIVE_POSTS_BY_EXERCISE_ID_FAILURE,
    GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_REQUEST,
    GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_SUCCESS,
    GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_FAILURE,
    UPDATE_TOC_SET,
    UPDATE_TOC_SUCCESS,
    UPDATE_EXERCISE_NOTE_FAILURE,
    UPDATE_EXERCISE_NOTE_SUCCESS,
    UPDATE_EXERCISE_NOTE_RESET,
    GET_EXERCISE_NOTE_REQUEST,
    GET_EXERCISE_NOTE_SUCCESS,
    GET_EXERCISE_NOTE_FAILURE,
    REPORT_AN_EXERCISE_RESET,
    REPORT_AN_EXERCISE_SUCCESS,
    REPORT_AN_EXERCISE_FAILURE,
    RESOLVE_AN_EXERCISE_FAILURE,
    RESOLVE_AN_EXERCISE_SUCCESS,
    RESOLVE_AN_EXERCISE_RESET,
    GET_REPORTED_EXERCISES_REQUEST,
    GET_REPORTED_EXERCISES_SUCCESS,
    GET_REPORTED_EXERCISES_FAILURE,
    SET_TIME_NORMAL,
    SET_TIME_STOP,
} from '../constants.js'

const initialState = {
    //search course: use for search course and course list
    dcCoursesList: {
        isLoading: false,
        data: [],
        error: ""
    },

    csnnCoursesList: {
        isLoading: false,
        data: [],
        error: ""
    },

    coursesList: {
        isLoading: false,
        data: [],
        error: ""
    },
    //my courses
    myCourses: {
        isLoading: false,
        data: [],
        error: ""
    },

    courseTopicsExercises: {
        isLoading: false,
        data: [],
        error: ''
    },

    courseTopicsExercisesByExerciseId: {
        isLoading: false,
        data: {},
        error: ''
    },

    courseDetailById: {
        isLoading: false,
        data: {},
        error: ''
    },

    currentExercise: {
        isLoading: false,
        data: [],
        error: '',
        isLoadDone: false
    },

    exerciseDetail: {
        isLoading: false,
        data: [],
        error: '',
        isLoadDone: false
    },

    //chua biet exercise note co can get hay khong
    exerciseQuestions: {
        data: [],
        isLoading: false,
        error: '',
    },

    correctAnswers: {
        data: [],
        isLoading: false,
        error: '',
        isChecked: false
    },

    relativePosts: {
        isLoading: false,
        data: [],
        error: ''
    },

    relativeDocuments: {
        isLoading: false,
        data: [],
        error: ''
    },

    currentUserExerciseStatistic: {
        isLoading: false,
        data: {},
        error: ''
    },

    questionsToC: {
        isSet: false,
        data: []
    },

    exerciseNote: {
        isLoading: false,
        isHaveUpdated: false,
        data: {},
        error: ''
    },

    reportedExercises: {
        data: [],
        isLoading: false,
        totalPages: 1,
        totalElements: 0
    },

    isHaveReported: false,
    isHaveResolved: false,
    isTimeNormal: true,

};

function CourseReducer(state = initialState, action) {
    switch (action.type) {

        //get my course
        case GET_MY_COURSES_REQUEST:
            return { ...state, myCourses: { isLoading: true } };
        case GET_MY_COURSES_SUCCESS:
            return { ...state, myCourses: { isLoading: false, data: action.payload, error: '' } }
        case GET_MY_COURSES_FAILURE:
            return { ...state, myCourses: { isLoading: false, error: action.payload, data: [] } }

        //dai cuong
        case GET_DC_COURSES_LIST_REQUEST:
            return { ...state, dcCoursesList: { isLoading: true } }
        case GET_DC_COURSES_LIST_SUCCESS:
            return { ...state, dcCoursesList: { isLoading: false, data: action.payload } }
        case GET_DC_COURSES_LIST_FAILURE:
            return { ...state, dcCoursesList: { isLoading: false, data: [], error: action.payload } }

        //co so nhom nganh
        case GET_CSNN_COURSES_LIST_REQUEST:
            return { ...state, csnnCoursesList: { isLoading: true } }
        case GET_CSNN_COURSES_LIST_SUCCESS:
            return { ...state, csnnCoursesList: { isLoading: false, data: action.payload } }
        case GET_CSNN_COURSES_LIST_FAILURE:
            return { ...state, csnnCoursesList: { isLoading: false, data: [], error: action.payload } }

        //get course search result
        case GET_COURSE_SEARCH_REQUEST:
        case GET_COURSES_LIST_REQUEST:
            return {
                ...state, coursesList: { isLoading: true }
            };
        case GET_COURSE_SEARCH_SUCCESS:
        case GET_COURSES_LIST_SUCCESS:
            {
                return { ...state, coursesList: { isLoading: false, data: action.payload, error: '' } }
            }
        case GET_COURSE_SEARCH_FAILURE:
        case GET_COURSES_LIST_FAILURE:
            {
                return { ...state, coursesList: { isLoading: false, error: action.payload, data: [] } }
            }

        //get course topics by subject id
        case GET_COURSE_TOPICS_WITH_EXCERCISES_BY_SUBJECT_ID_REQUEST:
            return {
                ...state, courseTopicsExercises: { isLoading: true, isLoadDone: false }
            };
        case GET_COURSE_TOPICS_WITH_EXCERCISES_BY_SUBJECT_ID_SUCCESS:
            {
                return { ...state, courseTopicsExercises: { isLoading: false, isLoadDone: true, data: action.payload, error: '' } }
            }
        case GET_COURSE_TOPICS_WITH_EXCERCISES_BY_SUBJECT_ID_FAILURE:
            {
                return { ...state, courseTopicsExercises: { isLoading: false, isLoadDone: true, error: action.payload, data: [] } }
            }

        //get course topics by exercise id
        case GET_COURSE_TOPICS_WITH_EXCERCISES_BY_EXERCISE_ID_REQUEST:
            return {
                ...state, courseTopicsExercisesByExerciseId: { isLoading: true, isLoadDone: false, data: {} }
            };
        case GET_COURSE_TOPICS_WITH_EXCERCISES_BY_EXERCISE_ID_SUCCESS:
            {
                return { ...state, courseTopicsExercisesByExerciseId: { isLoading: false, isLoadDone: true, data: action.payload, error: '' } }
            }
        case GET_COURSE_TOPICS_WITH_EXCERCISES_BY_EXERCISE_ID_FAILURE:
            {
                return { ...state, courseTopicsExercisesByExerciseId: { isLoading: false, isLoadDone: true, error: action.payload, data: {} } }
            }

        //get course detail
        case GET_COURSE_DETAIL_BY_ID_REQUEST:
            return {
                ...state, courseDetailById: { isLoading: true, isLoadDone: false }
            };
        case GET_COURSE_DETAIL_BY_ID_SUCCESS:
            {
                return { ...state, courseDetailById: { isLoading: false, isLoadDone: true, data: action.payload, error: '' } }
            }
        case GET_COURSE_DETAIL_BY_ID_FAILURE:
            {
                return { ...state, courseDetailById: { isLoading: false, isLoadDone: true, error: action.payload, data: [] } }
            }

        //get course detail
        case GET_EXERCISE_BY_ID_REQUEST:
            return {
                ...state, currentExercise: { isLoading: true, isLoadDone: false }
            };
        case GET_EXERCISE_BY_ID_SUCCESS:
            {
                return { ...state, currentExercise: { isLoading: false, isLoadDone: true, data: action.payload, error: '' } }
            }
        case GET_EXERCISE_BY_ID_FAILURE:
            {
                return { ...state, currentExercise: { isLoading: false, isLoadDone: true, error: action.payload, data: [] } }
            }

        case GET_EXERCISE_QUESTIONS_REQUEST:
            return {
                ...state, exerciseQuestions: { isLoading: true, data: [], error: '', }
            };
        case GET_EXERCISE_QUESTIONS_SUCCESS:
            return {
                ...state, exerciseQuestions: { isLoading: false, data: action.payload, error: '', }
            }
        case GET_EXERCISE_QUESTIONS_FAILURE:
            return {
                ...state, exerciseQuestions: { isLoading: false, isLoadDone: true, error: action.payload, data: [] }
            }

        case CHECK_EXERCISE_ANSWERS_REQUEST:
            return {
                ...state, correctAnswers: { isLoading: true, error: '', data: [], isChecked: false }
            };
        case CHECK_EXERCISE_ANSWERS_SUCCESS:
            return {
                ...state, correctAnswers: { isLoading: false, data: action.payload, isChecked: true, error: '' }
            }
        case CHECK_EXERCISE_ANSWERS_FAILURE:
            return {
                ...state, correctAnswers: { isLoading: false, error: action.payload, data: [], isChecked: false }
            }
        case GET_RELATIVE_POSTS_BY_EXERCISE_ID_REQUEST:
            return {
                ...state, relativePosts: { isLoading: true, error: '', data: [] }
            };
        case GET_RELATIVE_POSTS_BY_EXERCISE_ID_SUCCESS:
            return {
                ...state, relativePosts: { isLoading: false, data: action.payload, error: '' }
            }
        case GET_RELATIVE_POSTS_BY_EXERCISE_ID_FAILURE:
            return {
                ...state, relativePosts: { isLoading: false, error: action.payload, data: [] }
            }
        case GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_REQUEST:
            return {
                ...state, relativeDocuments: { isLoading: true, error: '', data: [] }
            };
        case GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_SUCCESS:
            return {
                ...state, relativeDocuments: { isLoading: false, data: action.payload, error: '' }
            }
        case GET_RELATIVE_DOCUMENTS_BY_EXERCISE_ID_FAILURE:
            return {
                ...state, relativeDocuments: { isLoading: false, error: action.payload, data: [] }
            }

        case GET_CURRENT_USER_EXERCISE_STATISTIC_REQUEST:
            return {
                ...state, currentUserExerciseStatistic: { isLoading: true, error: '', data: {} }
            };
        case GET_CURRENT_USER_EXERCISE_STATISTIC_SUCCESS:
            return {
                ...state, currentUserExerciseStatistic: { isLoading: false, data: action.payload, error: '' }
            }
        case GET_CURRENT_USER_EXERCISE_STATISTIC_FAILURE:
            return {
                ...state, currentUserExerciseStatistic: { isLoading: false, error: action.payload, data: [] }
            }

        case UPDATE_EXERCISE_NOTE_RESET: return {
            ...state, exerciseNote: {
                ...state.exerciseNote,
                isHaveUpdated: false,
                error: ''
            }
        }
        case UPDATE_EXERCISE_NOTE_SUCCESS: return {
            ...state, exerciseNote: {
                ...state.exerciseNote,
                isLoading: false,
                isHaveUpdated: true,
                error: ''
            }
        }
        case UPDATE_EXERCISE_NOTE_FAILURE: return {
            ...state, exerciseNote: {
                ...state.exerciseNote,
                isLoading: false,
                isHaveUpdated: false,
                error: action.payload
            }
        }

        case GET_EXERCISE_NOTE_REQUEST: return {
            ...state, exerciseNote: {
                ...state.exerciseNote,
                isLoading: true,
                error: ''
            }
        }
        case GET_EXERCISE_NOTE_SUCCESS: return {
            ...state, exerciseNote: {
                ...state.exerciseNote,
                isLoading: false,
                data: action.payload.note,
                error: ''
            }
        }
        case GET_EXERCISE_NOTE_FAILURE: return {
            ...state, exerciseNote: {
                ...state.exerciseNote,
                isLoading: false,
                error: action.payload
            }
        }

        case GET_REPORTED_EXERCISES_REQUEST:
            return {
                ...state, reportedExercises: {
                    ...state.reportedExercises,
                    isLoading: true
                }
            };
        case GET_REPORTED_EXERCISES_SUCCESS:
            return {
                ...state, reportedExercises: {
                    isLoading: false,
                    data: action.payload.exerciseReportDTOs,
                    totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
                    totalElements: action.payload.totalElements ? action.payload.totalElements : 0
                }
            };
        case GET_REPORTED_EXERCISES_FAILURE:
            return {
                ...state, reportedExercises: {
                    isLoading: false,
                    data: [],
                    totalPages: 1,
                    totalElements: 0
                }
            };
        //report
        case REPORT_AN_EXERCISE_RESET:
            return { ...state, isHaveReported: false };
        case REPORT_AN_EXERCISE_SUCCESS:
            return { ...state, isHaveReported: true };
        case REPORT_AN_EXERCISE_FAILURE:
            return { ...state, isHaveReported: false };

        //report
        case RESOLVE_AN_EXERCISE_RESET:
            return { ...state, isHaveResolved: false };
        case RESOLVE_AN_EXERCISE_SUCCESS:
            return { ...state, isHaveResolved: true };
        case RESOLVE_AN_EXERCISE_FAILURE:
            return { ...state, isHaveResolved: false };

        case UPDATE_TOC_SET:
            return {
                ...state, questionsToC: { ...state.questionsToC, isSet: false }
            }
        case UPDATE_TOC_SUCCESS:
            return {
                ...state, questionsToC: { isSet: true, data: action.payload }
            }
            
        case SET_TIME_NORMAL:
            return { ...state, isTimeNormal: true }

        case SET_TIME_STOP:
            return { ...state, isTimeNormal: false }
        default:
            return state;
    }
}

export default CourseReducer;

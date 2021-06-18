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
    CREATE_EXERCISE_NOTE_REQUEST,
    CREATE_EXERCISE_NOTE_SUCCESS,
    CREATE_EXERCISE_NOTE_FAILURE,
    UPDATE_EXERCISE_NOTE_REQUEST,
    UPDATE_EXERCISE_NOTE_SUCCESS,
    UPDATE_EXERCISE_NOTE_FAILURE,
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

    exercise: {
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
    }
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
                ...state, exercise: { isLoading: true, isLoadDone: false }
            };
        case GET_EXERCISE_BY_ID_SUCCESS:
            {
                return { ...state, exercise: { isLoading: false, isLoadDone: true, data: action.payload, error: '' } }
            }
        case GET_EXERCISE_BY_ID_FAILURE:
            {
                return { ...state, exercise: { isLoading: false, isLoadDone: true, error: action.payload, data: [] } }
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
                ...state, correctAnswers: { isLoading: true, error: '', data: [] }
            };
        case CHECK_EXERCISE_ANSWERS_SUCCESS:
            return {
                ...state, correctAnswers: { isLoading: false, data: action.payload, error: '' }
            }
        case CHECK_EXERCISE_ANSWERS_FAILURE:
            return {
                ...state, correctAnswers: { isLoading: false, error: action.payload, data: [] }
            }

        default:
            return state;
    }
}

export default CourseReducer;

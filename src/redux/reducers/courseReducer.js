import {
    // GET_DAI_CUONG_COURSES_LIST_REQUEST,
    // GET_DAI_CUONG_COURSES_LIST_SUCCESS,
    // GET_DAI_CUONG_COURSES_LIST_FAILURE,

    // GET_CS_NHOM_NGANH_COURSES_LIST_REQUEST,
    // GET_CS_NHOM_NGANH_COURSES_LIST_SUCCESS,
    // GET_CS_NHOM_NGANH_COURSES_LIST_FAILURE,

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

        default:
            return state;
    }
}

export default CourseReducer;

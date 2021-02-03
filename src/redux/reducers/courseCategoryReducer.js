import {
    GET_COURSE_FALCUTY_CATEGORIES_REQUEST,
    GET_COURSE_FALCUTY_CATEGORIES_SUCCESS,
    GET_COURSE_FALCUTY_CATEGORIES_FAILURE
} from '../constants.js'

const initialState = {
    falcutyCategories: {
        isLoading: false,
        data: [],
        error: ''
    },
}

function CourseCategoryReducer(state = initialState, action) {
    switch (action.type) {
        //get post category
        case GET_COURSE_FALCUTY_CATEGORIES_REQUEST:
            return { ...state, falcutyCategories: { isLoading: true } }
        case GET_COURSE_FALCUTY_CATEGORIES_SUCCESS:
            return { ...state, falcutyCategories: { isLoading: false, data: action.payload, error: '' } }
        case GET_COURSE_FALCUTY_CATEGORIES_FAILURE:
            return { ...state, falcutyCategories: { isLoading: false, error: action.payload } }
        default:
            return state;
    }
}

export default CourseCategoryReducer;


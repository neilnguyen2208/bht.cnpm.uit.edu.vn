import {
    GET_COURSE_FACULTIES_REQUEST,
    GET_COURSE_FACULTIES_SUCCESS,
    GET_COURSE_FACULTIES_FAILURE
} from '../constants.js'

const initialState = {
    falcutyCategories: {
        isLoading: false,
        data: [{ id: 0, name: "Tất cả" }],
        error: ''
    },
}

function CourseCategoryReducer(state = initialState, action) {
    switch (action.type) {
        //get post category
        case GET_COURSE_FACULTIES_REQUEST:
            return {
                ...state, falcutyCategories: {
                    isLoading: true,
                    data: [{ id: 0, name: "Tất cả" }]
                }
            }
        case GET_COURSE_FACULTIES_SUCCESS:
            return {
                ...state, falcutyCategories: {
                    isLoading: false,
                    data: [{ id: 0, name: "Tất cả" }, ...action.payload],
                    error: ''
                }
            }
        case GET_COURSE_FACULTIES_FAILURE:
            return {
                ...state, falcutyCategories: {
                    isLoading: false,
                    data: [{ id: 0, name: "Tất cả" }]
                    , error: action.payload
                }
            }
        default:
            return state;
    }
}

export default CourseCategoryReducer;


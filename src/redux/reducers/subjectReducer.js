import {
    GET_SUBJECTS_REQUEST,
    GET_SUBJECTS_SUCCESS,
    GET_SUBJECTS_HAVE_ALL_SUCCESS,
    GET_SUBJECTS_FAILURE
} from '../constants.js'

const initialState = {
    subjects: {
        isLoading: false,
        data: [],
        searchData: [{ id: 0, name: "Tất cả" }],
        error: ''
    },
}   

function DocumentSubjectReducer(state = initialState, action) {
    switch (action.type) {
        //get post category
        case GET_SUBJECTS_REQUEST:
            return { ...state, subjects: { isLoading: true } }
        case GET_SUBJECTS_SUCCESS:
            return { ...state, subjects: { isLoading: false, data: action.payload, error: '' } }
        case GET_SUBJECTS_HAVE_ALL_SUCCESS: {
            return { ...state, subjects: { isLoading: false, searchData: [{ id: 0, name: "Tất cả" }, ...action.payload], error: '' } }
        }
        case GET_SUBJECTS_FAILURE:
            return { ...state, subjects: { isLoading: false, error: action.payload } }
        default:
            return state;
    }
}

export default DocumentSubjectReducer;


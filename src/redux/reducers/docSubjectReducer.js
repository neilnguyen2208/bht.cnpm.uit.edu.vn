import {
    GET_DOCUMENT_SUBJECTS_REQUEST,
    GET_DOCUMENT_SUBJECTS_SUCCESS,
    GET_DOCUMENT_SUBJECTS_FAILURE
} from '../constants.js'

const initialState = {
    subjects: {
        isLoading: false,
        data: [],
        error: ''
    },
}

function DocSubjectReducer(state = initialState, action) {
    switch (action.type) {
        //get post category
        case GET_DOCUMENT_SUBJECTS_REQUEST:
            return { ...state, subjects: { isLoading: true } }
        case GET_DOCUMENT_SUBJECTS_SUCCESS:
            return { ...state, subjects: { isLoading: false, data: action.payload, error: '' } }
        case GET_DOCUMENT_SUBJECTS_FAILURE:
            return { ...state, subjects: { isLoading: false, error: action.payload } }
        default:
            return state;
    }
}

export default DocSubjectReducer;


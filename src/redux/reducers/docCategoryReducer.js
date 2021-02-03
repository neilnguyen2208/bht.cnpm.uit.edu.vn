import {
    GET_DOC_CATEGORIES_REQUEST,
    GET_DOC_CATEGORIES_SUCCESS,
    GET_DOC_CATEGORIES_FAILURE
} from '../constants.js'

const initialState = {
    categories: {
        isLoading: false,
        data: [],
        error: ''
    },
}

function DocCategoryReducer(state = initialState, action) {
    switch (action.type) {
        //get post category
        case GET_DOC_CATEGORIES_REQUEST:
            return { ...state, categories: { isLoading: true } }
        case GET_DOC_CATEGORIES_SUCCESS:
            return { ...state, categories: { isLoading: false, data: action.payload, error: '' } }
        case GET_DOC_CATEGORIES_FAILURE:
            return { ...state, categories: { isLoading: false, error: action.payload } }
        default:
            return state;
    }
}

export default DocCategoryReducer;


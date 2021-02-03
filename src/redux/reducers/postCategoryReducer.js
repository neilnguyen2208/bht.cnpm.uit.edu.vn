import {
    GET_POST_CATEGORIES_REQUEST,
    GET_POST_CATEGORIES_SUCCESS,
    GET_POST_CATEGORIES_FAILURE
} from '../constants.js'

const initialState = {
    categories: {
        isLoading: false,
        data: [],
        error: ''
    },
}

function PostCategoryReducer(state = initialState, action) {
    switch (action.type) {
        //get post category
        case GET_POST_CATEGORIES_REQUEST:
            return { ...state, categories: { isLoading: true } }
        case GET_POST_CATEGORIES_SUCCESS:
            return { ...state, categories: { isLoading: false, data: action.payload, error: '' } }
        case GET_POST_CATEGORIES_FAILURE:
            return { ...state, categories: { isLoading: false, error: action.payload } }
        default:
            return state;
    }
}

export default PostCategoryReducer;


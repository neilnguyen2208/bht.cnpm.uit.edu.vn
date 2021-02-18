import {
    GET_POST_CATEGORIES_REQUEST,
    GET_POST_CATEGORIES_SUCCESS,
    GET_POST_CATEGORIES_SUCCESS_HAVE_ALL,
    GET_POST_CATEGORIES_FAILURE
} from '../constants.js'

const initialState = {
    categories: {
        isLoading: false,
        data: [],
        searchData: []
    },
}

function PostCategoryReducer(state = initialState, action) {
    switch (action.type) {
        //get post category
        case GET_POST_CATEGORIES_REQUEST:
            return { ...state, categories: { ...state.categories, isLoading: true } }
        case GET_POST_CATEGORIES_SUCCESS_HAVE_ALL:
            //append category to this current array of data
            return { ...state, categories: { ...state.categories, searchData: [{ id: 0, name: "Tất cả" }, ...action.payload], isLoading: false } }
        case GET_POST_CATEGORIES_SUCCESS:
            return { ...state, categories: { ...state.categories, data: action.payload, isLoading: false } }
        case GET_POST_CATEGORIES_FAILURE:
            return { ...state, categories: { ...state.categories, isLoading: false } }
        default:
            return state;
    }
}

export default PostCategoryReducer;


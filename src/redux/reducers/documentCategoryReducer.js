import {
    GET_DOCUMENT_CATEGORIES_REQUEST,
    GET_DOCUMENT_CATEGORIES_SUCCESS,
    GET_DOCUMENT_CATEGORIES_FAILURE,
    GET_DOCUMENT_CATEGORIES_HAVE_ALL_REQUEST,
    GET_DOCUMENT_CATEGORIES_HAVE_ALL_SUCCESS,
    GET_DOCUMENT_CATEGORIES_HAVE_ALL_FAILURE,

} from '../constants.js'

const initialState = {
    categories: {
        isLoading: false,
        data: [],
        error: '',
        searchData: [{ id: 0, name: "Tất cả" }]
    },

}

function DocCategoryReducer(state = initialState, action) {
    switch (action.type) {
        //get post category
        case GET_DOCUMENT_CATEGORIES_REQUEST:
            return { ...state, categories: { ...state.categories, isLoading: true, data: [] } }
        case GET_DOCUMENT_CATEGORIES_SUCCESS:
            return {
                ...state, categories: {
                    ...state.categories,
                    isLoading: false,
                    data: action.payload,
                    searchData: [{ id: 0, name: "Tất cả" }, ...action.payload],
                    error: ''
                }
            }

        case GET_DOCUMENT_CATEGORIES_FAILURE:
            return { ...state, categories: { ...state.categories, isLoading: false, error: action.payload, data: [], searchData: [] } }

        case GET_DOCUMENT_CATEGORIES_HAVE_ALL_SUCCESS:
            return {
                ...state, categories: {
                    ...state.categories,
                    isLoading: false,
                    data: action.payload,
                    searchData: [{ id: 0, name: "Tất cả" }, ...action.payload],
                    error: ''
                }
            }

        default:
            return state;
    }
}

export default DocCategoryReducer;


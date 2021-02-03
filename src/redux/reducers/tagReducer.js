import {
    GET_TAG_SEARCH_RESULT_REQUEST,
    GET_TAG_SEARCH_RESULT_SUCCESS,
    GET_TAG_SEARCH_RESULT_FAILURE,
    GET_TAG_QUICK_QUERY_REQUEST,
    GET_TAG_QUICK_QUERY_SUCCESS,
    GET_TAG_QUICK_QUERY_FAILURE

} from 'redux/constants.js';

var initialState = {
    tagSearchResult: {
        isLoading: false,
        data: [],
        itemCount: 20,
        error: ''
    },
    tagQuickQueryResult: {
        isLoading: false,
        isLoadingDone: false,
        data: [],
        error: ''
    }
}

export default function tagReducer(state = initialState, action) {
    switch (action.type) {

        //get Search Results
        case GET_TAG_SEARCH_RESULT_REQUEST: {
            return {
                ...state, tagSearchResult: { isLoading: true }
            };
        }
        case GET_TAG_SEARCH_RESULT_SUCCESS: {
            return {
                ...state, tagSearchResult: { isLoading: false, data: action.payload, itemCount: 30, error: '' }
            }
        }
        case GET_TAG_SEARCH_RESULT_FAILURE: {
            return {
                ...state, tagSearchResult: { isLoading: false, error: action.payload, data: [], itemCount: 0 }
            }
        }
        case GET_TAG_QUICK_QUERY_REQUEST: {
            return {
                ...state, tagSearchResult: { isLoading: true, isLoadingDone: false }
            }
        }
        case GET_TAG_QUICK_QUERY_SUCCESS: {
            return {
                ...state, tagQuickQueryResult: { isLoading: false, isLoadingDone: true, data: action.payload, error: '' }
            }
        }
        case GET_TAG_QUICK_QUERY_FAILURE: {
            return {
                ...state, tagQuickQueryResult: { isLoading: false, error: action.payload }
            }
        }

        default:
            return state;
    }
}



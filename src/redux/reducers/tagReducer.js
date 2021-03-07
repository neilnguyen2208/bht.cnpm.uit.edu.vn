import {
    GET_TAG_SEARCH_REQUEST,
    GET_TAG_SEARCH_SUCCESS,
    GET_TAG_SEARCH_FAILURE,
    GET_TAG_QUICK_QUERY_REQUEST,
    GET_TAG_QUICK_QUERY_SUCCESS,
    GET_TAG_QUICK_QUERY_FAILURE,
    GET_TAG_QUICK_QUERY_RESET
} from 'redux/constants.js';

var initialState = {
    tagSearchResult: {
        isLoading: false,
        data: [],
        itemCount: 20,
    },
    tagQuickQueryResult: {
        isLoading: false,
        isLoadDone: false,
        data: [],
    }
}

export default function tagReducer(state = initialState, action) {
    switch (action.type) {

        //get Search Results
        case GET_TAG_SEARCH_REQUEST: {
            return {
                ...state, tagSearchResult: { isLoading: true }
            };
        }
        case GET_TAG_SEARCH_SUCCESS: {
            return {
                ...state, tagSearchResult: { isLoading: false, data: action.payload, itemCount: 30 }
            }
        }
        case GET_TAG_SEARCH_FAILURE: {
            return {
                ...state, tagSearchResult: { isLoading: false, data: [], itemCount: 0 }
            }
        }
        case GET_TAG_QUICK_QUERY_REQUEST: {
            return {
                ...state, tagQuickQueryResult: { isLoading: true, isLoadDone: false }
            }
        }
        case GET_TAG_QUICK_QUERY_SUCCESS: {
            return {
                ...state, tagQuickQueryResult: { isLoading: false, isLoadDone: true, data: action.payload }
            }
        }
        case GET_TAG_QUICK_QUERY_FAILURE: {
            return {
                ...state, tagQuickQueryResult: { isLoading: false, isLoadDone: true }
            }
        }
        case GET_TAG_QUICK_QUERY_RESET: { //only call on componentWillUnmount
            return {
                ...state, tagQuickQueryResult: { isLoading: false, isLoadDone: false }
            }
        }
        default:
            return state;
    }
}



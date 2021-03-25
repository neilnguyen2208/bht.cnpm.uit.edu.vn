import {
    GET_TAG_SEARCH_REQUEST,
    GET_TAG_SEARCH_SUCCESS,
    GET_TAG_SEARCH_FAILURE,
    GET_TAG_QUICK_QUERY_REQUEST,
    GET_TAG_QUICK_QUERY_SUCCESS,
    GET_TAG_QUICK_QUERY_FAILURE,
    GET_TAG_QUICK_QUERY_RESET,
    GET_TAG_BY_ID_REQUEST,
    GET_TAG_BY_ID_SUCCESS,
    GET_TAG_BY_ID_FAILURE,
    GET_RELATIVE_TAGS_REQUEST,
    GET_RELATIVE_TAGS_SUCCESS,
    GET_RELATIVE_TAGS_FAILURE

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
    },
    currentTag: {
        isLoading: false,
        data: {}
    },
    relativeTags: {
        isLoading: false,
        data: []
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
        case GET_TAG_BY_ID_REQUEST:
            return {
                ...state, currentTag: { isLoading: true }
            }

        case GET_TAG_BY_ID_SUCCESS: {
            return {
                ...state, currentTag: { isLoading: false, data: action.payload }
            }
        }

        case GET_TAG_BY_ID_FAILURE: return {
            ...state, currentTag: { isLoading: false }
        }

        case GET_RELATIVE_TAGS_REQUEST:
        case GET_RELATIVE_TAGS_FAILURE: {
            return {
                ...state, relativeTags: { isLoading: false }
            }
        }
        case GET_RELATIVE_TAGS_SUCCESS: {
            return {
                ...state, relativeTags: { isLoading: false, data: action.payload }
            }
        }
        default:
            return state;
    }
}



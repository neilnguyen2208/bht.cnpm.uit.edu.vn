
import {
    //new documents
    GET_QUICK_SEARCH_REQUEST,
    GET_QUICK_SEARCH_SUCCESS,
    GET_QUICK_SEARCH_FAILURE,
    GET_QUICK_SEARCH_RESET,

    SET_SEARCHING
} from "../constants.js"


const initialState = {
    quickSearchResult: {
        isLoadDone: false,
        isLoading: false,
        data: {
        }
    },
    isSearching: false,
}

function CommonReducer(state = initialState, action) {
    switch (action.type) {
        case GET_QUICK_SEARCH_REQUEST:
            return { ...state, quickSearchResult: { isLoading: true, isLoadDone: false } };
        case GET_QUICK_SEARCH_SUCCESS:
            return { ...state, quickSearchResult: { isLoading: false, isLoadDone: true, data: action.payload } }
        case GET_QUICK_SEARCH_FAILURE:
            return { ...state, quickSearchResult: { isLoading: false, isLoadDone: true, data: {} } }
        case GET_QUICK_SEARCH_RESET:
            return { ...state, quickSearchResult: { isLoadDone: false } }

        case SET_SEARCHING:
            return { ...state, isSearching: action.payload }

        default:
            return state;
    }
}

export default CommonReducer;
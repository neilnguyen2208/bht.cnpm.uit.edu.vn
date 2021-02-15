
import {
    //new documents
    GET_QUICK_SEARCH_RESULT_REQUEST,
    GET_QUICK_SEARCH_RESULT_SUCCESS,
    GET_QUICK_SEARCH_RESULT_FAILURE

} from "../constants.js"


const initialState = {
    quickSearchResult: {
        isLoadDone: false,
        isLoading: false,
        data: {
        },
        error: ""
    }
}

function CommonReducer(state = initialState, action) {
    switch (action.type) {
        case GET_QUICK_SEARCH_RESULT_REQUEST:
            return { ...state, quickSearchResult: { isLoading: true, isLoadDone: false } };
        case GET_QUICK_SEARCH_RESULT_SUCCESS:
            return { ...state, quickSearchResult: { isLoading: false, isLoadDone: true, data: action.payload, error: '' } }
        case GET_QUICK_SEARCH_RESULT_FAILURE:
            return { ...state, quickSearchResult: { isLoading: false, isLoadDone: true, error: action.payload, data: {} } }
        default:
            return state;
    }
}

export default CommonReducer;
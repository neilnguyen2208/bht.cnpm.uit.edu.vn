
import {
    //new documents
    GET_TRENDING_DOCUMENTS_LIST_REQUEST,
    GET_TRENDING_DOCUMENTS_LIST_SUCCESS,
    GET_TRENDING_DOCUMENTS_LIST_FAILURE,

    GET_HIGHLIGHT_POSTS_LIST_REQUEST,
    GET_HIGHLIGHT_POSTS_LIST_SUCCESS,
    GET_HIGHLIGHT_POSTS_LIST_FAILURE,

    GET_NEWEST_POSTS_LIST_REQUEST,
    GET_NEWEST_POSTS_LIST_SUCCESS,
    GET_NEWEST_POSTS_LIST_FAILURE,

    GET_NEWEST_ACTIVITIES_LIST_REQUEST,
    GET_NEWEST_ACTIVITIES_LIST_SUCCESS,
    GET_NEWEST_ACTIVITIES_LIST_FAILURE,

} from "../constants.js"

const initialState = {
    trendingDocuments: {
        isLoading: false,
        data: [],
        error: ""
    },
    highlightPosts: {
        isLoading: false,
        data: [],
        error: ""
    },
    newPosts: {
        isLoading: false,
        data: [],
        error: ""
    },
    newActivities: {
        isLoading: false,
        data: [],
        error: ""
    }
}

function HomeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRENDING_DOCUMENTS_LIST_REQUEST:
            return { ...state, trendingDocuments: { isLoading: true } };
        case GET_TRENDING_DOCUMENTS_LIST_SUCCESS:
            return { ...state, trendingDocuments: { isLoading: false, data: action.payload, error: '' } }
        case GET_TRENDING_DOCUMENTS_LIST_FAILURE:
            return { ...state, trendingDocuments: { isLoading: false, error: action.payload, data: [] } }
        case GET_NEWEST_POSTS_LIST_REQUEST:
            return { ...state, newPosts: { isLoading: true } };
        case GET_NEWEST_POSTS_LIST_SUCCESS:
            return { ...state, newPosts: { isLoading: false, data: action.payload, error: '' } }
        case GET_NEWEST_POSTS_LIST_FAILURE:
            return { ...state, newPosts: { isLoading: false, error: action.payload, data: [] } }
        case GET_HIGHLIGHT_POSTS_LIST_REQUEST:
            return { ...state, highlightPosts: { isLoading: true } };
        case GET_HIGHLIGHT_POSTS_LIST_SUCCESS:
            console.log(action.payload)
            return { ...state, highlightPosts: { isLoading: false, data: action.payload, error: '' } }
        case GET_HIGHLIGHT_POSTS_LIST_FAILURE:
            return { ...state, highlightPosts: { isLoading: false, error: action.payload, data: [] } }
        case GET_NEWEST_ACTIVITIES_LIST_REQUEST:
            return { ...state, newActivities: { isLoading: true } };
        case GET_NEWEST_ACTIVITIES_LIST_SUCCESS:
            return { ...state, newActivities: { isLoading: false, data: action.payload, error: '' } }
        case GET_NEWEST_ACTIVITIES_LIST_FAILURE:
            return { ...state, newActivities: { isLoading: false, error: action.payload, data: [] } }
        default:
            return state;
    }
}

export default HomeReducer;

import {
    //new documents
    GET_TRENDING_DOCUMENTS_LIST_REQUEST,
    GET_TRENDING_DOCUMENTS_LIST_SUCCESS,
    GET_TRENDING_DOCUMENTS_LIST_FAILURE,

    GET_HIGHLIGHT_POSTS_REQUEST,
    GET_HIGHLIGHT_POSTS_SUCCESS,
    GET_HIGHLIGHT_POSTS_FAILURE,

    GET_NEWEST_POSTS_REQUEST,
    GET_NEWEST_POSTS_SUCCESS,
    GET_NEWEST_POSTS_FAILURE,

    GET_NEWEST_ACTIVITIES_LIST_REQUEST,
    GET_NEWEST_ACTIVITIES_LIST_SUCCESS,
    GET_NEWEST_ACTIVITIES_LIST_FAILURE,

    DELETE_HIGHLIGHT_A_POST_RESET,
    DELETE_HIGHLIGHT_A_POST_SUCCESS,
    DELETE_HIGHLIGHT_A_POST_FAILURE,

    GET_HIGHLIGHT_POSTS_IDS_REQUEST,
    GET_HIGHLIGHT_POSTS_IDS_SUCCESS,
    GET_HIGHLIGHT_POSTS_IDS_FAILURE,

    STICK_A_POST_TO_TOP_FAILURE,
    STICK_A_POST_TO_TOP_SUCCESS,
    STICK_A_POST_TO_TOP_REQUEST,

    HIGHLIGHT_A_POST_RESET,
    HIGHLIGHT_A_POST_SUCCESS,
    HIGHLIGHT_A_POST_FAILURE,

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
        error: "",
        isHaveDeleted: false,
        isHaveHighlighted: false,
        isHaveStickedToTop: false
    },
    highlightIds: {
        data: [],
        error: "",
        isLoading: false
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
        case GET_NEWEST_POSTS_REQUEST:
            return { ...state, newPosts: { isLoading: true } };
        case GET_NEWEST_POSTS_SUCCESS:
            return { ...state, newPosts: { isLoading: false, data: action.payload, error: '' } }
        case GET_NEWEST_POSTS_FAILURE:
            return { ...state, newPosts: { isLoading: false, error: action.payload, data: [] } }
        case GET_HIGHLIGHT_POSTS_REQUEST:
            return { ...state, highlightPosts: { isLoading: true } };
        case GET_HIGHLIGHT_POSTS_SUCCESS:
            return { ...state, highlightPosts: { isLoading: false, data: action.payload, error: '' } }
        case GET_HIGHLIGHT_POSTS_FAILURE:
            return { ...state, highlightPosts: { isLoading: false, error: action.payload, data: [] } }
        case DELETE_HIGHLIGHT_A_POST_RESET:
        case DELETE_HIGHLIGHT_A_POST_FAILURE: {
            return {
                ...state, highlightPosts: {
                    ...state.highlightPosts,
                    isHaveDeleted: false
                }
            }
        }
        case DELETE_HIGHLIGHT_A_POST_SUCCESS: {
            return {
                ...state, highlightPosts: {
                    ...state.highlightPosts,
                    isHaveDeleted: true
                }
            }
        }
        case HIGHLIGHT_A_POST_RESET:
        case HIGHLIGHT_A_POST_FAILURE: {
            return {
                ...state, highlightPosts: {
                    ...state.highlightPosts,
                    isHaveHighlighted: false
                }
            }
        }
        case HIGHLIGHT_A_POST_SUCCESS: {
            return {
                ...state, highlightPosts: {
                    ...state.highlightPosts,
                    isHaveHighlighted: true
                }
            }
        }

        case GET_HIGHLIGHT_POSTS_IDS_FAILURE: {
            return {
                ...state,
                highlightIds: {
                    ...state.highlightIds,
                    isLoading: false,
                }
            }
        }

        case GET_HIGHLIGHT_POSTS_IDS_SUCCESS: {
            return {
                ...state,
                highlightIds: {
                    isLoading: false,
                    data: action.payload,
                    serror: ""
                }
            }
        }
        case GET_HIGHLIGHT_POSTS_IDS_REQUEST: {
            return {
                ...state,
                highlightIds: {
                    isLoading: true,
                    data: [],
                    error: ""
                }
            }
        }
        case STICK_A_POST_TO_TOP_REQUEST:
        case STICK_A_POST_TO_TOP_FAILURE: {
            return {
                ...state,
                highlightPosts: {
                    ...state.highlightPosts,
                    isHaveStickedToTop: false
                }
            }
        }
        case STICK_A_POST_TO_TOP_SUCCESS: {
            return {
                ...state,
                highlightPosts: {
                    ...state.highlightPosts,
                    isHaveStickedToTop: true
                }
            }
        }

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
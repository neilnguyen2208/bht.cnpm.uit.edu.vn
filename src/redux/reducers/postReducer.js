import {
    APPROVE_A_POST_RESET,
    APPROVE_A_POST_SUCCESS,
    APPROVE_A_POST_FAILURE,

    REJECT_A_POST_RESET,
    REJECT_A_POST_SUCCESS,
    REJECT_A_POST_FAILURE,

    REJECT_AND_FEEDBACK_A_POST_RESET,
    REJECT_AND_FEEDBACK_A_POST_SUCCESS,
    REJECT_AND_FEEDBACK_A_POST_FAILURE,

    //highlight posts list
    GET_HIGHLIGHT_POSTS_LIST_REQUEST,
    GET_HIGHLIGHT_POSTS_LIST_SUCCESS,
    GET_HIGHLIGHT_POSTS_LIST_FAILURE,

    //post
    GET_POST_BY_ID_REQUEST,
    GET_POST_BY_ID_SUCCESS,
    GET_POST_BY_ID_FAILURE,
    GET_POST_BY_ID_RESET,

    //post list
    GET_POSTS_LIST_SUCCESS,
    GET_POSTS_LIST_REQUEST,
    GET_POSTS_LIST_FAILURE,

    //my post
    GET_MY_POSTS_REQUEST,
    GET_MY_POSTS_SUCCESS,
    GET_MY_POSTS_FAILURE,

    //search post 
    GET_POST_SEARCH_REQUEST,
    GET_POST_SEARCH_SUCCESS,
    GET_POST_SEARCH_FAILURE,

    //like post
    LIKE_A_POST_REQUEST,
    UNLIKE_A_POST_REQUEST,
    LIKE_A_POST_SUCCESS,
    UNLIKE_A_POST_SUCCESS,
    LIKE_A_POST_FAILURE,
    UNLIKE_A_POST_FAILURE,

    SAVE_A_POST_REQUEST,
    UNSAVE_A_POST_REQUEST,
    SAVE_A_POST_SUCCESS,
    UNSAVE_A_POST_SUCCESS,
    SAVE_A_POST_FAILURE,
    UNSAVE_A_POST_FAILURE,

    DELETE_A_POST_RESET,
    DELETE_A_POST_SUCCESS,
    DELETE_A_POST_FAILURE,

    EDIT_A_POST_RESET,
    EDIT_A_POST_SUCCESS,
    EDIT_A_POST_FAILURE,

    REPORT_A_POST_RESET,
    REPORT_A_POST_SUCCESS,
    REPORT_A_POST_FAILURE,

    GET_PENDING_POSTS_REQUEST,
    GET_PENDING_POSTS_SUCCESS,
    GET_PENDING_POSTS_FAILURE,

    GET_REPORTED_POSTS_REQUEST,
    GET_REPORTED_POSTS_SUCCESS,
    GET_REPORTED_POSTS_FAILURE,

    RESOLVE_A_POST_RESET,
    RESOLVE_A_POST_SUCCESS,
    RESOLVE_A_POST_FAILURE,

} from '../constants.js'

const initialState = {
    currentPost: {
        isLoading: false, data: {}, isLoadDone: false,
    },
    isHaveDeleted: false,
    isHaveEdited: false,
    isHaveReported: false,
    isHaveRejected: false,
    isHaveReportedAndFeedbacked: false,
    isHaveApppoved: false,
    isHaveResolved: false, //for reported post

    //search post: use for search post and post list
    postsList: {
        isLoading: false,
        data: [],
        totalPages: 1,
        totalElements: 0
    },

    //my posts
    myPosts: {
        isLoading: false,
        data: [],
        totalPages: 1,
        totalElements: 0
    },

    //highlight posts list
    highlightPosts: {
        isLoading: false,
        data: []
    },

    postsListByTag: {
        isLoading: false,
        data: []
    },

    pendingPosts: {
        isLoading: false,
        data: null,
        totalPages: 1,
        totalElements: 0
    },

    reportedPosts: {
        data: [],
        isLoading: false,
        totalPages: 1,
        totalElements: 0
    },

    likePostStatus: { isLiking: false, isUnLiking: false },

};

function PostReducer(state = initialState, action) {
    switch (action.type) {

        case GET_POST_BY_ID_REQUEST:
            return {
                ...state, currentPost: { isLoading: true, isLoadDone: false }
            };
        case GET_POST_BY_ID_SUCCESS:
            return {
                ...state, currentPost: { isLoading: false, data: action.payload, isLoadDone: true }
            };
        case GET_POST_BY_ID_FAILURE:
            return { ...state, currentPost: { ...state.currentPost, isLoading: false, isLoadDone: true } };
        case GET_POST_BY_ID_RESET:
            return { ...state, currentPost: { ...state.currentPost, isLoadDone: false } };

        //appvove  
        case APPROVE_A_POST_SUCCESS:
            return { ...state, isHaveApproved: true };
        case APPROVE_A_POST_FAILURE:
            return { ...state, isHaveApproved: false };
        case APPROVE_A_POST_RESET:
            return { ...state, isHaveApproved: false };

        //reject 
        case REJECT_A_POST_SUCCESS:
            return { ...state, isHaveRejected: true };
        case REJECT_A_POST_FAILURE:
            return { ...state, isHaveRejected: false };
        case REJECT_A_POST_RESET:
            return { ...state, isHaveRejected: false };

        case REJECT_AND_FEEDBACK_A_POST_SUCCESS:
            return { ...state, isHaveRejectedAndFeedbacked: true };
        case REJECT_AND_FEEDBACK_A_POST_FAILURE:
            return { ...state, isHaveRejectedAndFeedbacked: false };
        case REJECT_AND_FEEDBACK_A_POST_RESET:
            return { ...state, isHaveRejectedAndFeedbacked: false };

        //get highlight posts list
        case GET_HIGHLIGHT_POSTS_LIST_REQUEST:
            return {
                ...state, highlightPosts: { isLoading: true, isLoadDone: false }
            };
        case GET_HIGHLIGHT_POSTS_LIST_SUCCESS:
            return { ...state, highlightPosts: { isLoading: false, isLoadDone: true, data: action.payload } };
        case GET_HIGHLIGHT_POSTS_LIST_FAILURE:
            return { ...state, highlightPosts: { isLoading: false, isLoadDone: true, data: [] } };

        //my post
        case GET_MY_POSTS_REQUEST:
            return {
                ...state, myPosts: { isLoading: true }
            };
        case GET_MY_POSTS_SUCCESS:
            return {
                ...state, myPosts: {
                    isLoading: false,
                    data: action.payload.postSummaryWithStateDTOs,
                    totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
                    totalElements: action.payload.totalElements ? action.payload.totalElements : 0
                }
            };
        case GET_MY_POSTS_FAILURE:
            return { ...state, myPosts: { isLoading: false, data: [] } };

        //get post search result
        case GET_POST_SEARCH_REQUEST:
        case GET_POSTS_LIST_REQUEST:
            return {
                ...state, postsList: { isLoading: true }
            };
        case GET_POST_SEARCH_SUCCESS:
        case GET_POSTS_LIST_SUCCESS:
            {
                return {
                    ...state, postsList: {
                        isLoading: false,
                        data: action.payload.postSummaryWithStateDTOs,
                        totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
                        totalElements: action.payload.totalElements ? action.payload.totalElements : 0
                    }
                }
            }
        case GET_POST_SEARCH_FAILURE:
        case GET_POSTS_LIST_FAILURE:
            return { ...state, postsList: { isLoading: false, data: [] } }

        //like post
        case LIKE_A_POST_REQUEST:
            return { ...state, likePost: { isLoading: true } }//use for all post item
        case LIKE_A_POST_SUCCESS:
            return { ...state, likePost: { isLoading: false } }
        case LIKE_A_POST_FAILURE:
            return { ...state, likePost: { isLoading: false } }

        //unlike post
        case UNLIKE_A_POST_REQUEST:
            return { ...state, unLikePost: { isLoading: true } } //true when any post is in the like request
        case UNLIKE_A_POST_SUCCESS:
            return { ...state, unLikePost: { isLoading: false } } //sau nay xu ly sau
        case UNLIKE_A_POST_FAILURE:
            return { ...state, unLikePost: { isLoading: false } };

        //like post
        case SAVE_A_POST_REQUEST:
            return { ...state, savePost: { isLoading: true } };//use for all post item
        case SAVE_A_POST_SUCCESS:
            return { ...state, savePost: { isLoading: false } };
        case SAVE_A_POST_FAILURE:
            return { ...state, savePost: { isLoading: false } };

        //unsave post
        case UNSAVE_A_POST_REQUEST:
            return { ...state, unSavePost: { isLoading: true } }; //true when any post is in the save request
        case UNSAVE_A_POST_SUCCESS:
            return { ...state, unSavePost: { isLoading: false } };
        case UNSAVE_A_POST_FAILURE:
            return { ...state, unSavePost: { isLoading: false } };

        //delete
        case DELETE_A_POST_RESET:
            return {
                ...state, isHaveDeleted: false
            };
        case DELETE_A_POST_SUCCESS:
            return {
                ...state, isHaveDeleted: true
            };
        case DELETE_A_POST_FAILURE:
            return {
                ...state, isHaveDeleted: false
            };

        //edit post
        case EDIT_A_POST_RESET:
            return {
                ...state, isHaveEdited: false
            };
        case EDIT_A_POST_SUCCESS:
            return {
                ...state, isHaveEdited: true
            };
        case EDIT_A_POST_FAILURE:
            return {
                ...state, isHaveEdited: false
            };

        //report
        case REPORT_A_POST_RESET:
            return { ...state, isHaveReported: false };
        case REPORT_A_POST_SUCCESS:
            return { ...state, isHaveReported: true };
        case REPORT_A_POST_FAILURE:
            return { ...state, isHaveReported: false };

        //pending post
        case GET_PENDING_POSTS_REQUEST:
            return {
                ...state, pendingPosts: {
                    ...state.pendingPosts,
                    isLoading: true
                }
            };
        case GET_PENDING_POSTS_SUCCESS:
            return {
                ...state, pendingPosts: {
                    isLoading: false,
                    data: action.payload.postSummaryDTOs,
                    totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
                    totalElements: action.payload.totalElements ? action.payload.totalElements : 0
                }
            };
        case GET_PENDING_POSTS_FAILURE:
            return {
                ...state, pendingPosts: {
                    isLoading: false,
                    data: null
                }
            };

        case GET_REPORTED_POSTS_REQUEST:
            return {
                ...state, reportedPosts: {
                    ...state.reportedPosts,
                    isLoading: true
                }
            };
        case GET_REPORTED_POSTS_SUCCESS:
            return {
                ...state, reportedPosts: {
                    isLoading: false,
                    data: action.payload.postSummaryWithStateDTOs,
                    totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
                    totalElements: action.payload.totalElements ? action.payload.totalElements : 0
                }
            };
        case GET_REPORTED_POSTS_FAILURE:
            return {
                ...state, reportedPosts: {
                    isLoading: false,
                    data: [],
                    totalPages: 1,
                    totalElements: 0
                }
            };

        //resolve    
        case RESOLVE_A_POST_RESET:
            return { ...state, isHaveResolved: false };
        case RESOLVE_A_POST_SUCCESS:
            return { ...state, isHaveResolved: true };
        case RESOLVE_A_POST_FAILURE:
            return { ...state, isHaveResolved: false };

        default:
            return state;
    }
}

export default PostReducer;

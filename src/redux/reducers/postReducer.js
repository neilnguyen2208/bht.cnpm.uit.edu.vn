import {
    POST_APPROVE_A_POST_REQUEST,
    POST_APPROVE_A_POST_SUCCESS,
    POST_APPROVE_A_POST_FAILURE,

    //highlight posts list
    GET_HIGHLIGHT_POSTS_LIST_REQUEST,
    GET_HIGHLIGHT_POSTS_LIST_SUCCESS,
    GET_HIGHLIGHT_POSTS_LIST_FAILURE,

    //post
    GET_POST_BY_ID_REQUEST,
    GET_POST_BY_ID_SUCCESS,
    GET_POST_BY_ID_FAILURE,

    //post list
    GET_POSTS_LIST_SUCCESS,
    GET_POSTS_LIST_REQUEST,
    GET_POSTS_LIST_FAILURE,

    //my post
    GET_MY_POSTS_REQUEST,
    GET_MY_POSTS_SUCCESS,
    GET_MY_POSTS_FAILURE,

    //search post 
    GET_POST_SEARCH_RESULT_REQUEST,
    GET_POST_SEARCH_RESULT_SUCCESS,
    GET_POST_SEARCH_RESULT_FAILURE,

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

    DELETE_A_POST_REQUEST,
    DELETE_A_POST_SUCCESS,
    DELETE_A_POST_FAILURE,


} from '../constants.js'

const initialState = {
    currentPost: {
        isLoading: false, data: {}
    },

    //search post: use for search post and post list
    postsList: {
        isLoading: false,
        data: [],
        totalPages: 0
    },

    //my posts
    myPosts: {
        isLoading: false,
        data: [],
        totalPages: 0
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

    approvePost: {
        isLoadDone: false
    },
    
    likePostStatus: { isLiking: false, isUnLiking: false },
};

function PostReducer(state = initialState, action) {
    switch (action.type) {

        case GET_POST_BY_ID_REQUEST:
            return {
                ...state, currentPost: { isLoading: true }
            };
        case GET_POST_BY_ID_SUCCESS:
            {
                return { ...state, currentPost: { isLoading: false, data: action.payload } }
            }
        case GET_POST_BY_ID_FAILURE:
            {
                return { ...state, currentPost: { ...state.currentPost, isLoading: false } }
            }
        //get all not approved post

        case POST_APPROVE_A_POST_REQUEST:
            {
                return { ...state, approvePost: { isLoading: true } }
            }
        case POST_APPROVE_A_POST_SUCCESS:
            {
                return { ...state, approvePost: { isLoading: false, notification: { type: 'success', message: 'Duyệt thành công' } } }
            }
        case POST_APPROVE_A_POST_FAILURE:
            {
                return { ...state, approvePost: { isLoading: false, notification: { type: 'failure', message: 'Duyệt thất bại' } } }
            }

        //get highlight posts list

        case GET_HIGHLIGHT_POSTS_LIST_REQUEST:
            return {
                ...state, highlightPosts: { isLoading: true, isLoadDone: false }
            };
        case GET_HIGHLIGHT_POSTS_LIST_SUCCESS:
            {
                return { ...state, highlightPosts: { isLoading: false, isLoadDone: true, data: action.payload } }
            }
        case GET_HIGHLIGHT_POSTS_LIST_FAILURE:
            {
                return { ...state, highlightPosts: { isLoading: false, isLoadDone: true, data: [] } }
            }
        //get my post
        case GET_MY_POSTS_REQUEST:
            return {
                ...state, myPosts: { isLoading: true }
            };
        case GET_MY_POSTS_SUCCESS:
            {
                return { ...state, myPosts: { isLoading: false, data: action.payload.data, totalPages: action.payload.totalPages } }
            }
        case GET_MY_POSTS_FAILURE:
            {
                return { ...state, myPosts: { isLoading: false, data: [] } }
            }

        //get post search result
        case GET_POST_SEARCH_RESULT_REQUEST:
        case GET_POSTS_LIST_REQUEST:
            return {
                ...state, postsList: { isLoading: true }
            };
        case GET_POST_SEARCH_RESULT_SUCCESS:
        case GET_POSTS_LIST_SUCCESS:
            {
                return { ...state, postsList: { ...state.postsList, isLoading: false, data: action.payload.postSummaryDTOs, totalPages: action.payload.totalPages } }
            }
        case GET_POST_SEARCH_RESULT_FAILURE:
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

        case UNLIKE_A_POST_FAILURE: {
            return { ...state, unLikePost: { isLoading: false } }
        }

        //like post
        case SAVE_A_POST_REQUEST:
            return { ...state, savePost: { isLoading: true } }//use for all post item

        case SAVE_A_POST_SUCCESS:
            return { ...state, savePost: { isLoading: false } }

        case SAVE_A_POST_FAILURE:
            return { ...state, savePost: { isLoading: false } }

        //unsave post
        case UNSAVE_A_POST_REQUEST:
            return { ...state, unSavePost: { isLoading: true } } //true when any post is in the save request

        case UNSAVE_A_POST_SUCCESS:
            return { ...state, unSavePost: { isLoading: false } }

        case UNSAVE_A_POST_FAILURE: {
            return { ...state, unSavePost: { isLoading: false } }
        }

        case DELETE_A_POST_REQUEST:
            return {
                ...state
            }
        case DELETE_A_POST_SUCCESS:
            return { ...state }
        case DELETE_A_POST_FAILURE:
            return { ...state }

        default:
            return state;
    }
}

export default PostReducer;

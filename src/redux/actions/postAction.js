import {

    GET_PENDING_POSTS_REQUEST,
    GET_PENDING_POSTS_SUCCESS,
    GET_PENDING_POSTS_FAILURE,

    APPROVE_A_POST_RESET,
    APPROVE_A_POST_SUCCESS,
    APPROVE_A_POST_FAILURE,

    REJECT_A_POST_RESET,
    REJECT_A_POST_SUCCESS,
    REJECT_A_POST_FAILURE,

    REJECT_AND_FEEDBACK_A_POST_RESET,
    REJECT_AND_FEEDBACK_A_POST_SUCCESS,
    REJECT_AND_FEEDBACK_A_POST_FAILURE,

    //my post
    GET_MY_POSTS_REQUEST,
    GET_MY_POSTS_SUCCESS,
    GET_MY_POSTS_FAILURE,

    //pots list
    GET_POSTS_LIST_REQUEST,
    GET_POSTS_LIST_SUCCESS,
    GET_POSTS_LIST_FAILURE,

    //post search result & post list
    GET_POST_SEARCH_REQUEST,
    GET_POST_SEARCH_SUCCESS,
    GET_POST_SEARCH_FAILURE,

    POST_CREATE_POST_REQUEST,
    POST_CREATE_POST_SUCCESS,
    POST_CREATE_POST_FAILURE,

    GET_POST_BY_ID_SUCCESS,
    GET_POST_BY_ID_FAILURE,
    GET_POST_BY_ID_RESET,

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
    UNSAVE_A_POST_FAILURE,
    SAVE_A_POST_FAILURE,

    DELETE_A_POST_RESET,
    DELETE_A_POST_SUCCESS,
    DELETE_A_POST_FAILURE,

    EDIT_A_POST_RESET,
    EDIT_A_POST_SUCCESS,
    EDIT_A_POST_FAILURE,

    REPORT_A_POST_RESET,
    REPORT_A_POST_SUCCESS,
    REPORT_A_POST_FAILURE,

    GET_REPORTED_POSTS_REQUEST,
    GET_REPORTED_POSTS_SUCCESS,
    GET_REPORTED_POSTS_FAILURE,

    RESOLVE_A_POST_RESET,
    RESOLVE_A_POST_SUCCESS,
    RESOLVE_A_POST_FAILURE,
    GET_RELATIVE_SAME_CATEGORY_POSTS_SUCCESS,
    GET_RELATIVE_SAME_CATEGORY_POSTS_RESET,
    GET_RELATIVE_SAME_CATEGORY_POSTS_FAILURE,
    GET_RELATIVE_SAME_AUTHOR_POSTS_FAILURE,
    GET_RELATIVE_SAME_AUTHOR_POSTS_SUCCESS,
    GET_RELATIVE_SAME_AUTHOR_POSTS_RESET,



} from "../constants.js"

//create a post 
export function post_CreatePostRequest() {
    return {
        type: POST_CREATE_POST_REQUEST
    }
}

export function post_CreatePostSuccess(notification) {
    return {
        type: POST_CREATE_POST_SUCCESS,
        payload: notification
    }
}

export function post_CreatePostFailure(notification) {
    return {
        type: POST_CREATE_POST_FAILURE,
        payload: notification
    }
}

export function post_ApproveAPostReset() {
    return {
        type: APPROVE_A_POST_RESET
    }
}

export function post_ApproveAPostSuccess(notification) {
    return {
        type: APPROVE_A_POST_SUCCESS,
        payload: notification
    }
}

export function post_ApproveAPostFailure(notification) {
    return {
        type: APPROVE_A_POST_FAILURE,
        payload: notification
    }
}

export function delete_RejectAPostReset() {
    return {
        type: REJECT_A_POST_RESET
    }
}

export function delete_RejectAPostSuccess() {
    return {
        type: REJECT_A_POST_SUCCESS
    }
}

export function delete_RejectAPostFailure() {
    return {
        type: REJECT_A_POST_FAILURE
    }
}

export function delete_RejectAndFeedbackAPostReset() {
    return {
        type: REJECT_AND_FEEDBACK_A_POST_RESET
    }
}

export function delete_RejectAndFeedbackAPostSuccess() {
    return {
        type: REJECT_AND_FEEDBACK_A_POST_SUCCESS
    }
}

export function delete_RejectAndFeedbackAPostFailure() {
    return {
        type: REJECT_AND_FEEDBACK_A_POST_FAILURE
    }
}

//my posts
export function get_MyPostsRequest() {
    return {
        type: GET_MY_POSTS_REQUEST,
    }
}

export function get_MyPostsSuccess(data) {
    return {
        type: GET_MY_POSTS_SUCCESS,
        payload: data
    }
}

export function get_MyPostsFailure() {
    return {
        type: GET_MY_POSTS_FAILURE
    }
}

//reported post
export function get_ReportedPostsRequest() {
    return {
        type: GET_REPORTED_POSTS_REQUEST,
    }
}

export function get_ReportedPostsSuccess(data) {
    return {
        type: GET_REPORTED_POSTS_SUCCESS,
        payload: data
    }
}

export function get_ReportedPostsFailure() {
    return {
        type: GET_REPORTED_POSTS_FAILURE
    }
}


//posts list 
export function get_PostsListRequest() {
    return { type: GET_POSTS_LIST_REQUEST }
}

export function get_PostsListSuccess(data) {
    return { type: GET_POSTS_LIST_SUCCESS, payload: data }
}

export function get_PostsListFailure(error) {
    return { type: GET_POSTS_LIST_FAILURE, error: error }
}

//post by IDarr
//posts list 
export function get_PostByIDSuccess(data) {
    return { type: GET_POST_BY_ID_SUCCESS, payload: data }
}

export function get_PostByIDFailure(error) {
    return { type: GET_POST_BY_ID_FAILURE, error: error }
}

export function get_PostByIDReset() {
    return { type: GET_POST_BY_ID_RESET }
}

//post search result
export function get_PostSearchResultRequest() {
    return {
        type: GET_POST_SEARCH_REQUEST
    }
}

export function get_PostSearchResultSuccess(data) {
    return {
        type: GET_POST_SEARCH_SUCCESS, payload: data
    }
}

export function get_PostSearchResultFailure(error) {
    return {
        type: GET_POST_SEARCH_FAILURE,
        payload: error
    }
}

//post search result
export function post_LikeAPostRequest(data) {
    return {
        type: LIKE_A_POST_REQUEST,
        payload: data
    }
}

export function delete_UnLikeAPostRequest(data) {
    return {
        type: UNLIKE_A_POST_REQUEST,
        payload: data
    }
}

export function post_LikeAPostSuccess(data) {
    return {
        type: LIKE_A_POST_SUCCESS,
        payload: data
    }
}

export function delete_UnLikeAPostSuccess(data) {
    return {
        type: UNLIKE_A_POST_SUCCESS,
        payload: data
    }
}

export function post_LikeAPostFailure(data) {
    return {
        type: LIKE_A_POST_FAILURE,
        payload: data
    }
}

export function delete_UnLikeAPostFailure(data) {
    return {
        type: UNLIKE_A_POST_FAILURE,
        payload: data
    }
}

//post search result, phan dung toi id sau nay moi lam, gio chua lam ki
export function post_SaveAPostRequest(data) {
    return {
        type: SAVE_A_POST_REQUEST,
        payload: data
    }
}

export function delete_UnSaveAPostRequest(data) {
    return {
        type: UNSAVE_A_POST_REQUEST,
        payload: data
    }
}

export function post_SaveAPostSuccess(data) {
    return {
        type: SAVE_A_POST_SUCCESS,
        payload: data
    }
}

export function post_SaveAPostFailure(data) {
    return {
        type: SAVE_A_POST_FAILURE,
        payload: data
    }
}

export function delete_UnSaveAPostSuccess(data) {
    return {
        type: UNSAVE_A_POST_SUCCESS,
        payload: data
    }
}

export function delete_UnSaveAPostFailure(data) {
    return {
        type: UNSAVE_A_POST_FAILURE,
        payload: data
    }
}

// edit and delete post
export function delete_APostReset(data) {
    return {
        type: DELETE_A_POST_RESET,
        request: data
    }
}

export function delete_APostSuccess(data) {
    return {
        type: DELETE_A_POST_SUCCESS,
        payload: data
    }
}

export function delete_APostFailure() {
    return {
        type: DELETE_A_POST_FAILURE
    }
}

export function put_EditAPostReset(data) {
    return {
        type: EDIT_A_POST_RESET
    }
}

export function put_EditAPostSuccess(data) {
    return {
        type: EDIT_A_POST_SUCCESS,
        payload: data
    }
}

export function put_EditAPostFailure() {
    return {
        type: EDIT_A_POST_FAILURE
    }
}


export function post_ReportAPostReset() {
    return {
        type: REPORT_A_POST_RESET
    }
}

export function post_ReportAPostSuccess() {
    return {
        type: REPORT_A_POST_SUCCESS
    }
}

export function post_ReportAPostFailure() {
    return {
        type: REPORT_A_POST_FAILURE
    }
}

export function get_PendingPostsRequest() {
    return { type: GET_PENDING_POSTS_REQUEST }
}

export function get_PendingPostsSuccess(data) {
    return { type: GET_PENDING_POSTS_SUCCESS, payload: data }
}

export function get_PendingPostsFailure(data) {
    return { type: GET_PENDING_POSTS_FAILURE }
}

export function post_ResolveAPostReset() {
    return {
        type: RESOLVE_A_POST_RESET
    }
}

export function post_ResolveAPostSuccess() {
    return {
        type: RESOLVE_A_POST_SUCCESS
    }
}

export function post_ResolveAPostFailure() {
    return {
        type: RESOLVE_A_POST_FAILURE
    }
}

export function get_RelativeSameCategoryPostsReset() {
    return {
        type: GET_RELATIVE_SAME_CATEGORY_POSTS_RESET
    }
}

export function get_RelativeSameCategoryPostsSuccess(data) {
    return {
        type: GET_RELATIVE_SAME_CATEGORY_POSTS_SUCCESS,
        payload: data
    }
}

export function get_RelativeSameCategoryPostsFailure() {
    return {
        type: GET_RELATIVE_SAME_CATEGORY_POSTS_FAILURE
    }
}


export function get_RelativeSameAuthorPostsReset() {
    return {
        type: GET_RELATIVE_SAME_AUTHOR_POSTS_RESET
    }
}

export function get_RelativeSameAuthorPostsSuccess(data) {
    return {
        type: GET_RELATIVE_SAME_AUTHOR_POSTS_SUCCESS,
        payload: data
    }
}

export function get_RelativeSameAuthorPostsFailure() {
    return {
        type: GET_RELATIVE_SAME_AUTHOR_POSTS_FAILURE
    }
}
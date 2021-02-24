import {

    // GET_ALL_NOT_APPROVED_DOCUMENTS_SUCCESS,
    // GET_ALL_NOT_APPROVED_DOCUMENTS_REQUEST,
    // GET_ALL_NOT_APPROVED_DOCUMENTS_FAILURE,

    POST_APPROVE_A_POST_REQUEST,
    POST_APPROVE_A_POST_SUCCESS,
    POST_APPROVE_A_POST_FAILURE,
    // APPROVE_A_DOCUMENT,

    //highlight posts 

    //my post
    GET_MY_POSTS_REQUEST,
    GET_MY_POSTS_SUCCESS,
    GET_MY_POSTS_FAILURE,

    //pots list
    GET_POSTS_LIST_REQUEST,
    GET_POSTS_LIST_SUCCESS,
    GET_POSTS_LIST_FAILURE,

    //post search result & post list
    GET_POST_SEARCH_RESULT_REQUEST,
    GET_POST_SEARCH_RESULT_SUCCESS,
    GET_POST_SEARCH_RESULT_FAILURE,

    POST_CREATE_POST_REQUEST,
    POST_CREATE_POST_SUCCESS,
    POST_CREATE_POST_FAILURE,

    GET_POST_BY_ID_REQUEST,
    GET_POST_BY_ID_SUCCESS,
    GET_POST_BY_ID_FAILURE,

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

    DELETE_A_POST_REQUEST,
    DELETE_A_POST_SUCCESS,
    DELETE_A_POST_FAILURE,

    EDIT_A_POST_REQUEST,
    EDIT_A_POST_SUCCESS,
    EDIT_A_POST_FAILURE

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


//create a post 
export function post_ApproveAPostRequest() {
    return {
        type: POST_APPROVE_A_POST_REQUEST
    }
}

export function post_ApproveAPostSuccess(notification) {
    return {
        type: POST_APPROVE_A_POST_SUCCESS,
        payload: notification
    }
}

export function post_ApproveAPostFailure(notification) {
    return {
        type: POST_APPROVE_A_POST_FAILURE,
        payload: notification
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
export function get_PostByIDRequest() {
    return { type: GET_POST_BY_ID_REQUEST }
}

export function get_PostByIDSuccess(data) {
    return { type: GET_POST_BY_ID_SUCCESS, payload: data }
}

export function get_PostByIDFailure(error) {
    return { type: GET_POST_BY_ID_FAILURE, error: error }
}

//post search result
export function get_PostSearchResultRequest() {
    return {
        type: GET_POST_SEARCH_RESULT_REQUEST
    }
}

export function get_PostSearchResultSuccess(data) {
    return {
        type: GET_POST_SEARCH_RESULT_SUCCESS, payload: data
    }
}

export function get_PostSearchResultFailure(error) {
    return {
        type: GET_POST_SEARCH_RESULT_FAILURE,
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
export function delete_APostRequest(data) {
    return {
        type: DELETE_A_POST_REQUEST,
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

export function post_EditAPostRequest(data) {
    return {
        type: EDIT_A_POST_REQUEST
    }
}

export function post_EditAPostSuccess(data) {
    return {
        type: EDIT_A_POST_SUCCESS,
        payload: data
    }
}

export function post_EditAPostFailure() {
    return {
        type: EDIT_A_POST_FAILURE
    }
}

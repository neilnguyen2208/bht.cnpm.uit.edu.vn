import {

    GET_ALL_NOT_APPROVED_DOCUMENTS_SUCCESS,
    GET_ALL_NOT_APPROVED_DOCUMENTS_REQUEST,
    GET_ALL_NOT_APPROVED_DOCUMENTS_FAILURE,

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

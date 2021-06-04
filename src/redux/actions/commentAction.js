

import {
  GET_A_POST_COMMENTS_SUCCESS,
  GET_A_POST_COMMENTS_REQUEST,
  GET_A_POST_COMMENTS_FAILURE,
  CREATE_A_POST_COMMENT_RESET,
  CREATE_A_POST_COMMENT_SUCCESS,
  CREATE_A_POST_COMMENT_FAILURE,
  LIKE_A_POST_COMMENT_REQUEST,
  UNLIKE_A_POST_COMMENT_REQUEST,
  LIKE_A_POST_COMMENT_SUCCESS,
  UNLIKE_A_POST_COMMENT_SUCCESS,
  LIKE_A_POST_COMMENT_FAILURE,
  UNLIKE_A_POST_COMMENT_FAILURE,
  DELETE_A_POST_COMMENT_RESET,
  DELETE_A_POST_COMMENT_SUCCESS,
  DELETE_A_POST_COMMENT_FAILURE,
  EDIT_A_POST_COMMENT_RESET,
  EDIT_A_POST_COMMENT_SUCCESS,
  EDIT_A_POST_COMMENT_FAILURE,
  REPORT_A_POST_COMMENT_RESET,
  REPORT_A_POST_COMMENT_SUCCESS,
  REPORT_A_POST_COMMENT_FAILURE,
  RESOLVE_A_POST_COMMENT_RESET,
  RESOLVE_A_POST_COMMENT_SUCCESS,
  RESOLVE_A_POST_COMMENT_FAILURE,
} from "../constants.js"

//new document
export function get_APostCommentsRequest() {
  return {
    type: GET_A_POST_COMMENTS_REQUEST,
  }
}

export function get_APostCommentsSuccess(data) {
  return {
    type: GET_A_POST_COMMENTS_SUCCESS,
    payload: data
  }
}

export function get_APostCommentFailure(error) {
  return {
    type: GET_A_POST_COMMENTS_FAILURE,
    payload: error
  }
}


export function create_APostCommentReset() {
  return {
    type: CREATE_A_POST_COMMENT_RESET,
  }
}

export function create_APostCommentSuccess(data) {
  return {
    type: CREATE_A_POST_COMMENT_SUCCESS,
    payload: data
  }
}

export function create_APostCommentFailure(error) {
  return {
    type: CREATE_A_POST_COMMENT_FAILURE,
    payload: error
  }
}


export function post_LikeAPostCommentRequest(data) {
  return {
    type: LIKE_A_POST_COMMENT_REQUEST,
    payload: data
  }
}

export function delete_UnLikeAPostCommentRequest(data) {
  return {
    type: UNLIKE_A_POST_COMMENT_REQUEST,
    payload: data
  }
}

export function post_LikeAPostCommentSuccess(data) {
  return {
    type: LIKE_A_POST_COMMENT_SUCCESS,
    payload: data
  }
}

export function delete_UnLikeAPostCommentSuccess(data) {
  return {
    type: UNLIKE_A_POST_COMMENT_SUCCESS,
    payload: data
  }
}

export function post_LikeAPostCommentFailure(data) {
  return {
    type: LIKE_A_POST_COMMENT_FAILURE,
    payload: data
  }
}

export function delete_UnLikeAPostCommentFailure(data) {
  return {
    type: UNLIKE_A_POST_COMMENT_FAILURE,
    payload: data
  }
}


export function delete_APostReset(data) {
  return {
    type: DELETE_A_POST_COMMENT_RESET,
    request: data
  }
}

export function delete_APostSuccess(data) {
  return {
    type: DELETE_A_POST_COMMENT_SUCCESS,
    payload: data
  }
}

export function delete_APostFailure() {
  return {
    type: DELETE_A_POST_COMMENT_FAILURE
  }
}

export function put_EditAPostReset(data) {
  return {
    type: EDIT_A_POST_COMMENT_RESET
  }
}

export function put_EditAPostSuccess(data) {
  return {
    type: EDIT_A_POST_COMMENT_SUCCESS,
    payload: data
  }
}

export function put_EditAPostFailure() {
  return {
    type: EDIT_A_POST_COMMENT_FAILURE
  }
}


export function post_ReportAPostReset() {
  return {
    type: REPORT_A_POST_COMMENT_RESET
  }
}

export function post_ReportAPostSuccess() {
  return {
    type: REPORT_A_POST_COMMENT_SUCCESS
  }
}

export function post_ReportAPostFailure() {
  return {
    type: REPORT_A_POST_COMMENT_FAILURE
  }
}

// export function get_PendingPostsRequest() {
//   return { type: GET_PENDING_POSTS_REQUEST }
// }

// export function get_PendingPostsSuccess(data) {
//   return { type: GET_PENDING_POSTS_SUCCESS, payload: data }
// }

// export function get_PendingPostsFailure(data) {
//   return { type: GET_PENDING_POSTS_FAILURE }
// }

export function post_ResolveAPostReset() {
  return {
    type: RESOLVE_A_POST_COMMENT_RESET
  }
}

export function post_ResolveAPostSuccess() {
  return {
    type: RESOLVE_A_POST_COMMENT_SUCCESS
  }
}

export function post_ResolveAPostFailure() {
  return {
    type: RESOLVE_A_POST_COMMENT_FAILURE
  }
}

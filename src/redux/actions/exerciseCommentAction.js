

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
  CREATE_A_PC_REPLY_SUCCESS,
  CREATE_A_PC_REPLY_RESET,
  CREATE_A_PC_REPLY_FAILURE,
  GET_COMMENT_REPORT_REASONS_REQUEST,
  GET_COMMENT_REPORT_REASONS_SUCCESS,
  GET_COMMENT_REPORT_REASONS_FAILURE,
  GET_REPORTED_POST_COMMENTS_REQUEST,
  GET_REPORTED_POST_COMMENTS_SUCCESS,
  GET_REPORTED_POST_COMMENTS_FAILURE

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
  console.log(data)
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

export function create_APostCommentReplyReset() {
  return {
    type: CREATE_A_PC_REPLY_RESET
  }
}

export function create_APostCommentReplySuccess(data) {
  console.log(data)
  return {
    type: CREATE_A_PC_REPLY_SUCCESS,
    payload: data
  }
}

export function create_APostCommentReplyFailure(error) {
  return {
    type: CREATE_A_PC_REPLY_FAILURE,
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


export function delete_APostCommentReset(data) {
  return {
    type: DELETE_A_POST_COMMENT_RESET,
    request: data
  }
}

export function delete_APostCommentSuccess(data) {
  return {
    type: DELETE_A_POST_COMMENT_SUCCESS,
    payload: data
  }
}

export function delete_APostCommentFailure() {
  return {
    type: DELETE_A_POST_COMMENT_FAILURE
  }
}

export function put_EditAPostCommentReset(data) {
  return {
    type: EDIT_A_POST_COMMENT_RESET
  }
}

export function put_EditAPostCommentSuccess(data) {
  console.log("action fired")
  return {
    type: EDIT_A_POST_COMMENT_SUCCESS,
    payload: data
  }
}

export function put_EditAPostCommentFailure() {
  return {
    type: EDIT_A_POST_COMMENT_FAILURE
  }
}

export function post_ReportAPostCommentReset() {
  return {
    type: REPORT_A_POST_COMMENT_RESET
  }
}

export function post_ReportAPostCommentSuccess() {
  return {
    type: REPORT_A_POST_COMMENT_SUCCESS
  }
}

export function post_ReportAPostCommentFailure() {
  return {
    type: REPORT_A_POST_COMMENT_FAILURE
  }
}

export function get_CommentReportReasonsRequest() {
  return { type: GET_COMMENT_REPORT_REASONS_REQUEST }
}

export function get_CommentReportReasonsSuccess(data) {
  return { type: GET_COMMENT_REPORT_REASONS_SUCCESS, payload: data }
}

export function get_CommentReportReasonsFailure(data) {
  return { type: GET_COMMENT_REPORT_REASONS_FAILURE }
}

export function get_ReportedPostCommentsRequest() {
  return { type: GET_REPORTED_POST_COMMENTS_REQUEST }
}

export function get_ReportedPostCommentsSuccess(data) {
  return { type: GET_REPORTED_POST_COMMENTS_SUCCESS, payload: data }
}

export function get_ReportedPostCommentsFailure(error) {
  return { type: GET_REPORTED_POST_COMMENTS_FAILURE, payload: error }
}

export function post_ResolveAPostCommentReset() {
  return {
    type: RESOLVE_A_POST_COMMENT_RESET
  }
}

export function post_ResolveAPostCommentSuccess() {
  return {
    type: RESOLVE_A_POST_COMMENT_SUCCESS
  }
}

export function post_ResolveAPostCommentFailure() {
  return {
    type: RESOLVE_A_POST_COMMENT_FAILURE
  }
}

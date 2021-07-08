

import {
  GET_A_DOCUMENT_COMMENTS_SUCCESS,
  GET_A_DOCUMENT_COMMENTS_REQUEST,
  GET_A_DOCUMENT_COMMENTS_FAILURE,
  CREATE_A_DOCUMENT_COMMENT_RESET,
  CREATE_A_DOCUMENT_COMMENT_SUCCESS,
  CREATE_A_DOCUMENT_COMMENT_FAILURE,
  LIKE_A_DOCUMENT_COMMENT_REQUEST,
  UNLIKE_A_DOCUMENT_COMMENT_REQUEST,
  LIKE_A_DOCUMENT_COMMENT_SUCCESS,
  UNLIKE_A_DOCUMENT_COMMENT_SUCCESS,
  LIKE_A_DOCUMENT_COMMENT_FAILURE,
  UNLIKE_A_DOCUMENT_COMMENT_FAILURE,
  DELETE_A_DOCUMENT_COMMENT_RESET,
  DELETE_A_DOCUMENT_COMMENT_SUCCESS,
  DELETE_A_DOCUMENT_COMMENT_FAILURE,
  EDIT_A_DOCUMENT_COMMENT_RESET,
  EDIT_A_DOCUMENT_COMMENT_SUCCESS,
  EDIT_A_DOCUMENT_COMMENT_FAILURE,
  REPORT_A_DOCUMENT_COMMENT_RESET,
  REPORT_A_DOCUMENT_COMMENT_SUCCESS,
  REPORT_A_DOCUMENT_COMMENT_FAILURE,
  RESOLVE_A_DOCUMENT_COMMENT_RESET,
  RESOLVE_A_DOCUMENT_COMMENT_SUCCESS,
  RESOLVE_A_DOCUMENT_COMMENT_FAILURE,
  CREATE_A_DOCUMENT_COMMENT_REPLY_SUCCESS,
  CREATE_A_DOCUMENT_COMMENT_REPLY_RESET,
  CREATE_A_DOCUMENT_COMMENT_REPLY_FAILURE,
  GET_COMMENT_REPORT_REASONS_REQUEST,
  GET_COMMENT_REPORT_REASONS_SUCCESS,
  GET_COMMENT_REPORT_REASONS_FAILURE,
  GET_REPORTED_DOCUMENT_COMMENTS_REQUEST,
  GET_REPORTED_DOCUMENT_COMMENTS_SUCCESS,
  GET_REPORTED_DOCUMENT_COMMENTS_FAILURE,
  GET_A_DOCUMENT_STATISTIC_RESET,
  GET_A_DOCUMENT_STATISTIC_SUCCESS,
  GET_A_DOCUMENT_STATISTIC_FAILURE

} from "../constants.js"

//new document
export function get_ADocumentCommentsRequest() {
  return {
    type: GET_A_DOCUMENT_COMMENTS_REQUEST,
  }
}

export function get_ADocumentCommentsSuccess(data) {
  return {
    type: GET_A_DOCUMENT_COMMENTS_SUCCESS,
    payload: data
  }
}

export function get_ADocumentCommentFailure(error) {
  return {
    type: GET_A_DOCUMENT_COMMENTS_FAILURE,
    payload: error
  }
}


export function create_ADocumentCommentReset() {
  return {
    type: CREATE_A_DOCUMENT_COMMENT_RESET,
  }
}

export function create_ADocumentCommentSuccess(data) {
  console.log(data)
  return {
    type: CREATE_A_DOCUMENT_COMMENT_SUCCESS,
    payload: data
  }
}

export function create_ADocumentCommentFailure(error) {
  return {
    type: CREATE_A_DOCUMENT_COMMENT_FAILURE,
    payload: error
  }
}

export function create_ADocumentCommentReplyReset() {
  return {
    type: CREATE_A_DOCUMENT_COMMENT_REPLY_RESET
  }
}

export function create_ADocumentCommentReplySuccess(data) {
  console.log(data)
  return {
    type: CREATE_A_DOCUMENT_COMMENT_REPLY_SUCCESS,
    payload: data
  }
}

export function create_ADocumentCommentReplyFailure(error) {
  return {
    type: CREATE_A_DOCUMENT_COMMENT_REPLY_FAILURE,
    payload: error
  }
}

export function post_LikeADocumentCommentRequest(data) {
  return {
    type: LIKE_A_DOCUMENT_COMMENT_REQUEST,
    payload: data
  }
}

export function delete_UnLikeADocumentCommentRequest(data) {
  return {
    type: UNLIKE_A_DOCUMENT_COMMENT_REQUEST,
    payload: data
  }
}

export function post_LikeADocumentCommentSuccess(data) {
  return {
    type: LIKE_A_DOCUMENT_COMMENT_SUCCESS,
    payload: data
  }
}

export function delete_UnLikeADocumentCommentSuccess(data) {
  return {
    type: UNLIKE_A_DOCUMENT_COMMENT_SUCCESS,
    payload: data
  }
}

export function post_LikeADocumentCommentFailure(data) {
  return {
    type: LIKE_A_DOCUMENT_COMMENT_FAILURE,
    payload: data
  }
}

export function delete_UnLikeADocumentCommentFailure(data) {
  return {
    type: UNLIKE_A_DOCUMENT_COMMENT_FAILURE,
    payload: data
  }
}


export function delete_ADocumentCommentReset(data) {
  return {
    type: DELETE_A_DOCUMENT_COMMENT_RESET,
    request: data
  }
}

export function delete_ADocumentCommentSuccess(data) {
  return {
    type: DELETE_A_DOCUMENT_COMMENT_SUCCESS,
    payload: data
  }
}

export function delete_ADocumentCommentFailure() {
  return {
    type: DELETE_A_DOCUMENT_COMMENT_FAILURE
  }
}

export function put_EditADocumentCommentReset(data) {
  return {
    type: EDIT_A_DOCUMENT_COMMENT_RESET
  }
}

export function put_EditADocumentCommentSuccess(data) {
  console.log("action fired")
  return {
    type: EDIT_A_DOCUMENT_COMMENT_SUCCESS,
    payload: data
  }
}

export function put_EditADocumentCommentFailure() {
  return {
    type: EDIT_A_DOCUMENT_COMMENT_FAILURE
  }
}

export function post_ReportADocumentCommentReset() {
  return {
    type: REPORT_A_DOCUMENT_COMMENT_RESET
  }
}

export function post_ReportADocumentCommentSuccess() {
  return {
    type: REPORT_A_DOCUMENT_COMMENT_SUCCESS
  }
}

export function post_ReportADocumentCommentFailure() {
  return {
    type: REPORT_A_DOCUMENT_COMMENT_FAILURE
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

export function get_ReportedDocumentCommentsRequest() {
  return { type: GET_REPORTED_DOCUMENT_COMMENTS_REQUEST }
}

export function get_ReportedDocumentCommentsSuccess(data) {
  return { type: GET_REPORTED_DOCUMENT_COMMENTS_SUCCESS, payload: data }
}

export function get_ReportedDocumentCommentsFailure(error) {
  return { type: GET_REPORTED_DOCUMENT_COMMENTS_FAILURE, payload: error }
}

export function post_ResolveADocumentCommentReset() {
  return {
    type: RESOLVE_A_DOCUMENT_COMMENT_RESET
  }
}

export function post_ResolveADocumentCommentSuccess() {
  return {
    type: RESOLVE_A_DOCUMENT_COMMENT_SUCCESS
  }
}

export function post_ResolveADocumentCommentFailure() {
  return {
    type: RESOLVE_A_DOCUMENT_COMMENT_FAILURE
  }
}

export function get_ADocumentStatisticReset() {
  return { type: GET_A_DOCUMENT_STATISTIC_RESET }
}

//not implemented yet
export function get_ADocumentStatisticSuccess(data) {
  return { type: GET_A_DOCUMENT_STATISTIC_SUCCESS, data: data }
}

export function get_ADocumentStatisticFailure(error) {
  return { type: GET_A_DOCUMENT_STATISTIC_FAILURE, payload: error }
}

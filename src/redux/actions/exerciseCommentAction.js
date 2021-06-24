

import {
  GET_AN_EXERCISE_COMMENTS_SUCCESS,
  GET_AN_EXERCISE_COMMENTS_REQUEST,
  GET_AN_EXERCISE_COMMENTS_FAILURE,
  CREATE_AN_EXERCISE_COMMENT_RESET,
  CREATE_AN_EXERCISE_COMMENT_SUCCESS,
  CREATE_AN_EXERCISE_COMMENT_FAILURE,
  LIKE_AN_EXERCISE_COMMENT_REQUEST,
  UNLIKE_AN_EXERCISE_COMMENT_REQUEST,
  LIKE_AN_EXERCISE_COMMENT_SUCCESS,
  UNLIKE_AN_EXERCISE_COMMENT_SUCCESS,
  LIKE_AN_EXERCISE_COMMENT_FAILURE,
  UNLIKE_AN_EXERCISE_COMMENT_FAILURE,
  DELETE_AN_EXERCISE_COMMENT_RESET,
  DELETE_AN_EXERCISE_COMMENT_SUCCESS,
  DELETE_AN_EXERCISE_COMMENT_FAILURE,
  EDIT_AN_EXERCISE_COMMENT_RESET,
  EDIT_AN_EXERCISE_COMMENT_SUCCESS,
  EDIT_AN_EXERCISE_COMMENT_FAILURE,
  REPORT_AN_EXERCISE_COMMENT_RESET,
  REPORT_AN_EXERCISE_COMMENT_SUCCESS,
  REPORT_AN_EXERCISE_COMMENT_FAILURE,
  RESOLVE_AN_EXERCISE_COMMENT_RESET,
  RESOLVE_AN_EXERCISE_COMMENT_SUCCESS,
  RESOLVE_AN_EXERCISE_COMMENT_FAILURE,
  CREATE_AN_EXERCISE_COMMENT_REPLY_SUCCESS,
  CREATE_AN_EXERCISE_COMMENT_REPLY_RESET,
  CREATE_AN_EXERCISE_COMMENT_REPLY_FAILURE,
  GET_COMMENT_REPORT_REASONS_REQUEST,
  GET_COMMENT_REPORT_REASONS_SUCCESS,
  GET_COMMENT_REPORT_REASONS_FAILURE,
  GET_REPORTED_EXERCISE_COMMENTS_REQUEST,
  GET_REPORTED_EXERCISE_COMMENTS_SUCCESS,
  GET_REPORTED_EXERCISE_COMMENTS_FAILURE

} from "../constants.js"

//new document
export function get_AnExerciseCommentsRequest() {
  return {
    type: GET_AN_EXERCISE_COMMENTS_REQUEST,
  }
}

export function get_AnExerciseCommentsSuccess(data) {
  return {
    type: GET_AN_EXERCISE_COMMENTS_SUCCESS,
    payload: data
  }
}

export function get_AnExerciseCommentFailure(error) {
  return {
    type: GET_AN_EXERCISE_COMMENTS_FAILURE,
    payload: error
  }
}


export function create_AnExerciseCommentReset() {
  return {
    type: CREATE_AN_EXERCISE_COMMENT_RESET,
  }
}

export function create_AnExerciseCommentSuccess(data) {
  console.log(data)
  return {
    type: CREATE_AN_EXERCISE_COMMENT_SUCCESS,
    payload: data
  }
}

export function create_AnExerciseCommentFailure(error) {
  return {
    type: CREATE_AN_EXERCISE_COMMENT_FAILURE,
    payload: error
  }
}

export function create_AnExerciseCommentReplyReset() {
  return {
    type: CREATE_AN_EXERCISE_COMMENT_REPLY_RESET
  }
}

export function create_AnExerciseCommentReplySuccess(data) {
  console.log(data)
  return {
    type: CREATE_AN_EXERCISE_COMMENT_REPLY_SUCCESS,
    payload: data
  }
}

export function create_AnExerciseCommentReplyFailure(error) {
  return {
    type: CREATE_AN_EXERCISE_COMMENT_REPLY_FAILURE,
    payload: error
  }
}

export function post_LikeAnExerciseCommentRequest(data) {
  return {
    type: LIKE_AN_EXERCISE_COMMENT_REQUEST,
    payload: data
  }
}

export function delete_UnLikeAnExerciseCommentRequest(data) {
  return {
    type: UNLIKE_AN_EXERCISE_COMMENT_REQUEST,
    payload: data
  }
}

export function post_LikeAnExerciseCommentSuccess(data) {
  return {
    type: LIKE_AN_EXERCISE_COMMENT_SUCCESS,
    payload: data
  }
}

export function delete_UnLikeAnExerciseCommentSuccess(data) {
  return {
    type: UNLIKE_AN_EXERCISE_COMMENT_SUCCESS,
    payload: data
  }
}

export function post_LikeAnExerciseCommentFailure(data) {
  return {
    type: LIKE_AN_EXERCISE_COMMENT_FAILURE,
    payload: data
  }
}

export function delete_UnLikeAnExerciseCommentFailure(data) {
  return {
    type: UNLIKE_AN_EXERCISE_COMMENT_FAILURE,
    payload: data
  }
}


export function delete_AnExerciseCommentReset(data) {
  return {
    type: DELETE_AN_EXERCISE_COMMENT_RESET,
    request: data
  }
}

export function delete_AnExerciseCommentSuccess(data) {
  return {
    type: DELETE_AN_EXERCISE_COMMENT_SUCCESS,
    payload: data
  }
}

export function delete_AnExerciseCommentFailure() {
  return {
    type: DELETE_AN_EXERCISE_COMMENT_FAILURE
  }
}

export function put_EditAnExerciseCommentReset(data) {
  return {
    type: EDIT_AN_EXERCISE_COMMENT_RESET
  }
}

export function put_EditAnExerciseCommentSuccess(data) {
  console.log("action fired")
  return {
    type: EDIT_AN_EXERCISE_COMMENT_SUCCESS,
    payload: data
  }
}

export function put_EditAnExerciseCommentFailure() {
  return {
    type: EDIT_AN_EXERCISE_COMMENT_FAILURE
  }
}

export function post_ReportAnExerciseCommentReset() {
  return {
    type: REPORT_AN_EXERCISE_COMMENT_RESET
  }
}

export function post_ReportAnExerciseCommentSuccess() {
  return {
    type: REPORT_AN_EXERCISE_COMMENT_SUCCESS
  }
}

export function post_ReportAnExerciseCommentFailure() {
  return {
    type: REPORT_AN_EXERCISE_COMMENT_FAILURE
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

export function get_ReportedExerciseCommentsRequest() {
  return { type: GET_REPORTED_EXERCISE_COMMENTS_REQUEST }
}

export function get_ReportedExerciseCommentsSuccess(data) {
  return { type: GET_REPORTED_EXERCISE_COMMENTS_SUCCESS, payload: data }
}

export function get_ReportedExerciseCommentsFailure(error) {
  return { type: GET_REPORTED_EXERCISE_COMMENTS_FAILURE, payload: error }
}

export function post_ResolveAnExerciseCommentReset() {
  return {
    type: RESOLVE_AN_EXERCISE_COMMENT_RESET
  }
}

export function post_ResolveAnExerciseCommentSuccess() {
  return {
    type: RESOLVE_AN_EXERCISE_COMMENT_SUCCESS
  }
}

export function post_ResolveAnExerciseCommentFailure() {
  return {
    type: RESOLVE_AN_EXERCISE_COMMENT_FAILURE
  }
}

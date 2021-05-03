

import {
  GET_A_POST_COMMENTS_SUCCESS,
  GET_A_POST_COMMENTS_REQUEST,
  GET_A_POST_COMMENTS_FAILURE
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

export function get_APostCommentFailure() {
  return {
    type: GET_A_POST_COMMENTS_FAILURE,
  }
}


import {
  //new documents
  GET_TRENDING_DOCUMENTS_LIST_REQUEST,
  GET_TRENDING_DOCUMENTS_LIST_SUCCESS,
  GET_TRENDING_DOCUMENTS_LIST_FAILURE,

  GET_HIGHLIGHT_POSTS_REQUEST,
  GET_HIGHLIGHT_POSTS_SUCCESS,
  GET_HIGHLIGHT_POSTS_FAILURE,

  HIGHLIGHT_A_POST_RESET,
  HIGHLIGHT_A_POST_SUCCESS,
  HIGHLIGHT_A_POST_FAILURE,

  DELETE_HIGHLIGHT_A_POST_RESET,
  DELETE_HIGHLIGHT_A_POST_SUCCESS,
  DELETE_HIGHLIGHT_A_POST_FAILURE,

  GET_HIGHLIGHT_POSTS_IDS_REQUEST,
  GET_HIGHLIGHT_POSTS_IDS_SUCCESS,
  GET_HIGHLIGHT_POSTS_IDS_FAILURE,

  STICK_A_POST_TO_TOP_FAILURE,
  STICK_A_POST_TO_TOP_SUCCESS,
  STICK_A_POST_TO_TOP_REQUEST,

  GET_NEWEST_POSTS_REQUEST,
  GET_NEWEST_POSTS_SUCCESS,
  GET_NEWEST_POSTS_FAILURE,

  GET_NEWEST_ACTIVITIES_LIST_REQUEST,
  GET_NEWEST_ACTIVITIES_LIST_SUCCESS,
  GET_NEWEST_ACTIVITIES_LIST_FAILURE,

  GET_NEWEST_EXERCISES_LIST_REQUEST,
  GET_NEWEST_EXERCISES_LIST_SUCCESS,
  GET_NEWEST_EXERCISES_LIST_FAILURE

} from "../constants.js"

//new document
export function get_TrendingDocumentsRequest() {
  return {
    type: GET_TRENDING_DOCUMENTS_LIST_REQUEST,
  }
}

export function get_TrendingDocumentsSuccess(data) {
  return {
    type: GET_TRENDING_DOCUMENTS_LIST_SUCCESS,
    payload: data
  }
}

export function get_TrendingDocumentsFailure(error) {
  return {
    type: GET_TRENDING_DOCUMENTS_LIST_FAILURE,
    payload: error
  }
}

//highlight posts 
export function get_HighlightPostsRequest() {
  return {
    type: GET_HIGHLIGHT_POSTS_REQUEST,
  }
}

export function get_HighlightPostsSuccess(data) {
  return {
    type: GET_HIGHLIGHT_POSTS_SUCCESS,
    payload: data
  }
}

export function get_HighlightPostsFailure(error) {
  return {
    type: GET_HIGHLIGHT_POSTS_FAILURE,
    payload: error
  }
}


//highlight posts 
export function get_NewestPostsRequest() {
  return {
    type: GET_NEWEST_POSTS_REQUEST,
  }
}

export function get_NewestPostsSuccess(data) {
  return {
    type: GET_NEWEST_POSTS_SUCCESS,
    payload: data
  }
}

export function get_NewestPostsFailure(error) {
  return {
    type: GET_NEWEST_POSTS_FAILURE,
    payload: error
  }
}

//new activity
export function get_NewestActivitiesRequest() {
  return {
    type: GET_NEWEST_ACTIVITIES_LIST_REQUEST,
  }
}

export function get_NewestActivitiesSuccess(data) {
  return {
    type: GET_NEWEST_ACTIVITIES_LIST_SUCCESS,
    payload: data
  }
}

export function get_NewestActivitiesFailure(error) {
  return {
    type: GET_NEWEST_ACTIVITIES_LIST_FAILURE,
    payload: error
  }
}

export function get_NewestExcercisesRequest() {
  return {
    type: GET_NEWEST_EXERCISES_LIST_REQUEST,
  }
}

export function get_NewestExcercisesSuccess(data) {
  return {
    type: GET_NEWEST_EXERCISES_LIST_SUCCESS,
    payload: data
  }
}

export function get_NewestExcercisesFailure(error) {
  return {
    type: GET_NEWEST_EXERCISES_LIST_FAILURE,
    payload: error
  }
}

export function highlight_APostReset() {
  return {
    type: HIGHLIGHT_A_POST_RESET
  }
}

export function highlight_APostSuccess(data) {
  return {
    type: HIGHLIGHT_A_POST_SUCCESS,
    payload: data
  }
}

export function highlight_APostFailure(data) {
  return {
    type: HIGHLIGHT_A_POST_FAILURE,

  }
}

export function delete_HighlightAPostReset() {
  return {
    type: DELETE_HIGHLIGHT_A_POST_RESET
  }
}

export function delete_HighlightAPostSuccess(data) {
  return {
    type: DELETE_HIGHLIGHT_A_POST_SUCCESS,
    payload: data
  }
}

export function delete_HighlightAPostFailure() {
  return {
    type: DELETE_HIGHLIGHT_A_POST_FAILURE,

  }
}

export function get_HighlightPostsIdsRequest() {
  return {
    type: GET_HIGHLIGHT_POSTS_IDS_REQUEST
  }
}

export function get_HighlightPostsIdsSuccess(data) {
  return {
    type: GET_HIGHLIGHT_POSTS_IDS_SUCCESS,
    payload: data
  }
}

export function get_HighlightPostsIdsFailure() {
  return {
    type: GET_HIGHLIGHT_POSTS_IDS_FAILURE,

  }
}

export function stick_APostToTopReset() {
  return {
    type: STICK_A_POST_TO_TOP_REQUEST
  }
}

export function stick_APostToTopSuccess(data) {
  return {
    type: STICK_A_POST_TO_TOP_SUCCESS,
    payload: data
  }
}

export function stick_APostToTopFailure() {
  return {
    type: STICK_A_POST_TO_TOP_FAILURE,

  }
}

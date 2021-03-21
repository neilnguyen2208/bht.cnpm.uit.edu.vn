import {
  //new documents
  GET_TRENDING_DOCUMENTS_LIST_REQUEST,
  GET_TRENDING_DOCUMENTS_LIST_SUCCESS,
  GET_TRENDING_DOCUMENTS_LIST_FAILURE,

  GET_HIGHLIGHT_POSTS_LIST_REQUEST,
  GET_HIGHLIGHT_POSTS_LIST_SUCCESS,
  GET_HIGHLIGHT_POSTS_LIST_FAILURE,

  GET_NEWEST_POSTS_LIST_REQUEST,
  GET_NEWEST_POSTS_LIST_SUCCESS,
  GET_NEWEST_POSTS_LIST_FAILURE,

  GET_NEWEST_ACTIVITIES_LIST_REQUEST,
  GET_NEWEST_ACTIVITIES_LIST_SUCCESS,
  GET_NEWEST_ACTIVITIES_LIST_FAILURE

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
    type: GET_HIGHLIGHT_POSTS_LIST_REQUEST,
  }
}

export function get_HighlightPostsSuccess(data) {
  return {
    type: GET_HIGHLIGHT_POSTS_LIST_SUCCESS,
    payload: data
  }
}

export function get_HighlightPostsFailure(error) {
  return {
    type: GET_HIGHLIGHT_POSTS_LIST_FAILURE,
    payload: error
  }
}


//highlight posts 
export function get_NewestPostsRequest() {
  return {
    type: GET_NEWEST_POSTS_LIST_REQUEST,
  }
}

export function get_NewestPostsSuccess(data) {
  return {
    type: GET_NEWEST_POSTS_LIST_SUCCESS,
    payload: data
  }
}

export function get_NewestPostsFailure(error) {
  return {
    type: GET_NEWEST_POSTS_LIST_FAILURE,
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
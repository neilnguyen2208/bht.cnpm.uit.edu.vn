import {
  //new documents
  GET_QUICK_SEARCH_RESULT_REQUEST,
  GET_QUICK_SEARCH_RESULT_SUCCESS,
  GET_QUICK_SEARCH_RESULT_FAILURE
} from "../constants.js"

//new document
export function get_QuickSearchResultRequest() {
  return {
    type: GET_QUICK_SEARCH_RESULT_REQUEST,
  }
}

export function get_QuickSearchResultSuccess(data) {
  return {
    type: GET_QUICK_SEARCH_RESULT_SUCCESS,
    payload: data
  }
}

export function get_QuickSearchResultFailure(error) {
  return {
    type: GET_QUICK_SEARCH_RESULT_FAILURE,
    payload: error
  }
}

import {
  //new documents
  GET_QUICK_SEARCH_REQUEST,
  GET_QUICK_SEARCH_SUCCESS,
  GET_QUICK_SEARCH_FAILURE,
  GET_QUICK_SEARCH_RESET,
  SET_SEARCHING
} from "../constants.js"

//new document
export function get_QuickSearchResultRequest() {
  return {
    type: GET_QUICK_SEARCH_REQUEST,
  }
}

export function get_QuickSearchResultSuccess(data) {
  return {
    type: GET_QUICK_SEARCH_SUCCESS,
    payload: data
  }
}

export function get_QuickSearchResultFailure() {
  return {
    type: GET_QUICK_SEARCH_FAILURE,
  }
}

export function get_QuickSearchResultReset() {
  return {
    type: GET_QUICK_SEARCH_RESET,
  }
}

export function setSearching(data) {
  // if(isSearching)
  return { type: SET_SEARCHING, payload: data }
}

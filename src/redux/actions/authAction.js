import {
  GET_CURRENT_USER_SUMMARY_RESET,
  GET_CURRENT_USER_SUMMARY_SUCCESS,
  GET_CURRENT_USER_SUMMARY_FAILURE,
} from 'redux/constants.js';

export function get_CurrentUserSummaryReset(data) {
  return {
    type: GET_CURRENT_USER_SUMMARY_RESET,
    payload: data
  }
}

export function get_CurrentUserSummarySuccess(data) {
  return {
    type: GET_CURRENT_USER_SUMMARY_SUCCESS,
    payload: data
  }
}

export function get_CurrentUserSummaryFailure(error) {
  return {
    type: GET_CURRENT_USER_SUMMARY_FAILURE,
    payload: error
  }
}


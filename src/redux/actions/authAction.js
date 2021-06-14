import {
  GET_CURRENT_USER_SUMMARY_RESET,
  GET_CURRENT_USER_SUMMARY_SUCCESS,
  GET_CURRENT_USER_SUMMARY_FAILURE,
  GET_USER_STATISTIC_BY_ID_SUCCESS,
  GET_USER_STATISTIC_BY_ID_RESET,
  GET_USER_STATISTIC_BY_ID_FAILURE,
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

export function get_UserStatisticByIdReset() {
  return {
    type: GET_USER_STATISTIC_BY_ID_RESET
  }
}

export function get_UserStatisticByIdSuccess(data) {
  return {
    type: GET_USER_STATISTIC_BY_ID_SUCCESS,
    payload: data
  }
}

export function get_UserStatisticByIdFailure(error) {
  return {
    type: GET_USER_STATISTIC_BY_ID_FAILURE,
    payload: error
  }
}

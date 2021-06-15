import {
  GET_CURRENT_USER_SUMMARY_RESET,
  GET_CURRENT_USER_SUMMARY_SUCCESS,
  GET_CURRENT_USER_SUMMARY_FAILURE,
  GET_USER_STATISTIC_BY_ID_SUCCESS,
  GET_USER_STATISTIC_BY_ID_RESET,
  GET_USER_STATISTIC_BY_ID_FAILURE,
  GET_USER_DETAIL_BY_ID_RESET,
  GET_USER_DETAIL_BY_ID_SUCCESS,
  GET_USER_DETAIL_BY_ID_FAILURE,
  GET_USER_DETAIL_BY_ID_REQUEST,
  GET_USER_DETAIL_BY_TOKEN_REQUEST,
  GET_USER_DETAIL_BY_TOKEN_SUCCESS,
  GET_USER_DETAIL_BY_TOKEN_FAILURE,
  UPDATE_USER_DETAIL_BY_TOKEN_REQUEST,
  UPDATE_USER_DETAIL_BY_TOKEN_RESET,
  UPDATE_USER_DETAIL_BY_TOKEN_SUCCESS,
  UPDATE_USER_DETAIL_BY_TOKEN_FAILURE,
  GET_PROFILE_AVAILABLE_ACTIONS_REQUEST,
  GET_PROFILE_AVAILABLE_ACTIONS_SUCCESS,
  GET_PROFILE_AVAILABLE_ACTIONS_FAILURE,
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

export function get_UserDetailByIdRequest() {
  return {
    type: GET_USER_DETAIL_BY_ID_REQUEST
  }
}

export function get_UserDetailByIdSuccess(data) {
  return {
    type: GET_USER_DETAIL_BY_ID_SUCCESS,
    payload: data
  }
}

export function get_UserDetailByIdFailure(error) {
  return {
    type: GET_USER_DETAIL_BY_ID_FAILURE,
    payload: error
  }
}

export function get_UserDetailByTokenRequest() {
  return {
    type: GET_USER_DETAIL_BY_TOKEN_REQUEST
  }
}

export function get_UserDetailByTokenSuccess(data) {
  return {
    type: GET_USER_DETAIL_BY_TOKEN_SUCCESS,
    payload: data
  }
}

export function get_UserDetailByTokenFailure(error) {
  return {
    type: GET_USER_DETAIL_BY_TOKEN_FAILURE,
    payload: error
  }
}

export function update_UserDetailByTokenReset() {
  return {
    type: UPDATE_USER_DETAIL_BY_TOKEN_RESET
  }
}

export function update_UserDetailByTokenSuccess(data) {
  return {
    type: UPDATE_USER_DETAIL_BY_TOKEN_SUCCESS,
    payload: data
  }
}

export function update_UserDetailByTokenFailure(error) {
  return {
    type: UPDATE_USER_DETAIL_BY_TOKEN_FAILURE,
    payload: error
  }
}

export function get_ProfileAvailableActionsRequest() {
  return {
    type: GET_PROFILE_AVAILABLE_ACTIONS_REQUEST
  }
}

export function get_ProfileAvailableActionsSuccess(data) {
  return {
    type: GET_PROFILE_AVAILABLE_ACTIONS_SUCCESS,
    payload: data
  }
}

export function get_ProfileAvailableActionsFailure(error) {
  return {
    type: GET_PROFILE_AVAILABLE_ACTIONS_FAILURE,
    payload: error
  }
}


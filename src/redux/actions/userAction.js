import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,

  BAN_A_USER_REQUEST,
  BAN_A_USER_SUCCESS,
  BAN_A_USER_FAILURE

} from '../constants.js'


export function get_AllUsersRequest() {
  return {
    type: GET_ALL_USERS_REQUEST,
  }
}

export function get_AllUsersSuccess(data) {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: data
  }
}


export function get_AllUsersFailure() {
  return {
    type: GET_ALL_USERS_FAILURE,
  }
}

export function ban_AUserRequest() {
  return {
    type: BAN_A_USER_REQUEST,
  }
}
export function ban_AUserSuccess(data) {
  return {
    type: BAN_A_USER_SUCCESS,
    payload: data
  }
}
export function ban_AUserFailure(error) {
  return {
    type: BAN_A_USER_FAILURE,
    payload: error
  }
}
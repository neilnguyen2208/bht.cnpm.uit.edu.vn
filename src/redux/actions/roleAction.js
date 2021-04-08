import {
  GET_ALL_ROLES_REQUEST,
  GET_ALL_ROLES_SUCCESS,
  GET_ALL_ROLES_FAILURE,
} from '../constants.js'

export function get_AllRolesRequest() {
  return {
    type: GET_ALL_ROLES_REQUEST,
  }
}

export function get_AllRolesSuccess(data) {
  return {
    type: GET_ALL_ROLES_SUCCESS,
    payload: data
  }
}

export function get_AllRolesFailure() {
  return {
    type: GET_ALL_ROLES_FAILURE,
  }
}

import {
  LOGIN_SUCCESS,
  AUTHENTICATE_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  AUTHENTICATE_REQUEST

} from 'redux/constants.js';

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}


export function authenticateFailure() {
  return {
    type: AUTHENTICATE_FAILURE
  }
}


export function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}
export function registerRequest() {
  return {
    type: REGISTER_REQUEST,
  }
}
export function registerFailure() {
  return {
    type: REGISTER_FAILURE,
  }
}

export function logoutRequest(data) {
  return {
    type: LOGOUT_REQUEST,
    payload: data
  }
}

export function logoutSuccess(data) {
  return {
    type: LOGOUT_SUCCESS,
    payload: data
  }
}

export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error
  }
}

export function authenticationRequest() {
  return {
    type: AUTHENTICATE_REQUEST,
  }
}


import { request } from 'utils/requestUtils';
import {
  logoutRequest,
  registerFailure,
  registerRequest,
  registerSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutSuccess
} from '../actions/authAction';

import store from 'redux/store/index'

export function login(loginDTO) {
  return dispatch => {
    dispatch(loginRequest());
    request.post('/user/login', JSON.stringify(loginDTO)).then(response => {
      dispatch(loginSuccess(response.data));
    }
    )
      .catch(error => dispatch(loginFailure(error)));
  }
}

export function register(registerDTO) {
  return dispatch => {
    dispatch(registerRequest());
    request.post('/user/register', JSON.stringify(registerDTO)).then(response =>
      dispatch(registerSuccess(response.data))
    )
      .catch(error => dispatch(registerFailure(error)));
  }
}

export function logout() {
  return dispatch => {
    dispatch(logoutSuccess());
    dispatch(logoutRequest());
    // request.post('/user/logout', JSON.stringify()).then(response =>
    //   dispatch(loginSuccess(response.data))
    // )
    //   .catch();
  }
}


//#region auth services

export function authServices() {
}

authServices.isGranted = function (permissionName) {
  let state = store.getState().auth.allPermissions;
  return state && state.includes(permissionName);
}

//#region

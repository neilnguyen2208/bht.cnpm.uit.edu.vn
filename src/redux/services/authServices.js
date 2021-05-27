import { request } from 'utils/requestUtils';
import {
  registerFailure,
  registerRequest,
  registerSuccess,
  loginSuccess,
  logoutSuccess,
  logoutFailure,
  authenticationRequest
} from '../actions/authAction';


import store from 'redux/store/index'
// import keycloak from 'keycloak.js'

export function login() {
  return dispatch => {
    // keycloak.login();
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
    // if (store.getState().auth.keycloak)
    //   store.getState().auth.keycloak.logout().then(data => {
    //     console.log("51");
    //     dispatch(logoutSuccess())
    //   }
    //   ).catch(error => {
    //     console.log("55");
    //     dispatch(logoutFailure(error));
    //   });
    // else {
    //   console.log("59");
    //   dispatch(logoutFailure("keycloak_is_null"))
    // }
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

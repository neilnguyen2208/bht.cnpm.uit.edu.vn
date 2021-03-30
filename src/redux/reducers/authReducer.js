import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,

  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,

  LOGOUT_SUCCESS,

} from 'redux/constants.js';

import { lS } from 'constants.js'

const initialState = {
  token: lS.getItem('token'),
  isAuthenticated: null, //true khi da dang nhap
  isLogingIn: false, //true khi da dang nhap
  currentUser: null,
  isSignedUp: false, //true khi da dang ky xong
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLogingIn: true
      }
    case REGISTER_REQUEST:
      return {
        ...state,
        isSignedUp: false
      }
    case LOGIN_SUCCESS:
      lS.setItem('token', action.payload.token);
      return {
        ...state,
        isSignedUp: false,
        ...action.payload,
        currentUser: {}, //chac la lay ra tu token
        isAuthenticated: true,
        isLogingIn: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        currentUser: null, //chac la lay ra tu token
        isAuthenticated: false,
        isSignedUp: true
      };
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
    case REGISTER_FAILURE:
      lS.removeItem('token');
      return {
        ...state,
        token: null,
        currentUser: null,
        isAuthenticated: false,
        isLogingIn: false,
        isSigningUp: false
      };
    default:
      return state;
  }
}

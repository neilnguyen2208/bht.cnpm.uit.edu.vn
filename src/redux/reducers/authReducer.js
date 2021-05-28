import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,

  AUTHENTICATE_REQUEST,
  AUTHENTICATE_FAILURE,



  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

} from 'redux/constants.js';
import { openBLModal } from 'redux/services/modalServices';

const initialState = {
  authentication: {
    isAuthenticating: false,
    isAuthenticated: false
  },

  expireTime: null,
  userInfo: null,
  allPermissions: [],
  logoutStatus: '',
  token: null,
  refreshToken: null

};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("We logged in for you!");
      return {
        ...state,
        authentication: {
          isAuthenticating: false,
          isAuthenticated: true
        },

        expireTime: action.payload.expireTime,
        userInfo: action.payload.userInfo,
        allPermissions: action.payload.keycloak.resourceAccess.account.roles,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        isSignedUp: false
      }

    case REGISTER_SUCCESS:
      return {

      };

    case AUTHENTICATE_REQUEST: {
      console.log("Authenticating!")
      return {
        ...state,
        authentication: {
          isAuthenticating: true,
          isAuthenticated: false
        },
        expireTime: null,
        userInfo: null,
        allPermissions: []
      }
    }

    case AUTHENTICATE_FAILURE: {
      // if (lS.getItem('kc_token') && lS.getItem('kc_token') !== "undefined")
      // lS.removeItem('kc_token');
      console.log("Authenticate failure")
      return {
        ...state,
        authentication: {
          isAuthenticating: false,
          isAuthenticated: false
        },
        expireTime: null,
        userInfo: null,
        allPermissions: [],
        token: null,
        refreshToken: null
      };
    }
    case LOGOUT_SUCCESS:
      console.log("Logout success!");
      return {
        ...state,
        authentication: {
          isAuthenticating: false,
          isAuthenticated: false
        },
        expireTime: null,
        userInfo: null,
        allPermissions: [],
        token: null,
        refreshToken: null
      };

    case LOGOUT_FAILURE:
      console.log("Logout failure!");
      return {
        ...state,
        logoutStatus: action.payload.error
      };
    default:
      return state;
  }
}

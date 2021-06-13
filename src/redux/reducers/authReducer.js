import {
  GET_CURRENT_USER_SUMMARY_REQUEST,
  GET_CURRENT_USER_SUMMARY_SUCCESS,
  GET_CURRENT_USER_SUMMARY_FAILURE

} from 'redux/constants.js';

const initialState = {
  currentUserSummary: {
    isLoadDone: false,
    data: {}
  }
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER_SUMMARY_REQUEST:
      return {
        ...state,
        currentUserSummary: {
          isLoadDone: false,
          data: state.currentUserSummary.data
        }
      };
    case GET_CURRENT_USER_SUMMARY_SUCCESS:
      return {
        ...state,
        currentUserSummary: {
          isLoadDone: true,
          data: action.payload.data
        }
      }

    case GET_CURRENT_USER_SUMMARY_FAILURE:
      return {
        ...state,
        currentUserSummary: {
          isLoadDone: false,
          data: action.payload.data, error: action.payload
        }
      };
    default:
      return state;
  }
}

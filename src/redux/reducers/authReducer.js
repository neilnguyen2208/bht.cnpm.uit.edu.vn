import {
  GET_CURRENT_USER_SUMMARY_RESET,
  GET_CURRENT_USER_SUMMARY_SUCCESS,
  GET_CURRENT_USER_SUMMARY_FAILURE,
  GET_USER_STATISTIC_BY_ID_RESET,
  GET_USER_STATISTIC_BY_ID_SUCCESS,
  GET_USER_STATISTIC_BY_ID_FAILURE

} from 'redux/constants.js';

const initialState = {
  currentUserSummary: {
    isLoadDone: false,
    data: {}
  },
  userStatistic: {
    isLoadDone: false,
    data: {}
  }
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER_SUMMARY_RESET:
      return {
        ...state,
        currentUserSummary: {
          isLoadDone: false,
          data: {}
        }
      };
    case GET_CURRENT_USER_SUMMARY_SUCCESS:
      return {
        ...state,
        currentUserSummary: {
          isLoadDone: true,
          data: action.payload
        }
      }

    case GET_CURRENT_USER_SUMMARY_FAILURE:
      return {
        ...state,
        currentUserSummary: {
          isLoadDone: false,
          data: state.currentUserSummary.data, error: action.payload
        }
      };
    case GET_USER_STATISTIC_BY_ID_RESET:
      return {
        ...state,
        userStatistic: {
          isLoadDone: false,
          data: {}
        }
      };
    case GET_USER_STATISTIC_BY_ID_SUCCESS:
      return {
        ...state,
        userStatistic: {
          isLoadDone: true,
          data: action.payload
        }
      }

    case GET_USER_STATISTIC_BY_ID_FAILURE:
      return {
        ...state,
        userStatistic: {
          isLoadDone: false,
          data: state.currentUserSummary.data, error: action.payload
        }
      };
    default:
      return state;
  }
}

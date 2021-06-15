import {
  GET_CURRENT_USER_SUMMARY_RESET,
  GET_CURRENT_USER_SUMMARY_SUCCESS,
  GET_CURRENT_USER_SUMMARY_FAILURE,
  GET_USER_STATISTIC_BY_ID_RESET,
  GET_USER_STATISTIC_BY_ID_SUCCESS,
  GET_USER_STATISTIC_BY_ID_FAILURE,
  GET_USER_DETAIL_BY_ID_SUCCESS,
  GET_USER_DETAIL_BY_ID_FAILURE,
  GET_USER_DETAIL_BY_ID_REQUEST,
  GET_USER_DETAIL_BY_TOKEN_REQUEST,
  GET_USER_DETAIL_BY_TOKEN_SUCCESS,
  GET_USER_DETAIL_BY_TOKEN_FAILURE,
  UPDATE_USER_DETAIL_BY_TOKEN_RESET,
  UPDATE_USER_DETAIL_BY_TOKEN_SUCCESS,
  UPDATE_USER_DETAIL_BY_TOKEN_FAILURE

} from 'redux/constants.js';

const initialState = {
  currentUserSummary: {
    isLoadDone: false,
    data: {}
  },
  userStatistic: {
    isLoadDone: false,
    data: {}
  },
  userDetail: {
    isLoading: false,
    data: {}
  },
  currentUserDetail: {
    isLoading: false,
    data: {}
  },
  isHaveUpdated: false
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
    case GET_USER_DETAIL_BY_ID_REQUEST:
      return {
        ...state,
        userDetail: {
          isLoadDone: false,
          data: {}
        }
      };
    case GET_USER_DETAIL_BY_ID_SUCCESS:
      return {
        ...state,
        userDetail: {
          isLoadDone: true,
          data: action.payload
        }
      }

    case GET_USER_DETAIL_BY_ID_FAILURE:
      return {
        ...state,
        userDetail: {
          isLoadDone: false,
          data: state.currentUserSummary.data, error: action.payload
        }
      };

    case GET_USER_DETAIL_BY_TOKEN_REQUEST:
      return {
        ...state,
        currentUserDetail: {
          isLoadDone: false,
          data: {}
        }
      };
    case GET_USER_DETAIL_BY_TOKEN_SUCCESS:
      return {
        ...state,
        currentUserDetail: {
          isLoadDone: true,
          data: action.payload
        }
      }

    case GET_USER_DETAIL_BY_TOKEN_FAILURE:
      return {
        ...state,
        currentUserDetail: {
          isLoadDone: false,
          data: state.currentUserSummary.data, error: action.payload
        }
      };

    case UPDATE_USER_DETAIL_BY_TOKEN_RESET:
      return {
        ...state,
        isHaveUpdated: false
      };
    case UPDATE_USER_DETAIL_BY_TOKEN_SUCCESS:
      return {
        ...state,
        isHaveUpdated: true
      }

    case UPDATE_USER_DETAIL_BY_TOKEN_FAILURE:
      return {
        ...state,
        isHaveUpdated: false
      };
      
    default:
      return state;
  }
}

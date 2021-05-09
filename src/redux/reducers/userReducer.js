import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,

  BAN_A_USER_REQUEST,
  BAN_A_USER_SUCCESS,
  BAN_A_USER_FAILURE

} from '../constants.js'

// const allUsers = [
//   {
//     id: 1,

//   }
// ]

const initialState = {
  allUsers: {
    isLoading: false,
    data: [],
    totalPages: 1,
    totalElements: 0
  },
  isHaveBanned: false
}

function UserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return {
        ...state, isLoading: true
      }
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: {
          isLoading: false,
          data: action.payload.userDTOs,
          totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
          totalElements: action.payload.totalElements ? action.payload.totalElements : 0
        }
      }

    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        allUsers: {
          isLoading: false,
          data: [],
          totalPages: 1,
          totalElements: 0
        }
      }


    case BAN_A_USER_REQUEST:
      return {
        ...state, isHaveBanned: false
      }
    case BAN_A_USER_SUCCESS:
      return { ...state, isHaveBanned: true }

    case BAN_A_USER_FAILURE:
      return { ...state, isHaveBanned: false }

    default:
      return state;
  }
}

export default UserReducer;





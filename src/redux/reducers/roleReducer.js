import {
  GET_ALL_ROLES_REQUEST,
  GET_ALL_ROLES_SUCCESS,
  GET_ALL_ROLES_FAILURE,
} from '../constants.js'

const initialState = {
  allRoles: {
    isLoading: false,
    data: [],
    searchData: [{ id: 0, name: "Tất cả" }],
    totalPages: 1,
    totalElements: 0
  },
  isHaveBanned: false
}

function RoleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ROLES_REQUEST:
      return {
        ...state,
        allRoles: {
          isLoading: true
        }
      }
    case GET_ALL_ROLES_SUCCESS:
      return {
        ...state,
        allRoles: {
          isLoading: false,
          data: action.payload.roleDTOs,
          searchData: [{ id: 0, name: "Tất cả" }, ...action.payload.roleDTOs],
        }
      }
    case GET_ALL_ROLES_FAILURE:
      return {
        ...state,
        allRoles: {
          isLoading: false,
          data: []
        }
      }

    default:
      return state;
  }
}

export default RoleReducer;





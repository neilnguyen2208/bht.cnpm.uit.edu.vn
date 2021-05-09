import {
  get_AllRolesSuccess,
  get_AllRolesRequest,
  // get_AllRolesFailure
} from "redux/actions/roleAction.js";

// import { request } from 'utils/requestUtils';
const data = [
  {
    id: 1,
    name: "Admin"
  },
  {
    id: 2,
    name: "User"
  },
  {
    id: 3,
    name: "Collaborator"
  }
]
export function getAllRoles() {
  return dispatch => {
    dispatch(get_AllRolesRequest());
    // request.get('/documents/roles')
    //   .then(response => {
    //     dispatch(get_AllRolesSuccess(response.data))
    //   })
    //   .catch(error => dispatch(get_AllRolesFailure(error)))

    dispatch(get_AllRolesSuccess({ roleDTOs: data }));

  }
}

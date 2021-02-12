import {
  // LOGIN,
  // REGISTER,
  // LOGOUT,

} from '../constants.js'

const allUsers = [

]

const initialState = {

}

function UserReducer(state = initialState, action) {
  switch (action.type) {
    // case LOGIN:
    //   return {
    //     ...state,
    //   }
    // case REGISTER:
    //   return { ...state, }

    // case LOGOUT:
    //   return { ...state, }

    default:
      return state;
  }
}

export default UserReducer;





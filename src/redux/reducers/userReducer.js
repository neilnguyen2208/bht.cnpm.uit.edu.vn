// import {
//     USER_POST_LOGIN,
//     USER_POST_REGISTER,
//     USER_GET_CURRENT_USER,
//     USER_GET_LOGOUT,
//     GET_ALL_USERS,
//     GET_ALL_ROLES
// } from '../constants.js'

// const allUsers = [

// ]

// const allRoles =
//     [
//         {
//             "UserGroupID": 1,
//             "UserGroupName": "ADMIN"
//         },
//         {
//             "UserGroupID": 2,
//             "UserGroupName": "COLLABORATOR"
//         },
//         {
//             "UserGroupID": 3,
//             "UserGroupName": "USER"
//         }
//     ]

// const initialState = {
//     account: null,
//     statusLoginCode: 0,
//     statusLogoutCode: 0,
//     statusRegisterCode: 0,
//     allUsers: allUsers,
//     allRoles: allRoles
// }

// function UserReducer(state = initialState, action) {
//     switch (action.type) {
//         case USER_POST_LOGIN:
//             if (action.payload.account === null) {
//                 return {
//                     ...state,
//                     statusLoginCode: action.payload.statusLoginCode
//                 }
//             } else {
//                 return {
//                     ...state,
//                     account: action.payload.account,
//                     statusLoginCode: action.payload.statusLoginCode,
//                 }
//             }
//         case USER_POST_REGISTER:
//             return {
//                 ...state,
//                 statusRegisterCode: action.payload.statusRegisterCode,
//             }
//         case USER_GET_CURRENT_USER:
//             if (action.payload.account === null || typeof action.payload.account === 'undefined') {
//                 return {
//                     ...state,
//                     account: null,
//                     statusLoginCode: action.payload.statusGetCurrentCode,
//                 }
//             } else {
//                 return {
//                     ...state,
//                     account: action.payload.account,
//                     statusLoginCode: action.payload.statusGetCurrentCode,
//                 }
//             }
//         case USER_GET_LOGOUT:
//             return {
//                 ...state,
//                 statusLogoutCode: action.payload.statusLogoutCode,
//             };
//         case GET_ALL_USERS:
//             return { ...state, allUsers: action.payload }
//         case GET_ALL_ROLES:
//             return { ...state, allRoles: action.payload }
//         default:
//             {
//                 return state;
//                 // return initialState;
//             }

//     }
// }

// export default UserReducer;





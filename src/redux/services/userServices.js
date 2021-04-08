import {
  get_AllUsersSuccess,
  get_AllUsersRequest,
  get_AllUsersFailure
} from "redux/actions/userAction.js";

import { request } from 'utils/requestUtils';

const data = [
  {
    id: 1,
    avatarURL: "https://i.imgur.com/SZJgL6C.png",
    displayName: "Nguyễn Văn Đông",
    email: "dongnsince1999@gmail.com",
    score: 230,
    docCount: 2,
    postCount: 3,
    role: {
      name: "User", id: 2,
    }
  },
  {
    id: 1,
    avatarURL: "https://i.imgur.com/SZJgL6C.png",
    displayName: "Lưu Biêu Nghị",
    email: "vegknight@gmail.com",
    score: 260,
    docCount: 2,
    postCount: 6,
    role: {
      name: "Admin", id: 2,
    }
  }
]

export function getAllUsers() {
  return dispatch => {
    dispatch(get_AllUsersRequest());
    // request.get('/documents/users')
    //   .then(response => {
    dispatch(get_AllUsersSuccess({ userDTOs: data, totalPages: 1, totalElements: 2 }))
    //     })
    //     .catch(error => dispatch(get_AllUsersFailure(error)))
  }
}

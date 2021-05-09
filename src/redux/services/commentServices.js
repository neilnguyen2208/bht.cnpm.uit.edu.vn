
import {
  get_APostCommentsSuccess
} from "redux/actions/commentAction.js";


export function getAPostComments(postID) {
  return dispatch => {
    dispatch(get_APostCommentsSuccess())

    // request.get(`/posts/getComments?postID=${postID}`)
    //     .then(response => {
    //     })
    //     .catch(error => {
    //     })
  }
}


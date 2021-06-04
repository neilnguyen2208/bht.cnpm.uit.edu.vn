
import {
  get_APostCommentFailure,
  get_APostCommentsRequest,
  get_APostCommentsSuccess,

  create_APostCommentReset,
  create_APostCommentSuccess,
  create_APostCommentFailure,
  post_LikeAPostCommentRequest,
  post_LikeAPostCommentSuccess,
  post_LikeAPostCommentFailure,
  delete_UnLikeAPostCommentRequest,
  delete_UnLikeAPostCommentSuccess,
  delete_UnLikeAPostCommentFailure,

} from "redux/actions/commentAction.js";
import { request } from "utils/requestUtils";

export function getAPostComments(postId, page) {
  return dispatch => {
    dispatch(get_APostCommentsRequest());
    request.get(`/posts/${postId}/comments?page=${page}`)
      .then(response_1 => {
        let result_1 = response_1.data;
        let IDarr = '';
        result_1.postCommentDTOs.map(item => IDarr += item.id + ",") //tao ra mang id moi
        request.get(`/posts/comments/statistics?commentIDs=${IDarr}`)
          .then(result_2 => {
            console.log(result_2);
            //merge summary array and statistic array
            let finalResult = [];

            for (let i = 0; i < result_1.postCommentDTOs.length; i++) {
              finalResult.push({
                ...result_1.postCommentDTOs[i],
                ...(result_2.data.find((itmInner) => itmInner.id === result_1.postCommentDTOs[i].id)),
              }
              );
              //delete redundant key - value  
            }
            dispatch(get_APostCommentsSuccess({ postCommentDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
          }).catch((error) => get_APostCommentFailure(error))
      })
      .catch(error => {
        dispatch(get_APostCommentFailure(error)); //
      })

  }
}

export function editAPostComments(commentId) {
  return dispatch => {
    dispatch(get_APostCommentsRequest());
    request.put(`/posts/comments/${commentId}`)
      .then(response => {
        console.log(response)
        dispatch(get_APostCommentsSuccess(response));

      })
      .catch(error => {
        dispatch(get_APostCommentFailure(error)); //
      })
  }
}

//if parentId !== null => create reply, else => create comment 
export function createAPostComment(postId, content) {
  return dispatch => {
    dispatch(create_APostCommentReset());
    request.post(`/posts/` + postId + `/comments`, JSON.stringify(content))
      .then(response => {
        dispatch(create_APostCommentSuccess(response));
      })
      .catch(error => {
        dispatch(create_APostCommentFailure(error)); //
      })
  }
}

export function likeAPostComment(commentId) { //maybe use modal later
  return dispatch => {
    dispatch(post_LikeAPostCommentRequest(commentId))
    request.post(`/posts/${commentId}/likeStatus`)
      .then(response => {
        // response.data khong co data gi nen thoi, 
        //do can cap nhat cac state khac nhau o cac trang khac nhau nen can them mot bien type
        dispatch(post_LikeAPostCommentSuccess(commentId));
      }
      ).catch(() => dispatch(post_LikeAPostCommentFailure()))
  }
}

export function unLikeAPostComment(commentId) { //maybe use modal later
  return dispatch => {
    dispatch(delete_UnLikeAPostCommentRequest())
    request.delete(`/posts/${commentId}/likeStatus`)
      .then(response => {
        dispatch(delete_UnLikeAPostCommentSuccess(response.data));
      }
      ).catch(() => dispatch(delete_UnLikeAPostCommentFailure()))
  }
}


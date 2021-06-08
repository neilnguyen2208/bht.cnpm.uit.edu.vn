
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

  delete_APostCommentReset,
  delete_APostCommentSuccess,
  delete_APostCommentFailure,
  put_EditAPostCommentReset,
  put_EditAPostCommentSuccess,
  put_EditAPostCommentFailure,
  get_CommentReportReasonsSuccess,
  get_CommentReportReasonsFailure,
  get_CommentReportReasonsRequest,
  post_ReportAPostCommentReset,
  post_ReportAPostCommentSuccess,
  post_ReportAPostCommentFailure

} from "redux/actions/commentAction.js";
import { request } from "utils/requestUtils";
import { openBLModal } from "./modalServices";

export function getAPostComments(postId, page) {
  return dispatch => {
    dispatch(get_APostCommentsRequest());
    request.get(`/posts/${postId}/comments?page=${page}&sort=submitDtm,desc`)
      .then(response_1 => {
        let result_1 = response_1.data;
        let IDarr = '';
        result_1.postCommentDTOs.map(item => IDarr += item.id + ",") //tao ra mang id moi
        request.get(`/posts/comments/statistics?commentIDs=${IDarr}`)
          .then(result_2 => {
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

export function editAPostComment(commentId, data) {
  return dispatch => {
    dispatch(put_EditAPostCommentReset());
    request.put(`/posts/comments/${commentId}`, JSON.stringify(data))
      .then(response => {
        dispatch(put_EditAPostCommentSuccess(response.data.id));
      })
      .catch(error => {
        dispatch(put_EditAPostCommentFailure(error)); //
      })
  }
}

export function getCommentReportReasons() {
  return dispatch => {
    dispatch(get_CommentReportReasonsRequest())
    request.get(`/posts/comments/report`).then(response =>
      dispatch(get_CommentReportReasonsSuccess(response.data))
    ).catch(error => { dispatch(get_CommentReportReasonsFailure()) })
  }
}

export function reportAPostComment(id, reason) { //
  return dispatch => {
    dispatch(post_ReportAPostCommentReset())
    request.post(`/posts/comments/${id}/report`, JSON.stringify(reason))
      .then(response => {
        dispatch(post_ReportAPostCommentSuccess());
      }
      ).catch(() => dispatch(post_ReportAPostCommentFailure()))
  }
}

export function createAPostComment(postId, content) {
  return dispatch => {
    dispatch(create_APostCommentReset());
    request.post(`/posts/` + postId + `/comments`, JSON.stringify(content))
      .then(response => {
        dispatch(create_APostCommentSuccess(response.data.id));
      })
      .catch(error => {
        dispatch(create_APostCommentFailure(error)); //
      })
  }
}

export function likeAPostComment(commentId) { //maybe use modal later
  return dispatch => {
    dispatch(post_LikeAPostCommentRequest(commentId))
    request.post(`/posts/comments/${commentId}/likeStatus`)
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
    request.delete(`/posts/comments/${commentId}/likeStatus`)
      .then(response => {
        dispatch(delete_UnLikeAPostCommentSuccess(response.data));
      }
      ).catch(() => dispatch(delete_UnLikeAPostCommentFailure()))
  }
}

//chua co API cho viec xoa bai post
export function deleteAPostComment(commentId) { //maybe use modal later
  return dispatch => {
    dispatch(delete_APostCommentReset(commentId))
    request.delete(`/posts/comments/${commentId}`).then(response => {
      dispatch(delete_APostCommentSuccess())
      openBLModal({ text: "Xoá bình luận thành công!", type: "success" });
    }).catch(error => { dispatch(delete_APostCommentFailure(commentId)) })
  }
}

export function createReply(prCommentId, content) {
  return dispatch => {
    dispatch(create_APostCommentReset());
    request.post(`/posts/comments/${prCommentId}`, JSON.stringify(content))
      .then(response => {
        dispatch(create_APostCommentSuccess(response.data.id));
      })
      .catch(error => {
        dispatch(create_APostCommentFailure(error)); //
      })
  }
}
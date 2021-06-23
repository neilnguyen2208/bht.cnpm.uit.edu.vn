
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
  post_ReportAPostCommentFailure,
  post_ResolveAPostCommentReset,
  post_ResolveAPostCommentSuccess,
  post_ResolveAPostCommentFailure,
  get_ReportedPostCommentsRequest,
  get_ReportedPostCommentsSuccess,
  get_ReportedPostCommentsFailure

} from "redux/actions/postCommentAction.js";
import { authRequest, request } from "utils/requestUtils";
import { generateSearchParam } from "utils/urlUtils";
import { openBLModal } from "./modalServices";

export function getAPostComments(postId, page) {
  return dispatch => {
    dispatch(get_APostCommentsRequest());
    authRequest.get(`/posts/${postId}/comments?page=${page}&sort=submitDtm,desc`)
      .then(response_1 => {
        let result_1 = response_1.data;
        let IDarr = '';
        result_1.postCommentDTOs.map(item => IDarr += item.id + ",") //tao ra mang id moi
        authRequest.get(`/posts/comments/statistics?commentIDs=${IDarr}`)
          .then(response_2 => {
            //merge summary array and statistic array
            let result_2 = [];

            for (let i = 0; i < result_1.postCommentDTOs.length; i++) {
              result_2.push({
                ...result_1.postCommentDTOs[i],
                ...(response_2.data.find((itmInner) => itmInner.id === result_1.postCommentDTOs[i].id)),
              });
            }
            let actionIDarr = IDarr.length > 1 ? IDarr.substring(0, IDarr.length - 1) : IDarr;

            authRequest.get(`/posts/comments/actionAvailable?postCommentIDs=${actionIDarr}`).then(response_3 => {
              let finalResult = [];
              for (let i = 0; i < result_2.length; i++) {
                finalResult.push({
                  ...result_2[i],
                  ...(response_3.data.find((itmInner) => itmInner.id === result_2[i].id)),
                });
              }
              dispatch(get_APostCommentsSuccess({ postCommentDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
            }).catch((error) => get_APostCommentFailure(error))
          }).catch((error) => get_APostCommentFailure(error))
      }).catch(error => {
        dispatch(get_APostCommentFailure(error)); //
      })
  }
}

export function editAPostComment(commentId, data) {
  return dispatch => {
    dispatch(put_EditAPostCommentReset());
    authRequest.put(`/posts/comments/${commentId}`, JSON.stringify(data))
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
    authRequest.get(`/posts/comments/report`).then(response =>
      dispatch(get_CommentReportReasonsSuccess(response.data))
    ).catch(error => { dispatch(get_CommentReportReasonsFailure()) })
  }
}

export function reportAPostComment(id, reason) { //
  return dispatch => {
    dispatch(post_ReportAPostCommentReset())
    authRequest.post(`/posts/comments/${id}/report`, JSON.stringify(reason))
      .then(response => {
        dispatch(post_ReportAPostCommentSuccess());
      }
      ).catch(() => dispatch(post_ReportAPostCommentFailure()))
  }
}

export function createAPostComment(postId, content) {
  return dispatch => {
    dispatch(create_APostCommentReset());
    authRequest.post(`/posts/` + postId + `/comments`, JSON.stringify(content))
      .then(response => {
        dispatch(create_APostCommentSuccess(response.data.id));
      })
      .catch(error => {
        dispatch(create_APostCommentFailure(error)); //
      })
  }
}

export function resolveAPost(id, resolveDTO) {
  return dispatch => {
    dispatch(post_ResolveAPostCommentReset());
    authRequest.post(`/posts/comments/  resolveReport/${id}`, JSON.stringify(resolveDTO))
      .then(result => {
        dispatch(post_ResolveAPostCommentSuccess());
      })
      .catch(error => post_ResolveAPostCommentFailure())
  }
}

export function likeAPostComment(commentId) { //maybe use modal later
  return dispatch => {
    dispatch(post_LikeAPostCommentRequest(commentId))
    authRequest.post(`/posts/comments/${commentId}/likeStatus`)
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
    authRequest.delete(`/posts/comments/${commentId}/likeStatus`)
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
    authRequest.delete(`/posts/comments/${commentId}`).then(response => {
      dispatch(delete_APostCommentSuccess())
      openBLModal({ text: "Xoá bình luận thành công!", type: "success" });
    }).catch(error => { dispatch(delete_APostCommentFailure(commentId)) })
  }
}

export function createReply(prCommentId, content) {
  return dispatch => {
    dispatch(create_APostCommentReset());
    authRequest.post(`/posts/comments/${prCommentId}`, JSON.stringify(content))
      .then(response => {
        dispatch(create_APostCommentSuccess(response.data.id));
      })
      .catch(error => {
        dispatch(create_APostCommentFailure(error)); //
      })
  }
}

export function getReportedPostComments(searchParamObject) {
  return dispatch => {
    dispatch(get_ReportedPostCommentsRequest());
    authRequest.get(`/posts/comments/report?${generateSearchParam(searchParamObject)}`)
      .then(response => {
        let result_1 = response.data;
        dispatch(get_ReportedPostCommentsSuccess({ postReportedCommentWithStateDTOs: response.data.postCommentReportDTOs, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
      })
      .catch(error => { get_ReportedPostCommentsFailure(error) })
  }
}

export function resolveAPostComment(id, resolveDTO) {
  return dispatch => {
    dispatch(post_ResolveAPostCommentReset());
    authRequest.post(`/posts/comments/resolveReport/${id}`, JSON.stringify(resolveDTO))
      .then(result => {
        dispatch(post_ResolveAPostCommentSuccess());
      })
      .catch(error => post_ResolveAPostCommentFailure())
  }
}

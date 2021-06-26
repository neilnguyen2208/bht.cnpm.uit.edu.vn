
import {
  get_AnExerciseCommentFailure,
  get_AnExerciseCommentsRequest,
  get_AnExerciseCommentsSuccess,

  create_AnExerciseCommentReset,
  create_AnExerciseCommentSuccess,
  create_AnExerciseCommentFailure,
  post_LikeAnExerciseCommentRequest,
  post_LikeAnExerciseCommentSuccess,
  post_LikeAnExerciseCommentFailure,
  delete_UnLikeAnExerciseCommentRequest,
  delete_UnLikeAnExerciseCommentSuccess,
  delete_UnLikeAnExerciseCommentFailure,

  delete_AnExerciseCommentReset,
  delete_AnExerciseCommentSuccess,
  delete_AnExerciseCommentFailure,
  put_EditAnExerciseCommentReset,
  put_EditAnExerciseCommentSuccess,
  put_EditAnExerciseCommentFailure,
  get_CommentReportReasonsSuccess,
  get_CommentReportReasonsFailure,
  get_CommentReportReasonsRequest,
  post_ReportAnExerciseCommentReset,
  post_ReportAnExerciseCommentSuccess,
  post_ReportAnExerciseCommentFailure,
  post_ResolveAnExerciseCommentReset,
  post_ResolveAnExerciseCommentSuccess,
  post_ResolveAnExerciseCommentFailure,
  get_ReportedExerciseCommentsRequest,
  get_ReportedExerciseCommentsSuccess,
  get_ReportedExerciseCommentsFailure

} from "redux/actions/exerciseCommentAction.js";
import { authRequest } from "utils/requestUtils";
import { generateSearchParam } from "utils/urlUtils";
import { openBLModal } from "./modalServices";

export function getAnExerciseComments(exerciseId, page) {
  return dispatch => {
    dispatch(get_AnExerciseCommentsRequest());
    authRequest.get(`/posts/${exerciseId}/comments?page=${page}&sort=submitDtm,desc`)
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
              dispatch(get_AnExerciseCommentsSuccess({ postCommentDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
            }).catch((error) => get_AnExerciseCommentFailure(error))
          }).catch((error) => get_AnExerciseCommentFailure(error))
      }).catch(error => {
        dispatch(get_AnExerciseCommentFailure(error)); //
      })
  }
}

export function editAnExerciseComment(commentId, data) {
  return dispatch => {
    dispatch(put_EditAnExerciseCommentReset());
    authRequest.put(`/posts/comments/${commentId}`, JSON.stringify(data))
      .then(response => {
        dispatch(put_EditAnExerciseCommentSuccess(response.data.id));
      })
      .catch(error => {
        dispatch(put_EditAnExerciseCommentFailure(error)); //
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

export function reportAnExerciseComment(id, reason) { //
  return dispatch => {
    dispatch(post_ReportAnExerciseCommentReset())
    authRequest.post(`/posts/comments/${id}/report`, JSON.stringify(reason))
      .then(response => {
        dispatch(post_ReportAnExerciseCommentSuccess());
      })
      .catch(() => dispatch(post_ReportAnExerciseCommentFailure()))
  }
}

export function createAnExerciseComment(exerciseId, content) {
  return dispatch => {
    dispatch(create_AnExerciseCommentReset());
    authRequest.post(`/posts/` + exerciseId + `/comments`, JSON.stringify(content))
      .then(response => {
        dispatch(create_AnExerciseCommentSuccess(response.data.id));
      })
      .catch(error => {
        dispatch(create_AnExerciseCommentFailure(error)); //
      })
  }
}

export function likeAnExerciseComment(commentId) { //maybe use modal later
  return dispatch => {
    dispatch(post_LikeAnExerciseCommentRequest(commentId))
    authRequest.post(`/posts/comments/${commentId}/likeStatus`)
      .then(response => {
        // response.data khong co data gi nen thoi, 
        //do can cap nhat cac state khac nhau o cac trang khac nhau nen can them mot bien type
        dispatch(post_LikeAnExerciseCommentSuccess(commentId));
      }
      ).catch(() => dispatch(post_LikeAnExerciseCommentFailure()))
  }
}

export function unLikeAnExerciseComment(commentId) { //maybe use modal later
  return dispatch => {
    dispatch(delete_UnLikeAnExerciseCommentRequest())
    authRequest.delete(`/posts/comments/${commentId}/likeStatus`)
      .then(response => {
        dispatch(delete_UnLikeAnExerciseCommentSuccess(response.data));
      }
      ).catch(() => dispatch(delete_UnLikeAnExerciseCommentFailure()))
  }
}

//chua co API cho viec xoa bai post
export function deleteAnExerciseComment(commentId) { //maybe use modal later
  return dispatch => {
    dispatch(delete_AnExerciseCommentReset(commentId))
    authRequest.delete(`/posts/comments/${commentId}`).then(response => {
      dispatch(delete_AnExerciseCommentSuccess())
      openBLModal({ text: "Xoá bình luận thành công!", type: "success" });
    }).catch(error => { dispatch(delete_AnExerciseCommentFailure(commentId)) })
  }
}

export function createReply(prCommentId, content) {
  return dispatch => {
    dispatch(create_AnExerciseCommentReset());
    authRequest.post(`/posts/comments/${prCommentId}`, JSON.stringify(content))
      .then(response => {
        dispatch(create_AnExerciseCommentSuccess(response.data.id));
      })
      .catch(error => {
        dispatch(create_AnExerciseCommentFailure(error)); //
      })
  }
}

export function getReportedExerciseComments(searchParamObject) {
  return dispatch => {
    dispatch(get_ReportedExerciseCommentsRequest());
    authRequest.get(`/posts/comments/report?${generateSearchParam(searchParamObject)}`)
      .then(response => {
        let result_1 = response.data;
        dispatch(get_ReportedExerciseCommentsSuccess({ postReportedCommentWithStateDTOs: response.data.postCommentReportDTOs, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
      })
      .catch(error => { get_ReportedExerciseCommentsFailure(error) })
  }
}

export function resolveAnExerciseComment(id, resolveDTO) {
  return dispatch => {
    dispatch(post_ResolveAnExerciseCommentReset());
    authRequest.post(`/posts/comments/resolveReport/${id}`, JSON.stringify(resolveDTO))
      .then(result => {
        dispatch(post_ResolveAnExerciseCommentSuccess());
      })
      .catch(error => post_ResolveAnExerciseCommentFailure())
  }
}

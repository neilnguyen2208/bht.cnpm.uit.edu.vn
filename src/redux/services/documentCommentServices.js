
import {
  get_ADocumentCommentFailure,
  get_ADocumentCommentsRequest,
  get_ADocumentCommentsSuccess,

  create_ADocumentCommentReset,
  create_ADocumentCommentSuccess,
  create_ADocumentCommentFailure,
  post_LikeADocumentCommentRequest,
  post_LikeADocumentCommentSuccess,
  post_LikeADocumentCommentFailure,
  delete_UnLikeADocumentCommentRequest,
  delete_UnLikeADocumentCommentSuccess,
  delete_UnLikeADocumentCommentFailure,

  delete_ADocumentCommentReset,
  delete_ADocumentCommentSuccess,
  delete_ADocumentCommentFailure,
  put_EditADocumentCommentReset,
  put_EditADocumentCommentSuccess,
  put_EditADocumentCommentFailure,
  get_CommentReportReasonsSuccess,
  get_CommentReportReasonsFailure,
  get_CommentReportReasonsRequest,
  post_ReportADocumentCommentReset,
  post_ReportADocumentCommentSuccess,
  post_ReportADocumentCommentFailure,
  post_ResolveADocumentCommentReset,
  post_ResolveADocumentCommentSuccess,
  post_ResolveADocumentCommentFailure,
  get_ReportedDocumentCommentsRequest,
  get_ReportedDocumentCommentsSuccess,
  get_ReportedDocumentCommentsFailure

} from "redux/actions/documentCommentAction.js";
import { authRequest } from "utils/requestUtils";
import { generateSearchParam } from "utils/urlUtils";
import { openBLModal } from "./modalServices";

export function getADocumentComments(documentID, page) {
  return dispatch => {
    dispatch(get_ADocumentCommentsRequest());
    authRequest.get(`/documents/${documentID}/comments?page=${page}&sort=submitDtm,desc`)
      .then(response_1 => {
        let result_1 = response_1.data;
        let IDarr = '';
        result_1.docCommentDTOs.map(item => IDarr += item.id + ",") //tao ra mang id moi
        authRequest.get(`/documents/comments/statistics?commentIDs=${IDarr}`)
          .then(response_2 => {
            //merge summary array and statistic array
            let result_2 = [];

            for (let i = 0; i < result_1.docCommentDTOs.length; i++) {
              result_2.push({
                ...result_1.docCommentDTOs[i],
                ...(response_2.data.find((itmInner) => itmInner.id === result_1.docCommentDTOs[i].id)),
              });
            }
            let actionIDarr = IDarr.length > 1 ? IDarr.substring(0, IDarr.length - 1) : IDarr;

            authRequest.get(`/documents/comments/actionAvailable?docCommentIDs=${actionIDarr}`).then(response_3 => {
              let finalResult = [];
              for (let i = 0; i < result_2.length; i++) {
                finalResult.push({
                  ...result_2[i],
                  ...(response_3.data.find((itmInner) => itmInner.id === result_2[i].id)),
                });
              }
              dispatch(get_ADocumentCommentsSuccess({ documentCommentDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
            }).catch((error) => get_ADocumentCommentFailure(error))
          }).catch((error) => get_ADocumentCommentFailure(error))
      }).catch(error => {
        dispatch(get_ADocumentCommentFailure(error)); //
      })
  }
}

export function editADocumentComment(commentId, data) {
  return dispatch => {
    dispatch(put_EditADocumentCommentReset());
    authRequest.put(`/documents/comments/${commentId}`, JSON.stringify(data))
      .then(response => {
        dispatch(put_EditADocumentCommentSuccess(response.data.id));
      })
      .catch(error => {
        dispatch(put_EditADocumentCommentFailure(error)); //
      })
  }
}

export function getCommentReportReasons() {
  return dispatch => {
    dispatch(get_CommentReportReasonsRequest())
    authRequest.get(`/documents/comments/report`).then(response =>
      dispatch(get_CommentReportReasonsSuccess(response.data))
    ).catch(error => { dispatch(get_CommentReportReasonsFailure()) })
  }
}

export function reportADocumentComment(id, reason) { //
  return dispatch => {
    dispatch(post_ReportADocumentCommentReset())
    authRequest.post(`/documents/comments/${id}/report`, JSON.stringify(reason))
      .then(response => {
        dispatch(post_ReportADocumentCommentSuccess());
      }
      ).catch(() => dispatch(post_ReportADocumentCommentFailure()))
  }
}

export function createADocumentComment(documentID, content) {
  return dispatch => {
    dispatch(create_ADocumentCommentReset());
    authRequest.post(`/documents/` + documentID + `/comments`, JSON.stringify(content))
      .then(response => {
        dispatch(create_ADocumentCommentSuccess(response.data.id));
      })
      .catch(error => {
        dispatch(create_ADocumentCommentFailure(error)); //
      })
  }
}

export function resolveADocument(id, resolveDTO) {
  return dispatch => {
    dispatch(post_ResolveADocumentCommentReset());
    authRequest.post(`/documents/comments/  resolveReport/${id}`, JSON.stringify(resolveDTO))
      .then(result => {
        dispatch(post_ResolveADocumentCommentSuccess());
      })
      .catch(error => post_ResolveADocumentCommentFailure())
  }
}

export function likeADocumentComment(commentId) { //maybe use modal later
  return dispatch => {
    dispatch(post_LikeADocumentCommentRequest(commentId))
    authRequest.post(`/documents/comments/${commentId}/likeStatus`)
      .then(response => {
        // response.data khong co data gi nen thoi, 
        //do can cap nhat cac state khac nhau o cac trang khac nhau nen can them mot bien type
        dispatch(post_LikeADocumentCommentSuccess(commentId));
      }
      ).catch(() => dispatch(post_LikeADocumentCommentFailure()))
  }
}

export function unLikeADocumentComment(commentId) { //maybe use modal later
  return dispatch => {
    dispatch(delete_UnLikeADocumentCommentRequest())
    authRequest.delete(`/documents/comments/${commentId}/likeStatus`)
      .then(response => {
        dispatch(delete_UnLikeADocumentCommentSuccess(response.data));
      }
      ).catch(() => dispatch(delete_UnLikeADocumentCommentFailure()))
  }
}

//chua co API cho viec xoa bai post
export function deleteADocumentComment(commentId) { //maybe use modal later
  return dispatch => {
    dispatch(delete_ADocumentCommentReset(commentId))
    authRequest.delete(`/documents/comments/${commentId}`).then(response => {
      dispatch(delete_ADocumentCommentSuccess())
      openBLModal({ text: "Xoá bình luận thành công!", type: "success" });
    }).catch(error => { dispatch(delete_ADocumentCommentFailure(commentId)) })
  }
}

export function createReply(prCommentId, content) {
  return dispatch => {
    dispatch(create_ADocumentCommentReset());
    authRequest.post(`/documents/comments/${prCommentId}`, JSON.stringify(content))
      .then(response => {
        dispatch(create_ADocumentCommentSuccess(response.data.id));
      })
      .catch(error => {
        dispatch(create_ADocumentCommentFailure(error)); //
      })
  }
}

export function getReportedDocumentComments(searchParamObject) {
  return dispatch => {
    dispatch(get_ReportedDocumentCommentsRequest());
    authRequest.get(`/documents/comments/report?${generateSearchParam(searchParamObject)}`)
      .then(response => {
        let result_1 = response.data;
        dispatch(get_ReportedDocumentCommentsSuccess({ postReportedCommentWithStateDTOs: response.data.documentCommentReportDTOs, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
      })
      .catch(error => { get_ReportedDocumentCommentsFailure(error) })
  }
}

export function resolveADocumentComment(id, resolveDTO) {
  return dispatch => {
    dispatch(post_ResolveADocumentCommentReset());
    authRequest.post(`/documents/comments/resolveReport/${id}`, JSON.stringify(resolveDTO))
      .then(result => {
        dispatch(post_ResolveADocumentCommentSuccess());
      })
      .catch(error => post_ResolveADocumentCommentFailure())
  }
}

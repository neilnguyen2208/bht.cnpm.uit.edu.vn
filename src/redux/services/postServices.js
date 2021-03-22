import {    //highlight posts 

    //my post
    get_MyPostsRequest,
    get_MyPostsSuccess,
    get_MyPostsFailure,

    post_CreateAPostReset,
    post_CreateAPostSuccess,

    get_ReportedPostsRequest,
    get_ReportedPostsSuccess,
    get_ReportedPostsFailure,

    //post search result 
    get_PostSearchResultRequest,
    get_PostSearchResultSuccess,
    get_PostSearchResultFailure,

    get_PostByIDReset,
    get_PostByIDSuccess,
    get_PostByIDFailure,

    post_ApproveAPostReset,
    post_ApproveAPostSuccess,
    post_ApproveAPostFailure,

    post_RejectAPostReset,
    post_RejectAPostSuccess,
    post_RejectAPostFailure,

    post_LikeAPostRequest,
    post_LikeAPostSuccess,
    post_LikeAPostFailure,

    delete_UnLikeAPostRequest,
    delete_UnLikeAPostSuccess,
    delete_UnLikeAPostFailure,

    post_SaveAPostRequest,
    delete_UnSaveAPostRequest,
    post_SaveAPostSuccess,
    post_SaveAPostFailure,
    delete_UnSaveAPostSuccess,
    delete_UnSaveAPostFailure,


    delete_APostReset,
    delete_APostSuccess,
    delete_APostFailure,

    put_EditAPostReset,
    put_EditAPostSuccess,
    put_EditAPostFailure,

    get_PendingPostsRequest,
    get_PendingPostsSuccess,
    get_PendingPostsFailure,

    post_ReportAPostReset,
    post_ReportAPostSuccess,
    post_ReportAPostFailure,


    post_ResolveAPostReset,
    post_ResolveAPostSuccess,
    post_ResolveAPostFailure,
    get_RelativeSameCategoryPostsReset,
    get_RelativeSameCategoryPostsSuccess,
    get_RelativeSameCategoryPostsFailure,
    get_RelativeSameAuthorPostsReset,
    get_RelativeSameAuthorPostsSuccess,
    get_RelativeSameAuthorPostsFailure,
    post_RejectAndFeedbackAPostSuccess,
    post_RejectAndFeedbackAPostReset,
    post_RejectAndFeedbackAPostFailure,

} from "redux/actions/postAction.js";

import { openModal, openBLModal, closeModal } from 'redux/actions/modalAction'

import { request } from 'utils/requestUtils';
import { generateSearchParam } from 'utils/urlUtils'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'

export function createAPost(data) {
    return dispatch => {
        dispatch(post_CreateAPostReset());
        dispatch(openModal("loader", { text: "Đang upload bài viết ..." }));
        request.post('/posts', JSON.stringify(data))
            .then(response => {
                //handle success    
                dispatch(closeModal());
                dispatch(openBLModal({ text: "Tạo bài viết thành công!", icon: done_icon }));
                dispatch(post_CreateAPostSuccess());
            })
            .catch(error => {
                dispatch(post_CreateAPostReset())
            })
    }
}

// my post
export function getMyPosts(searchParamObject) { //this API to get all approved document of a specific user.
    return dispatch => {
        dispatch(get_MyPostsRequest());
        request.get(`/posts/myPosts?${generateSearchParam(searchParamObject)}`).then(
            response => {
                let result_1 = response.data;
                let IDarr = '';
                response.data.dtos.map(item => IDarr += item.id + ",") //tao ra mang id moi
                request.get(`/posts/statistic?postIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];

                        for (let i = 0; i < result_1.dtos.length; i++) {
                            finalResult.push({
                                ...result_1.dtos[i],
                                ...(result.data.find((itmInner) => itmInner.id === result_1.dtos[i].id)),
                            }
                            );
                            //delete redundant key - value  
                        }
                        dispatch(get_MyPostsSuccess({ postSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_MyPostsFailure())
            }
        ).catch(() => dispatch(get_MyPostsFailure()))
    }
}

export function getPendingPosts(searchParamObject) {
    return dispatch => {
        dispatch(get_PendingPostsRequest());
        request.get(`/posts/pendingApproval?${generateSearchParam(searchParamObject)}`)
            .then(result => dispatch(get_PendingPostsSuccess(result.data)))
            .catch(error => { get_PendingPostsFailure(error) })
    }
}

export function getReportedPosts(searchParamObject) {
    return dispatch => {
        dispatch(get_ReportedPostsRequest());
        request.get(`/post/report?${generateSearchParam(searchParamObject)}`)
            .then(response => {
                let result_1 = response.data;
                let IDarr = '';
                response.data.userPostReportDTOs.map(item => IDarr += item.id + ",") //tao ra mang id moi

                request.get(`/posts/statistic?postIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];

                        for (let i = 0; i < result_1.userPostReportDTOs.length; i++) {
                            finalResult.push({
                                ...result_1.userPostReportDTOs[i],
                                ...(result.data.find((itmInner) => itmInner.id === result_1.userPostReportDTOs[i].postID)),
                            }
                            );
                        }
                        dispatch(get_ReportedPostsSuccess({ postSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_ReportedPostsFailure())


            }

            )
            .catch(error => { get_ReportedPostsFailure(error) })
    }
}

export function resolveAPost(id, resolveDTO) {
    return dispatch => {
        dispatch(post_ResolveAPostReset());
        request.post(`/post/resolveReport/${id}`, JSON.stringify(resolveDTO))
            .then(result => {
                dispatch(post_ResolveAPostSuccess());
            })
            .catch(error => post_ResolveAPostFailure())
    }
}

//posts search result
export function getPostSearch(searchParamObject) {
    return dispatch => {

        dispatch(get_PostSearchResultRequest());
        request.get(`/posts/searchFilter?${generateSearchParam(searchParamObject)}`)
            .then(response => {

                let result_1 = response.data;
                let IDarr = '';
                response.data.postSummaryDTOs.map(item => IDarr += item.id + ",") //tao ra mang id moi

                request.get(`/posts/statistic?postIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];

                        for (let i = 0; i < result_1.postSummaryDTOs.length; i++) {
                            finalResult.push({
                                ...result_1.postSummaryDTOs[i],
                                ...(result.data.find((itmInner) => itmInner.id === result_1.postSummaryDTOs[i].id)),
                            }
                            );
                        }
                        dispatch(get_PostSearchResultSuccess({ postSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_PostSearchResultFailure())


            })
            .catch(error => dispatch(get_PostSearchResultFailure(error)))
    }
}

export function approveAPost(id) {
    return dispatch => {
        dispatch(post_ApproveAPostReset());
        request.post(`/posts/${id}/approval`)
            .then(result => {
                dispatch(post_ApproveAPostSuccess());
            })
            .catch(error => post_ApproveAPostFailure())
    }
}

export function rejectAPost(id) {
    return dispatch => {
        dispatch(post_RejectAPostReset());
        request.post(`/posts/${id}/rejection`)
            .then(result => {
                dispatch(post_RejectAPostSuccess());
            })
            .catch(error => post_RejectAPostFailure())
    }
}

export function getPostByID(id) {
    return dispatch => {
        dispatch(get_PostByIDReset())
        request.get(`/posts/${id}`)
            .then(response => {
                let _response = response; //response without statistic


                dispatch(getSameAuthorPosts(_response.data.id, _response.data.authorID));
                dispatch(getSameCategoryPosts(_response.data.id, _response.data.categoryID));

                request.get(`/posts/statistic?postIDs=${_response.data.id}`)
                    .then(response => {
                        dispatch(get_PostByIDSuccess({ ..._response.data, ...response.data[0] }))
                    })
            }
            )
            .catch(error => { dispatch(get_PostByIDFailure(error)) })
    }
}

export function likeAPost(id) { //maybe use modal later
    return dispatch => {
        dispatch(post_LikeAPostRequest(id))
        request.post(`/posts/${id}/likeStatus`)
            .then(response => {
                // response.data khong co data gi nen thoi, 
                //do can cap nhat cac state khac nhau o cac trang khac nhau nen can them mot bien type
                dispatch(post_LikeAPostSuccess(id));
            }
            ).catch(() => dispatch(post_LikeAPostFailure()))
    }
}

export function unLikeAPost(id) { //maybe use modal later
    return dispatch => {
        dispatch(delete_UnLikeAPostRequest())
        request.delete(`/posts/${id}/likeStatus`)
            .then(response => {
                dispatch(delete_UnLikeAPostSuccess(response.data));
            }
            ).catch(() => dispatch(delete_UnLikeAPostFailure()))
    }
}

export function saveAPost(id) { //maybe use modal later
    return dispatch => {
        dispatch(post_SaveAPostRequest(id))
        request.post(`/posts/${id}/savedStatus`)
            .then(response => {
                dispatch(post_SaveAPostSuccess(id));
            }
            ).catch(() => dispatch(post_SaveAPostFailure()))
    }
}

export function unSaveAPost(id) { //maybe use modal later
    return dispatch => {
        dispatch(delete_UnSaveAPostRequest(id))
        request.delete(`/posts/${id}/savedStatus`)
            .then(response => {
                dispatch(delete_UnSaveAPostSuccess(id));
            }
            ).catch(() => dispatch(delete_UnSaveAPostFailure(id)))
    }
}

//chua co API cho viec xoa bai post
export function deleteAPost(id) { //maybe use modal later
    return dispatch => {
        dispatch(delete_APostReset(id))
        request.delete(`/posts/${id}`).then(response => {
            dispatch(delete_APostSuccess())
            dispatch(openBLModal({ text: "Xoá bài viết thành công!", icon: done_icon }))

        }).catch(error => { dispatch(delete_APostFailure(id)) })
    }
}

export function editAPost(id, newPostContent, reloadList) { //
    return dispatch => {
        dispatch(put_EditAPostReset())
        dispatch(openModal("loader", { text: "Đang xử lý" }))
        request.put(`/posts/${id}`, JSON.stringify(newPostContent))
            .then(response => {
                dispatch(closeModal());
                dispatch(openBLModal({ text: "Chỉnh sửa bài viết thành công!", icon: done_icon }));
                dispatch(put_EditAPostSuccess(id, newPostContent));
            }
            ).catch(() => dispatch(put_EditAPostFailure()))
    }
}

export function reportAPost(id, reason) { //
    return dispatch => {
        dispatch(post_ReportAPostReset())
        request.post(`/post/${id}/report`, JSON.stringify(reason))
            .then(response => {
                dispatch(post_ReportAPostSuccess());
            }
            ).catch(() => dispatch(post_ReportAPostFailure()))
    }
}

export function rejectAndFeedbackAPost(id, reason) { //
    return dispatch => {
        dispatch(closeModal());
        dispatch(openModal("loader", { text: "Đang xử lý" }))
        dispatch(post_RejectAndFeedbackAPostReset());
        request.post(`/posts/${id}/rejectionWithFeedback`, JSON.stringify(reason))
            .then(response => {
                dispatch(closeModal());
                dispatch(post_RejectAndFeedbackAPostSuccess());
                dispatch(closeModal());
                dispatch(openBLModal({ text: "Từ chối bài viết thành công!", icon: done_icon }));

            }
            ).catch(() => {
                dispatch(post_RejectAndFeedbackAPostFailure())
            }
            )
    }
}

export function getSameCategoryPosts(postID, categoryID) {
    return dispatch => {
        dispatch(get_RelativeSameCategoryPostsReset())

        request.get(`/posts/relatedSameCategory?postID=${postID}&categoryID=${categoryID}`)
            .then(response => {
                dispatch(get_RelativeSameCategoryPostsSuccess(response.data))
            })
            .catch(error => { dispatch(get_RelativeSameCategoryPostsFailure(error)) })
    }
}

export function getSameAuthorPosts(postID, authorID) {
    return dispatch => {
        dispatch(get_RelativeSameAuthorPostsReset())
        request.get(`/posts/relatedSameAuthor?postID=${postID}&authorID=${authorID}`)
            .then(response => {
                dispatch(get_RelativeSameAuthorPostsSuccess(response.data))
            })
            .catch(error => { dispatch(get_RelativeSameAuthorPostsFailure(error)) })
    }
}





import {    //highlight posts 

    //my post
    get_MyPostsRequest,
    get_MyPostsSuccess,
    get_MyPostsFailure,

    //posts list 
    get_PostsListRequest,
    get_PostsListSuccess,
    get_PostsListFailure,

    //post search result 
    get_PostSearchResultRequest,
    get_PostSearchResultSuccess,
    get_PostSearchResultFailure,

    get_PostByIDRequest,
    get_PostByIDSuccess,
    get_PostByIDFailure,

    post_ApproveAPostReset,
    post_ApproveAPostSuccess,
    post_ApproveAPostFailure,

    delete_RejectAPostReset,
    delete_RejectAPostSuccess,
    delete_RejectAPostFailure,

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


    delete_APostRequest,
    delete_APostSuccess,
    delete_APostFailure,

    put_EditAPostRequest,
    put_EditAPostSuccess,
    put_EditAPostFailure,

    get_PendingPostsRequest,
    get_PendingPostsSuccess,
    get_PendingPostsFailure

} from "redux/actions/postAction.js";

import { openModal, openBLModal, closeModal } from 'redux/actions/modalAction'

import { request } from 'utils/requestUtils';
import { generateSearchTerm, getSearchParamByName } from 'utils/urlUtils'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'

export function createAPost(data) {
    return dispatch => {
        //th nay se handle bang loader modal ben ngoai luon.
        // dispatch(openModal("loader", { text: "Đang upload bài viết ..." }));
        request.post('/posts', JSON.stringify(data))
            .then(response => {
                //handle success    
                dispatch(openModal("alert", { title: "Thành công", text: "Tạo bài viết thành công!", type: "success" }));
            })
        // .catch(dispatch) => handle cho cai loader modal.
    }
}

// my post
export function getMyPostsList(searchTermObject) { //this API to get all approved document of a specific user.
    return dispatch => {
        dispatch(get_MyPostsRequest());
        request.get(`/posts/myPosts?${generateSearchTerm(searchTermObject)}`).then(
            response => {
                let result_1 = response.data;
                let IDarr = '';
                response.data.postSummaryWithStateDTOs.map(item => IDarr += item.id + ",") //tao ra mang id moi
                request.get(`/posts/statistic?postIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];

                        for (let i = 0; i < result_1.postSummaryWithStateDTOs.length; i++) {
                            finalResult.push({
                                ...result_1.postSummaryWithStateDTOs[i],
                                ...(result.data.find((itmInner) => itmInner.id === result_1.postSummaryWithStateDTOs[i].id)),
                            }
                            );
                            //delete redundant key - value  
                        }
                        dispatch(get_MyPostsSuccess({ data: finalResult, totalPages: result_1.totalPages }))
                    }).catch(() => get_MyPostsFailure())
            }
        ).catch(() => dispatch(get_MyPostsFailure()))
    }
}

//posts list
export function getPostsList(page = 1, category = "", searchTerm = "") {
    return dispatch => {
        dispatch(get_PostsListRequest(page, category, searchTerm));
        request.get(`https://5fca2bc63c1c220016441d27.mockapi.io/myPosts`)
            .then(
                result => {
                    dispatch(get_PostsListSuccess(result.data));
                }
            )
    }
}

export function getPendingPosts(searchTermObject) {
    return dispatch => {
        dispatch(get_PendingPostsRequest());
        request.get(`/posts?${generateSearchTerm(searchTermObject)}`)
            .then(
                result => {
                    dispatch(get_PendingPostsSuccess(result.data.postSummaryDTOs));
                }
            ).catch(error => { get_PendingPostsFailure(error) })
    }
}

//posts search result
export function getPostSearchResult(page = 0, categoryID = 1, searchTerm = '', sort = 'publishDtm,desc') {
    return dispatch => {
        dispatch(get_PostSearchResultRequest());
        request.get(`/posts/searchFilter?page=${page - 1}&category.id=${categoryID}&searchTerm=${searchTerm}&sort=${sort}`).then(
            result => {
                dispatch(get_PostSearchResultSuccess(result.data));
                // history.push(`/search?type=post&page=${page}&category=${categoryID}&q=${searchTerm}`);
            }
        )
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
        dispatch(delete_RejectAPostReset());
        request.delete(`/posts/${id}/approval`)
            .then(result => {
                dispatch(delete_RejectAPostSuccess());
            })
            .catch(error => delete_RejectAPostFailure())
    }
}

export function getPostByID(id) {
    return dispatch => {
        dispatch(get_PostByIDRequest())
        request.get(`/posts/${id}`)
            .then(response => {
                let _response = response; //response without statistic
                request.get(`/posts/statistic?postIDs=${_response.data.id}`)
                    .then(response => {
                        dispatch(get_PostByIDSuccess({ ..._response.data, ...response.data[0] }))
                    })
            }
            )
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
        dispatch(delete_APostRequest(id))
        // request.post(`/posts/${id}/savedStatus`)
        setTimeout(dispatch(delete_APostSuccess(id)), 200)
        dispatch(openBLModal({ text: "Xoá bài viết thành công!", icon: done_icon }))
        // .then(response => {
        // }
        // ).catch(() => dispatch(delete_APostFailure()))
    }
}

export function editAPost(id, newPostContent, reloadList) { //
    return dispatch => {
        dispatch(put_EditAPostRequest())
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


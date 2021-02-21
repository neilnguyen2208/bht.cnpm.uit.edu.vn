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

    post_ApproveAPostRequest,
    post_ApproveAPostSuccess,
    post_ApproveAPostFailure,

    post_LikeAPostRequest,
    delete_UnLikeAPostRequest,
    likeOrUnLikeAPostSuccess,
    likeOrUnLikeAPostFailure,

    post_SaveAPostRequest,
    delete_UnSaveAPostRequest,
    saveOrUnSaveAPostSuccess,
    saveOrUnSaveAPostFailure,

    delete_APostRequest,
    delete_APostSuccess,
    delete_APostFailure,

    post_EditAPostRequest,
    post_EditAPostSuccess,
    post_EditAPostFailure

} from "redux/actions/postAction.js";

import { openModal } from 'redux/actions/modalAction'

import { request } from 'utils/requestUtils';
import { generateSearchTerm } from 'utils/urlUtils'

export function postCreatePost(data) {
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
                                ...(result.data.find((itmInner) => itmInner.postID === result_1.postSummaryWithStateDTOs[i].id)),

                                //append mot bien isLikeLoading = false, isSaveLoading = false cho tat ca cac doi tuong thuoc mang finalResult => KHong can nua
                                // isLikeLoading: false,
                                // isSaveLoading: false,
                                // isUnSaveLoading: false,
                                // isUnLikeLoading: false

                            }
                            );
                            //delete redundant key - value 
                            delete finalResult[i].postID;
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

//posts search result
export function approveAPost(id) {
    return dispatch => {
        dispatch(post_ApproveAPostRequest());
        request.post(`/posts/id=${id}/approval`)
            .then(result => {
                dispatch(post_ApproveAPostSuccess());
            })
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
                        console.log(response)
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
                dispatch(likeOrUnLikeAPostSuccess(id));
            }
            ).catch(() => dispatch(likeOrUnLikeAPostFailure()))
    }
}

export function unLikeAPost(id) { //maybe use modal later
    return dispatch => {
        dispatch(delete_UnLikeAPostRequest())
        request.delete(`/posts/${id}/likeStatus`)
            .then(response => {
                dispatch(likeOrUnLikeAPostSuccess(response.data));
            }
            ).catch(() => dispatch(likeOrUnLikeAPostFailure()))
    }
}

export function saveAPost(id) { //maybe use modal later
    return dispatch => {
        dispatch(post_SaveAPostRequest(id))
        request.post(`/posts/${id}/savedStatus`)
            .then(response => {
                dispatch(saveOrUnSaveAPostSuccess(id));
            }
            ).catch(() => dispatch(saveOrUnSaveAPostFailure()))
    }
}

export function unSaveAPost(id) { //maybe use modal later
    return dispatch => {
        dispatch(delete_UnSaveAPostRequest(id))
        request.delete(`/posts/${id}/savedStatus`)
            .then(response => {
                dispatch(saveOrUnSaveAPostSuccess(id));
            }
            ).catch(() => dispatch(saveOrUnSaveAPostFailure()))
    }
}

//chua co API cho viec xoa bai post
export function deleteAPost(id) { //maybe use modal later
    return dispatch => {
        dispatch(delete_APostRequest(id))
        request.post(`/posts/${id}/savedStatus`)
            .then(response => {
                dispatch(delete_APostSuccess(id));
            }
            ).catch(() => dispatch(delete_APostFailure()))
    }
}

export function editAPost(id, newPostContent) { //
    return dispatch => {
        dispatch(post_EditAPostRequest(id))
        request.put(`/posts/${id}`)    
            .then(response => {
                dispatch(post_EditAPostSuccess(id, newPostContent));
            }
            ).catch(() => dispatch(post_EditAPostFailure()))
    }
}


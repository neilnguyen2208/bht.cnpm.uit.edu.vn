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
    post_ApproveAPostFailure

} from "redux/actions/postAction.js";

import { openModal } from 'redux/actions/modalAction'

import { request } from 'utils/requestUtils';
import history from 'history.js';

export function postCreatePost(data) {
    return dispatch => {

        //th nay se handle bang loader modal ben ngoai luon.
        // dispatch(openModal("loader", { text: "Đang upload bài viết ..." }));
        request.post('/posts', JSON.stringify(data))
            .then(response => {
                //handle success    
                dispatch(openModal("alert", { title: "Thành công", text: "Tạo bài viết thành công!", type: "success" }));
            })
            // .catch(dispatch)
    }
}

// my post
export function getMyPostsList(page = 1, category = "") { //this API to get all approved document of a specific user.
    return dispatch => {
        dispatch(get_MyPostsRequest());
        request.get(`/posts/myPosts`).then(
            response => {
                dispatch(get_MyPostsSuccess(response.data));
            }
        )
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
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

    post_CreatePostRequest,
    post_CreatePostSuccess,
    post_CreatePostFailure,

    get_PostByIDRequest,
    get_PostByIDSuccess,
    get_PostByIDFailure,

} from "redux/actions/postAction.js";

import {
    remoteServiceBaseUrl
} from 'utils/httpServices';
import history from 'history.js';

export function postCreatePost(data) {
    return dispatch => {
        dispatch(post_CreatePostRequest());

        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //token cac kieu
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        };

        fetch(`${remoteServiceBaseUrl}posts`, requestOptions)
            .then(response => response.json())
            .then(result => {
                dispatch(post_CreatePostSuccess(result));
            }
            )
            .catch(error => {

                dispatch(post_CreatePostFailure(error)); //
            })
    }
}



// my post
export function getMyPostsList(page = 1, category = "") { //this API to get all approved document of a specific user.
    return dispatch => {

        dispatch(get_MyPostsRequest());

        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://5fca2bc63c1c220016441d27.mockapi.io/myPosts`, requestOptions)
            .then(response => response.text())
            .then(
                result => {
                    dispatch(get_MyPostsSuccess(JSON.parse(result)));
                }
            )
            .catch(error => {
                dispatch(get_MyPostsFailure(error))
            })
    }
}

//posts list
export function getPostsList(page = 1, category = "", searchTerm = "") {
    return dispatch => {

        dispatch(get_PostsListRequest(page, category, searchTerm));

        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://5fca2bc63c1c220016441d27.mockapi.io/myPosts`, requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    dispatch(get_PostsListSuccess(result));
                }
            )
            .catch(error => {
                dispatch(get_PostsListFailure(error))
            })
    }
}

//posts search result
export function getPostSearchResult(page = 0, categoryID = 1, searchTerm = '', sort = 'publishDtm,desc') {
    return dispatch => {
        dispatch(get_PostSearchResultRequest());

        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`${remoteServiceBaseUrl}posts/searchFilter?page=${page - 1}&category.id=${categoryID}&searchTerm=${searchTerm}&sort=${sort}`, requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    dispatch(get_PostSearchResultSuccess(result));
                    // history.push(`/search?type=post&page=${page}&category=${categoryID}&q=${searchTerm}`);
                }
            )
            .catch(error => {
                dispatch(get_PostSearchResultFailure(error))
            })
    }
}

export function getPostByID(id) {
    return dispatch => {
        dispatch(get_PostByIDRequest())

        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`${remoteServiceBaseUrl}posts/${id}`, requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    let result_1 = result;
                    fetch(`${remoteServiceBaseUrl}/posts/statistic?postIDs=${result_1.id}`, requestOptions)
                        .then(response => response.json())
                        .then(
                            result => {

                                dispatch(get_PostByIDSuccess({ ...result_1, ...result[0] }))
                            }).catch(error => dispatch(get_PostByIDFailure(error)))

                }
            )
            .catch(error => {
                dispatch(get_PostByIDFailure(error))
            })
    }
}
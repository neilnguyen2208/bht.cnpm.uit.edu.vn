
import {
    get_TrendingDocumentsListRequest,
    get_TrendingDocumentsListSuccess,
    get_TrendingDocumentsListFailure,

    get_HighlightPostsRequest,
    get_HighlightPostsSuccess,
    get_HighlightPostsFailure,

    get_NewestPostsRequest,
    get_NewestPostsSuccess,
    get_NewestPostsFailure,

    get_NewestActivitiesRequest,
    get_NewestActivitiesSuccess,
    get_NewestActivitiesFailure,

} from "redux/actions/homeAction.js";
import { remoteServiceBaseUrl, request } from 'utils/requestUtils'

export function getTrendingDocumentsList() {

    return dispatch => {

        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        dispatch(get_TrendingDocumentsListRequest());

        fetch(`${remoteServiceBaseUrl}documents/trending`, requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    dispatch(get_TrendingDocumentsListSuccess(result));
                }
            )
            .catch(error => {
                dispatch(get_TrendingDocumentsListFailure(error)); //
            })
    }
}

export function getNewestPosts() {
    return dispatch => {
        dispatch(get_NewestPostsRequest());
        request.get(`/posts/newest`).then(
            response => {

                let result_1 = response.data;
                let IDarr = '';
                response.data.map(item => IDarr += item.id + ","); //create id array

                request.get(`/posts/statistic?postIDs=${IDarr}`)
                    .then(result => {
                        let arr = result_1.map((item, i) => Object.assign({}, item, result.data[i]));
                        console.log(arr);
                        dispatch(get_NewestPostsSuccess(arr))
                    }).catch(error => dispatch(get_NewestPostsFailure(error)))
            }
        )
            .catch(error => {
                dispatch(get_NewestPostsFailure(error)); //
            })
    }
}

//highlight post
export function getHighlightPosts() {
    return dispatch => {
        dispatch(get_HighlightPostsRequest());
        request.get(`/posts/newest`)
            .then(
                response => {
                    let result_1 = response.data;
                    let IDarr = ''; response.data.map(item => IDarr += item.id + ",")
                    request.get(`/posts/statistic?postIDs=${IDarr}`)
                        .then(result => {
                            let arr = result_1.map((item, i) => Object.assign({}, item, result.data[i]));
                            console.log(arr);
                            dispatch(get_HighlightPostsSuccess(arr))
                        }).catch(error => dispatch(get_HighlightPostsFailure(error)))
                }
            )
            .catch(error => {
                dispatch(get_HighlightPostsFailure(error)); //
            })
    }
}


export function getNewestActivities() {
    return dispatch => {
        dispatch(get_NewestActivitiesRequest());
        request.get(`/posts/newest`)
            .then(
                response => {
                    let result_1 = response.data;
                    let IDarr = ''; response.data.map(item => IDarr += item.id + ",")
                    request.get(`/posts/statistic?postIDs=${IDarr}`)
                        .then(result => {
                            let arr = result_1.map((item, i) => Object.assign({}, item, result.data[i]));
                            // console.log(arr);
                            dispatch(get_NewestActivitiesSuccess(arr))
                        }).catch(error => dispatch(get_NewestActivitiesFailure(error)))
                }
            )
            .catch(error => {
                dispatch(get_NewestActivitiesFailure(error)); //
            })
    }
}
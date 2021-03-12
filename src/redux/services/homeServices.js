
import {
    get_TrendingDocumentsListRequest,
    get_TrendingDocumentsListSuccess,
    get_TrendingDocumentsListFailure,

    get_HighlightPostsRequest,
    get_HighlightPostsSuccess,
    get_HighlightPostsFailure,

    get_NewestPostsListRequest,
    get_NewestPostsListSuccess,
    get_NewestPostsListFailure,

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

export function getNewestPostsList() {

    return dispatch => {

        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        dispatch(get_NewestPostsListRequest());

        fetch(`${remoteServiceBaseUrl}/posts/newest`, requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    let result_1 = result;
                    let IDarr = ''; result.map(item => IDarr += item.id + ","
                    )
                    fetch(`${remoteServiceBaseUrl}/posts/statistic?postIDs=${IDarr}`, requestOptions)
                        .then(response => response.json())
                        .then(
                            result => {
                                let arr = result_1.map((item, i) => Object.assign({}, item, result[i]));
                                // console.log(arr);
                                dispatch(get_NewestPostsListSuccess(arr))
                            }).catch(error => dispatch(get_NewestPostsListFailure(error)))
                }
            )
            .catch(error => {

                dispatch(get_NewestPostsListFailure(error)); //
            })
    }
}

//highlight post
export function getHighlightPosts() {
    return dispatch => {
        dispatch(get_HighlightPostsRequest());
        console.log("A")

        request.get(`/posts/newest`).then(
            response => {
                let result_1 = response.data;
                let IDarr = '';
                response.data.map(item => IDarr += item.id + ",") //tao ra mang id moi

                request.get(`/posts/statistic?postIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];

                        for (let i = 0; i < result_1.length; i++) {
                            finalResult.push({
                                ...result_1[i],
                                ...(result.data.find((itmInner) => itmInner.id === result_1[i].id)),
                            }
                            );
                            //delete redundant key - value  
                        }

                        dispatch(get_HighlightPostsSuccess(finalResult))
                    }).catch(() => get_HighlightPostsFailure())
            }
        ).catch(() => dispatch(get_HighlightPostsFailure()))
    }
}


export function getNewestActivities() {
    return dispatch => {

        dispatch(get_NewestActivitiesRequest());

        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://5fca2bc63c1c220016441d27.mockapi.io/highlight`, requestOptions)
            .then(response => response.text())
            .then(
                result => {
                    dispatch(get_NewestActivitiesSuccess(JSON.parse(result)));
                }
            )
            .catch(error => {
                dispatch(get_NewestActivitiesFailure(error))
            })
    }
}

import {
    get_TrendingDocumentsRequest,
    get_TrendingDocumentsSuccess,
    get_TrendingDocumentsFailure,

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
import { request } from 'utils/requestUtils'

export function getTrendingDocuments() {
    return dispatch => {
        dispatch(get_TrendingDocumentsRequest());
        request.get(`/documents/trending`).then(
            response => {
                let result_1 = response.data;
                let IDarr = '';
                // response.data.map(item => IDarr += item.id + ","); //create id array
                IDarr = "1,151";
                request.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        let arr = result_1.map((item, i) => Object.assign({}, item, result.data[i]));


                        let finalResult = [];

                        for (let i = 0; i < result_1.length; i++) {
                            finalResult.push({
                                ...result_1[i],
                                ...(result.data.find((itmInner) => itmInner.id === result_1[i].id)),
                            }
                            );
                        }

                        console.log(arr);
                        dispatch(get_TrendingDocumentsSuccess(finalResult))
                    }).catch(error => dispatch(get_TrendingDocumentsFailure(error)))
            }
        )
            .catch(error => {
                dispatch(get_TrendingDocumentsFailure(error)); //
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
                        let finalResult = [];

                        for (let i = 0; i < result_1.length; i++) {
                            finalResult.push({
                                ...result_1[i],
                                ...(result.data.find((itmInner) => itmInner.id === result_1[i].id)),
                            }
                            );
                        }
                        dispatch(get_NewestPostsSuccess(finalResult))
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
        request.get(`/posts/highlightPosts`)
            .then(
                response => {
                    let result_1 = response.data;
                    let IDarr = ''; response.data.map(item => IDarr += item.id + ",")
                    request.get(`/posts/statistic?postIDs=${IDarr}`)
                        .then(result => {
                            let finalResult = [];

                            for (let i = 0; i < result_1.length; i++) {
                                finalResult.push({
                                    ...result_1[i],
                                    ...(result.data.find((itmInner) => itmInner.id === result_1[i].id)),
                                }
                                );
                            }
                            dispatch(get_HighlightPostsSuccess(finalResult))
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
        request.get(`/posts/newactivities`)
            .then(
                response => {
                    let result_1 = response.data;
                    let IDarr = ''; response.data.map(item => IDarr += item.id + ",")
                    request.get(`/posts/statistic?postIDs=${IDarr}`)
                        .then(result => {
                            let finalResult = [];

                            for (let i = 0; i < result_1.length; i++) {
                                finalResult.push({
                                    ...result_1[i],
                                    ...(result.data.find((itmInner) => itmInner.id === result_1[i].id)),
                                }
                                );
                            }
                            dispatch(get_NewestActivitiesSuccess(finalResult))
                        }).catch(error => dispatch(get_NewestActivitiesFailure(error)))
                }
            )
            .catch(error => {
                dispatch(get_NewestActivitiesFailure(error)); //
            })
    }
}
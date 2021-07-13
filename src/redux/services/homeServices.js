
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

    highlight_APostReset,
    highlight_APostSuccess,
    highlight_APostFailure,

    delete_HighlightAPostReset,
    delete_HighlightAPostSuccess,

    stick_APostToTopReset,
    stick_APostToTopSuccess,
    stick_APostToTopFailure,
    get_NewestExcercisesRequest,
    get_NewestExcercisesSuccess,
    get_NewestExcercisesFailure

} from "redux/actions/homeAction.js";
import { authRequest } from 'utils/requestUtils'
import { openBLModal } from "./modalServices";

export function getTrendingDocuments() {
    return dispatch => {
        dispatch(get_TrendingDocumentsRequest());
        authRequest.get(`/documents/hot`).then(
            response_1 => {
                let result_1 = response_1.data;
                let IDarr = '';
                response_1.data.map(item => IDarr += item.id + ","); //create id array

                authRequest.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(response_2 => {
                        let finalResult = [];

                        for (let i = 0; i < result_1.length; i++) {
                            finalResult.push({
                                ...result_1[i],
                                ...(response_2.data.find((itmInner) => itmInner.id === result_1[i].id)),
                            });
                        }
                        dispatch(get_TrendingDocumentsSuccess(finalResult))
                    }).catch(error => dispatch(get_TrendingDocumentsFailure(error)))
            })
            .catch(error => {
                dispatch(get_TrendingDocumentsFailure(error)); //
            })
    }
}

export function getNewestPosts() {
    return dispatch => {
        dispatch(get_NewestPostsRequest());
        authRequest.get(`/posts/newest`).then(
            response => {

                let result_1 = response.data;
                let IDarr = '';
                response.data.map(item => IDarr += item.id + ","); //create id array

                authRequest.get(`/posts/statistics?postIDs=${IDarr}`)
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
        authRequest.get(`/posts/highlightPosts`)
            .then(response_1 => {
                let result_1 = response_1.data;
                let IDarr = ''; response_1.data.map(item => IDarr += item.postSummaryDTO.id + ",")
                authRequest.get(`/posts/statistics?postIDs=${IDarr}`)
                    .then(response_2 => {
                        let result_2 = [];
                        for (let i = 0; i < result_1.length; i++) {
                            result_2.push({
                                ...result_1[i],
                                ...result_1[i].postSummaryDTO,
                                ...(response_2.data.find((itmInner) => itmInner.id === result_1[i].postSummaryDTO.id)),
                            });
                        }
                        let actionIDarr = IDarr.length > 1 ? IDarr.substring(0, IDarr.length - 1) : IDarr;
                        authRequest.get(`/posts/actionAvailable?postIDs=${actionIDarr}`).then(response_3 => {
                            let finalResult = [];
                            for (let i = 0; i < result_2.length; i++) {
                                finalResult.push({
                                    ...result_2[i],
                                    ...(response_3.data.find((itmInner) => itmInner.id === result_2[i].id)),
                                });
                            }
                            dispatch(get_HighlightPostsSuccess(finalResult))
                        }).catch(error => dispatch(get_HighlightPostsFailure(error)))
                    }).catch(error => dispatch(get_HighlightPostsFailure(error)))
            }).catch(error => { dispatch(get_HighlightPostsFailure(error)); })
    }
}


//use after
export function getNewestActivities() {
    return dispatch => {
        dispatch(get_NewestActivitiesRequest());
        authRequest.get(`/posts/newactivities`)
            .then(response_1 => {
                let result_1 = response_1.data;
                let IDarr = ''; response_1.data.map(item => IDarr += item.id + ",");
                authRequest.get(`/posts/statistics?postIDs=${IDarr}`)
                    .then(response_2 => {
                        let result_2 = [];

                        for (let i = 0; i < result_1.length; i++) {
                            result_2.push({
                                ...result_1[i],
                                ...(response_2.data.find((itmInner) => itmInner.id === result_1[i].id)),
                            }
                            );
                        }
                        let actionIDarr = IDarr.length > 1 ? IDarr.substring(0, IDarr.length - 1) : IDarr;
                        authRequest.get(`/posts/actionAvailable?postIDs=${actionIDarr}`).then(response_3 => {
                            let finalResult = [];
                            for (let i = 0; i < result_2.length; i++) {
                                finalResult.push({
                                    ...result_2[i],
                                    ...(response_3.data.find((itmInner) => itmInner.id === result_2[i].id)),
                                });
                            }
                            dispatch(get_NewestActivitiesSuccess(finalResult))
                        }).catch(error => dispatch(get_NewestActivitiesFailure(error)))
                    }).catch(error => dispatch(get_NewestActivitiesFailure(error)))
            }).catch(error => {
                dispatch(get_NewestActivitiesFailure(error)); //
            })
    }
}

export function getNewestExercises() {
    return dispatch => {
        dispatch(get_NewestExcercisesRequest());
        authRequest.get(`/exercises/searchFilter?sortByPublishDtm=DESC&page=0`)
            .then(response_1 => {
                dispatch(get_NewestExcercisesSuccess(response_1.data.exerciseSearchResultDTOs));
            }).catch(error => {
                dispatch(get_NewestExcercisesFailure(error)); //
            })
    }
}

export function highlightAPost(id) {
    return dispatch => {
        let tmp = { id: id };
        dispatch(highlight_APostReset());
        authRequest.post('/posts/highlightPosts', JSON.stringify(tmp))
            .then(response => {
                dispatch(highlight_APostSuccess(response.data))
            }).catch(error => { dispatch(highlight_APostFailure()) })
    }
}

export function deleteHighlightAPost(id) {
    return dispatch => {
        dispatch(delete_HighlightAPostReset());
        authRequest.delete(`/posts/highlightPosts?id=${id}`)
            .then(response => {
                dispatch(delete_HighlightAPostSuccess(response.data));
            }).catch(error => { dispatch(highlight_APostFailure()) })
    }
}

export function stickAPostToTop(id) {
    return dispatch => {
        dispatch(stick_APostToTopReset());
        authRequest.post(`/posts/highlightPosts/stickToTop?id=${id}`)
            .then(response => {
                openBLModal({ type: "success", text: "Bài viết đã được ghim lên đầu!" })
                dispatch(stick_APostToTopSuccess(response.data));
            }).catch(error => { dispatch(stick_APostToTopFailure(error)) })
    }
}
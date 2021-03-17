import {
    get_DocCategoriesSuccess,
    get_DocCategoriesHaveAllSuccess,
    get_DocCategoriesRequest,
    get_DocCategoriesFailure
} from "redux/actions/docCategoryAction.js";

import { request } from 'utils/requestUtils';

export function getDocCategories() {
    return dispatch => {
        dispatch(get_DocCategoriesRequest());
        request.get('/documents/categories')
            .then(response => {
                dispatch(get_DocCategoriesSuccess(response.data))
            })
            .catch(error => dispatch(get_DocCategoriesFailure(error)))
    }
}

export function getDocCategoriesHaveAll() { //co truong tat ca hay khong
    return dispatch => {
        dispatch(get_DocCategoriesRequest());
        request.get(`/posts/categories`).then(response => {
            dispatch(get_DocCategoriesHaveAllSuccess(response.data));
        })
            .catch(error => {
                console.log(error);
                dispatch(get_DocCategoriesFailure());
            });

    }
}

import {
    get_DocumentCategoriesSuccess,
    get_DocumentCategoriesHaveAllSuccess,
    get_DocumentCategoriesRequest,
    get_DocumentCategoriesFailure
} from "redux/actions/documentCategoryAction.js";

import { request } from 'utils/requestUtils';

export function getDocumentCategories() {
    return dispatch => {
        dispatch(get_DocumentCategoriesRequest());
        request.get('/documents/categories')
            .then(response => {
                dispatch(get_DocumentCategoriesSuccess(response.data))
            })
            .catch(error => dispatch(get_DocumentCategoriesFailure(error)))
    }
}

export function getDocumentCategoriesHaveAll() { //co truong tat ca hay khong
    return dispatch => {
        dispatch(get_DocumentCategoriesRequest());
        request.get(`/documents/categories`).then(response => {
            dispatch(get_DocumentCategoriesHaveAllSuccess(response.data));
        })
            .catch(error => {
                dispatch(get_DocumentCategoriesFailure());
            });

    }
}

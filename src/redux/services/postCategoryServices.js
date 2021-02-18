import {
    get_PostCategoriesSuccess,
    get_PostCategoriesRequest,
    get_PostCategoriesFailure,
    get_PostCategoriesSuccessHaveAll
} from "redux/actions/postCategoryAction.js";
import { request } from 'utils/requestUtils';

export function getPostCategories() { //co truong tat ca hay khong
    return dispatch => {
        dispatch(get_PostCategoriesRequest());
        request.get(`/posts/categories`).then(response => {
            dispatch(get_PostCategoriesSuccess(response.data));
        })
            .catch(error => {
                console.log(error);
                dispatch(get_PostCategoriesFailure());
            });
    }
}

export function getPostCategoriesHaveAll() { //co truong tat ca hay khong
    return dispatch => {
        dispatch(get_PostCategoriesRequest());
        request.get(`/posts/categories`).then(response => {
            dispatch(get_PostCategoriesSuccessHaveAll(response.data));
        })
            .catch(error => {
                console.log(error);
                dispatch(get_PostCategoriesFailure());
            });

    }
}





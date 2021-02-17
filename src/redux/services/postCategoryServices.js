import {
    get_PostCategoriesSuccess,
    get_PostCategoriesRequest,
    get_PostCategoriesFailure
} from "redux/actions/postCategoryAction.js";
import { request } from 'utils/requestUtils';

export function getPostCategories() {
    return dispatch => {
        dispatch(get_PostCategoriesRequest());
        request.get(`/posts/categories`).then(response => {
            console.log(response.data);
            dispatch(get_PostCategoriesSuccess(response.data));
        })
            .catch(error => {
                console.log(error);
                dispatch(get_PostCategoriesFailure());
            });

    }
}




import {
    get_PostCategoriesSuccess,
    get_PostCategoriesRequest,
    get_PostCategoriesFailure
} from "redux/actions/postCategoryAction.js";
import { remoteServiceBaseUrl } from 'utils/requestUtils'

export function getPostCategories() {
    return dispatch => {
        dispatch(get_PostCategoriesRequest());
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };
        fetch(`${remoteServiceBaseUrl}/posts/categories`, requestOptions)
            .then(response => response.json())
            .then(result => {
                dispatch(get_PostCategoriesSuccess(result));
            })
            .catch(error => {
                dispatch(get_PostCategoriesFailure(error))
            });

    }
}




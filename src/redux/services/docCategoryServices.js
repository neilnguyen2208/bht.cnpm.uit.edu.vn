import {
    get_DocCategoriesSuccess,
    get_DocCategoriesRequest,
    get_DocCategoriesFailure
} from "redux/actions/docCategoryAction.js";

export function getDocCategories() {
    return dispatch => {

        dispatch(get_DocCategoriesRequest());

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://5fca2bc63c1c220016441d27.mockapi.io/category`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                dispatch(get_DocCategoriesSuccess(JSON.parse(result)));
            })
            .catch(error => {
                
                dispatch(get_DocCategoriesFailure(error))
            });
     
    }
}




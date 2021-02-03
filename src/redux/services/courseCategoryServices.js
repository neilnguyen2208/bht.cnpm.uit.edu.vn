import {
    get_CourseFalcutyCategoriesSuccess,
    get_CourseFalcutyCategoriesRequest,
    get_CourseFalcutyCategoriesFailure
} from "redux/actions/courseCategoryAction.js";

export function getCourseFalcutyCategories() {
    return dispatch => {

        dispatch(get_CourseFalcutyCategoriesRequest());

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://5fca2bc63c1c220016441d27.mockapi.io/category`, requestOptions)
            .then(response => response.text())
            .then(result => {
                
                dispatch(get_CourseFalcutyCategoriesSuccess(JSON.parse(result)));
            })
            .catch(error => {
                dispatch(get_CourseFalcutyCategoriesFailure(error))
            });

    }
}




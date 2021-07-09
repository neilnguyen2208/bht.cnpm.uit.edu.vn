import {
    get_ExerciseCategoriesSuccess,
    get_ExerciseCategoriesRequest,
    get_ExerciseCategoriesFailure,
    get_ExerciseCategoriesHaveAllSuccess
} from "redux/actions/exerciseCategoryAction.js";
import { request } from 'utils/requestUtils';

export function getExerciseCategories() { //co truong tat ca hay khong
    return dispatch => {
        dispatch(get_ExerciseCategoriesRequest());
        request.get(`/exercises/categories`).then(response => {
            dispatch(get_ExerciseCategoriesSuccess(response.data));
        })
            .catch(error => {

                dispatch(get_ExerciseCategoriesFailure());
            });
    }
}

export function getExerciseCategoriesHaveAll() { //co truong tat ca hay khong
    return dispatch => {
        dispatch(get_ExerciseCategoriesRequest());
        request.get(`/exercises/categories`).then(response => {
            dispatch(get_ExerciseCategoriesHaveAllSuccess(response.data));
        })
            .catch(error => {
                dispatch(get_ExerciseCategoriesFailure());
            });

    }
}





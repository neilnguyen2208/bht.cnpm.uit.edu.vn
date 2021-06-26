import {
    get_CourseFacultiesSuccess,
    get_CourseFacultiesRequest,
    get_CourseFacultiesFailure
} from "redux/actions/courseCategoryAction.js";
import { authRequest } from "utils/requestUtils";

export function getCourseFaculties() {
    return dispatch => {
        dispatch(get_CourseFacultiesRequest());
        authRequest.get(`/subjectFaculties`).then(result => {
            dispatch(get_CourseFacultiesSuccess(result.data));
        }).catch(error => {
            dispatch(get_CourseFacultiesFailure(error))
        });
    }
}




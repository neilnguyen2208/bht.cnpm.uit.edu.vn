import {
    get_DocumentSubjectsSuccess,
    get_DocumentSubjectsHaveAllSuccess,
    get_DocumentSubjectsRequest,
    get_DocumentSubjectsFailure
} from "redux/actions/subjectAction.js";

import { request } from 'utils/requestUtils';

export function getSubjectsList() {
    return dispatch => {
        dispatch(get_DocumentSubjectsRequest());
        request.get('/subjects')
            .then(response => {
                dispatch(get_DocumentSubjectsSuccess(response.data))
            })
            .catch(error => dispatch(get_DocumentSubjectsFailure(error)))
    }
}
export function getSubjectsListHaveAll() {
    return dispatch => {
        dispatch(get_DocumentSubjectsRequest());
        request.get('/subjects')
            .then(response => {
                dispatch(get_DocumentSubjectsHaveAllSuccess(response.data))
            })
            .catch(error => dispatch(get_DocumentSubjectsFailure(error)))
    }
}
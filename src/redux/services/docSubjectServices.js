import {
    get_DocumentSubjectsSuccess,
    get_DocumentSubjectsRequest,
    get_DocumentSubjectsFailure
} from "redux/actions/docSubjectAction.js";

import { request } from 'utils/requestUtils';

export function getDocumentSubjects() {
    return dispatch => {
        dispatch(get_DocumentSubjectsRequest());
        request.get('/documents/subjects')
            .then(response => {
                dispatch(get_DocumentSubjectsSuccess(response.data))
            })
            .catch(error => dispatch(get_DocumentSubjectsFailure(error)))
    }
}
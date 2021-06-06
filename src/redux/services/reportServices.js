import { request } from "utils/requestUtils";

import { get_ReportreasonsFailure, get_ReportReasonsReset, get_ReportReasonsSuccess } from "redux/actions/reportAction.js";
//posts search result
export function getReportReasons(searchParamObject) {
    return dispatch => {
        dispatch(get_ReportReasonsReset());
        request.get(`/reportReason`)
            .then(response => {
                dispatch(get_ReportReasonsSuccess(response.data))
            })
            .catch(error => dispatch(get_ReportreasonsFailure(error)))
    }
}
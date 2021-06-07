import { request } from "utils/requestUtils";

import { get_ReportReasonsFailure, get_ReportReasonsReset, get_ReportReasonsSuccess } from "redux/actions/reportAction.js";
//posts search result
export function getReportReasons() {
    return dispatch => {
        dispatch(get_ReportReasonsReset());
        request.get(`/reportReason`)
            .then(response => {
                dispatch(get_ReportReasonsSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => dispatch(get_ReportReasonsFailure(error)))
    }
}

// export function reportPost
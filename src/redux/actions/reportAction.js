import {
    GET_REPORT_REASONS_REQUEST,
    GET_REPORT_REASONS_FAILURE,
    GET_REPORT_REASONS_SUCCESS
} from "../constants.js"

//my post
export function get_ReportReasonsReset() {
    return {
        type: GET_REPORT_REASONS_REQUEST,
    }
}

export function get_ReportReasonsSuccess(data) {
    return {
        type: GET_REPORT_REASONS_SUCCESS,
        payload: data
    }
}

export function get_ReportReasonsFailure(error) {
    return {
        type: GET_REPORT_REASONS_FAILURE,
        payload: error
    }
}


import {
    GET_REPORT_REASONS_REQUEST,
    GET_REPORT_REASONS_SUCCESS,
    GET_REPORT_REASONS_FAILURE

} from '../constants.js'

const initialState = {
    isLoading: false,
    data: []
}

function ReportReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REPORT_REASONS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_REPORT_REASONS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            }
        case GET_REPORT_REASONS_FAILURE:
            return {
                ...state,
                isLoading: false,
                data: []
            }

        default:
            return state;
    }
}

export default ReportReducer;





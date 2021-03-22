import {
    GET_DOCUMENTS_LIST_REQUEST,
    GET_DOCUMENTS_LIST_SUCCESS,
    GET_DOCUMENTS_LIST_FAILURE,
    GET_MY_DOCUMENTS_REQUEST,
    GET_MY_DOCUMENTS_SUCCESS,
    GET_MY_DOCUMENTS_FAILURE,
    GET_DOCUMENT_SEARCH_REQUEST,
    GET_DOCUMENT_SEARCH_SUCCESS,
    GET_DOCUMENT_SEARCH_FAILURE,
    UPLOAD_DOCUMENT_REQUEST,
    UPLOAD_DOCUMENT_SUCCESS,
    UPLOAD_DOCUMENT_FAILURE,
    GET_PENDING_DOCUMENTS_REQUEST,
    GET_PENDING_DOCUMENTS_SUCCESS,
    GET_PENDING_DOCUMENTS_FAILURE,
    GET_REPORTED_DOCUMENTS_REQUEST,
    GET_REPORTED_DOCUMENTS_SUCCESS,
    GET_REPORTED_DOCUMENTS_FAILURE,
    APPROVE_A_DOCUMENT_SUCCESS,
    APPROVE_A_DOCUMENT_FAILURE,
    APPROVE_A_DOCUMENT_RESET,
    REJECT_A_DOCUMENT_SUCCESS,
    REJECT_A_DOCUMENT_FAILURE,
    REJECT_A_DOCUMENT_RESET,
    REJECT_AND_FEEDBACK_A_DOCUMENT_SUCCESS,
    REJECT_AND_FEEDBACK_A_DOCUMENT_FAILURE,
    REJECT_AND_FEEDBACK_A_DOCUMENT_RESET,
    DELETE_A_DOCUMENT_RESET,
    DELETE_A_DOCUMENT_SUCCESS,
    DELETE_A_DOCUMENT_FAILURE,
    EDIT_A_DOCUMENT_RESET,
    EDIT_A_DOCUMENT_SUCCESS,
    EDIT_A_DOCUMENT_FAILURE,
    REPORT_A_DOCUMENT_RESET,
    REPORT_A_DOCUMENT_SUCCESS,
    REPORT_A_DOCUMENT_FAILURE,
    RESOLVE_A_DOCUMENT_RESET,
    RESOLVE_A_DOCUMENT_SUCCESS,
    RESOLVE_A_DOCUMENT_FAILURE

} from '../constants.js'

const initialState = {
    documentsList: {
        isLoading: false,
        data: [],
        error: "",
        totalPages: 0,
        totalElements: 0
    },

    myDocuments: {
        isLoading: false,
        data: [],
        error: "",
        totalPages: 0,
        totalElements: 0
    },

    currentDocument: {
        isLoading: false, data: {}, isLoadDone: false,
    },

    pendingDocuments: {
        isLoading: false,
        data: [],
        error: "",
        totalPages: 0,
        totalElements: 0
    },
    
    reportedDocuments: {
        isLoading: false,
        data: [],
        error: "",
        totalPages: 0,
        totalElements: 0
    },

    isHaveUploaded: false,
    isHaveApproved: false,
    isHaveRejected: false,
    isHaveRejectAndFeedbacked: false,
    isHaveDeleted: false,
    isHaveEdited: false,
    isHaveReported: false,
    isHaveResolved: false
}

function DocReducer(state = initialState, action) {
    switch (action.type) {

        //my post
        case GET_MY_DOCUMENTS_REQUEST:
            return {
                ...state, myDocuments: { isLoading: true }
            };
        case GET_MY_DOCUMENTS_SUCCESS:
            {
                return {
                    ...state, myDocuments: {
                        isLoading: false,
                        data: action.payload.docSummaryWithStateDTOs,
                        totalElements: action.payload.totalElements,
                        totalPages: action.payload.totalPages, error: ''
                    }
                }
            }
        case GET_MY_DOCUMENTS_FAILURE:
            {
                return { ...state, myDocuments: { isLoading: false, error: action.payload, data: [] } }
            }

        //pending post
        case GET_PENDING_DOCUMENTS_REQUEST:
            return {
                ...state, pendingDocuments: { isLoading: true }
            };
        case GET_PENDING_DOCUMENTS_SUCCESS:
            {
                return {
                    ...state, pendingDocuments: {
                        isLoading: false,
                        data: action.payload.docSummaryWithStateDTOs,
                        totalElements: action.payload.totalElements,
                        totalPages: action.payload.totalPages, error: ''
                    }
                }
            }
        case GET_PENDING_DOCUMENTS_FAILURE:
            {
                return { ...state, reportedDocuments: { isLoading: false, error: action.payload, data: [] } }
            }

        //reported
        case GET_REPORTED_DOCUMENTS_REQUEST:
            return {
                ...state, pendingDocuments: { isLoading: true }
            };
        case GET_REPORTED_DOCUMENTS_SUCCESS:
            {
                return {
                    ...state, reportedDocuments: {
                        isLoading: false,
                        data: action.payload.docSummaryWithStateDTOs,
                        totalElements: action.payload.totalElements,
                        totalPages: action.payload.totalPages, error: ''
                    }
                }
            }
        case GET_REPORTED_DOCUMENTS_FAILURE:
            {
                return { ...state, reportedDocuments: { isLoading: false, error: action.payload, data: [] } }
            }

        case UPLOAD_DOCUMENT_REQUEST:
            return {
                ...state, isHaveUploaded: false
            };
        case UPLOAD_DOCUMENT_SUCCESS:
            {
                return { ...state, isHaveUploaded: true }
            }
        case UPLOAD_DOCUMENT_FAILURE:
            return {
                ...state, isHaveUploaded: true
            }

        //document search result 
        //my post
        case GET_DOCUMENT_SEARCH_REQUEST:
        case GET_DOCUMENTS_LIST_REQUEST:
            return {
                ...state, documentsList: { isLoading: true }
            };
        case GET_DOCUMENT_SEARCH_SUCCESS:
        case GET_DOCUMENTS_LIST_SUCCESS:
            {
                return {
                    ...state, documentsList: {
                        isLoading: false,
                        data: action.payload.docSummaryWithStateDTOs,
                        totalElements: action.payload.totalElements,
                        totalPages: action.payload.totalPages, error: ''
                    }
                }
            }
        case GET_DOCUMENT_SEARCH_FAILURE:
        case GET_DOCUMENTS_LIST_FAILURE:
            {
                return { ...state, documentsList: { isLoading: false, error: action.payload, data: [] } }
            }

        //appvove  
        case APPROVE_A_DOCUMENT_SUCCESS:
            return { ...state, isHaveApproved: true };
        case APPROVE_A_DOCUMENT_FAILURE:
            return { ...state, isHaveApproved: false };
        case APPROVE_A_DOCUMENT_RESET:
            return { ...state, isHaveApproved: false };

        //reject 
        case REJECT_A_DOCUMENT_SUCCESS:
            return { ...state, isHaveRejected: true };
        case REJECT_A_DOCUMENT_FAILURE:
            return { ...state, isHaveRejected: false };
        case REJECT_A_DOCUMENT_RESET:
            return { ...state, isHaveRejected: false };

        case REJECT_AND_FEEDBACK_A_DOCUMENT_SUCCESS:
            return { ...state, isHaveRejectedAndFeedbacked: true };
        case REJECT_AND_FEEDBACK_A_DOCUMENT_FAILURE:
            return { ...state, isHaveRejectedAndFeedbacked: false };
        case REJECT_AND_FEEDBACK_A_DOCUMENT_RESET:
            return { ...state, isHaveRejectedAndFeedbacked: false };
        //delete
        case DELETE_A_DOCUMENT_RESET:
            return {
                ...state, isHaveDeleted: false
            };
        case DELETE_A_DOCUMENT_SUCCESS:
            return {
                ...state, isHaveDeleted: true
            };
        case DELETE_A_DOCUMENT_FAILURE:
            return {
                ...state, isHaveDeleted: false
            };

        //edit post
        case EDIT_A_DOCUMENT_RESET:
            return {
                ...state, isHaveEdited: false
            };
        case EDIT_A_DOCUMENT_SUCCESS:
            return {
                ...state, isHaveEdited: true
            };
        case EDIT_A_DOCUMENT_FAILURE:
            return {
                ...state, isHaveEdited: false
            };

        //report
        case REPORT_A_DOCUMENT_RESET:
            return { ...state, isHaveReported: false };
        case REPORT_A_DOCUMENT_SUCCESS:
            return { ...state, isHaveReported: true };
        case REPORT_A_DOCUMENT_FAILURE:
            return { ...state, isHaveReported: false };

        //resolve    
        case RESOLVE_A_DOCUMENT_RESET:
            return { ...state, isHaveResolved: false };
        case RESOLVE_A_DOCUMENT_SUCCESS:
            return { ...state, isHaveResolved: true };
        case RESOLVE_A_DOCUMENT_FAILURE:
            return { ...state, isHaveResolved: false };


        default:
            return state;
    }
}

export default DocReducer;


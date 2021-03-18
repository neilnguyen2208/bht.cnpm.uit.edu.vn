import {
    //DOCUMENTS LIST
    GET_DOCUMENTS_LIST_REQUEST,
    GET_DOCUMENTS_LIST_SUCCESS,
    GET_DOCUMENTS_LIST_FAILURE,

    // MY DOC
    GET_MY_DOCUMENTS_REQUEST,
    GET_MY_DOCUMENTS_SUCCESS,
    GET_MY_DOCUMENTS_FAILURE,

    //DOCUMENT SEARCH RESULT
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




        default:
            return state;
    }
}

export default DocReducer;


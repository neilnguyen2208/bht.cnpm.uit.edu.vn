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

} from '../constants.js'

const initialState = {
    documentSearchResult: {
        isLoading: false,
        data: [],
        error: ""
    },
    myDocuments: {
        isLoading: false,
        data: [],
        error: ""
    },
    isHaveUploaded: false,

}

function DocReducer(state = initialState, action) {
    switch (action.type) {

        // case GET_ALL_NOT_APPROVED_DOCUMENTS:
        //     return { ...state, requestedDocuments: action.payload };
        // case APPROVE_A_DOCUMENT:
        //     return { ...state, currentDocumentApprovedStatus: action.payload }

        //new documents

        //my post
        case GET_MY_DOCUMENTS_REQUEST:
            return {
                ...state, myDocuments: { isLoading: true }
            };
        case GET_MY_DOCUMENTS_SUCCESS:
            {
                return { ...state, myDocuments: { isLoading: false, data: action.payload, error: '' } }
            }
        case GET_MY_DOCUMENTS_FAILURE:
            {
                return { ...state, myDocuments: { isLoading: false, error: action.payload, data: [] } }
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
                ...state, documentSearchResult: { isLoading: true }
            };
        case GET_DOCUMENT_SEARCH_SUCCESS:
        case GET_DOCUMENTS_LIST_SUCCESS:
            {
                return { ...state, documentSearchResult: { isLoading: false, data: action.payload, error: '' } }
            }
        case GET_DOCUMENT_SEARCH_FAILURE:
        case GET_DOCUMENTS_LIST_FAILURE:
            {
                return { ...state, documentSearchResult: { isLoading: false, error: action.payload, data: [] } }
            }




        default:
            return state;
    }
}

export default DocReducer;


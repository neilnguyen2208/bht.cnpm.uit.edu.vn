import {


    //
    GET_ALL_NOT_APPROVED_DOCUMENTS_SUCCESS,
    GET_ALL_NOT_APPROVED_DOCUMENTS_REQUEST,
    GET_ALL_NOT_APPROVED_DOCUMENTS_FAILURE,

    APPROVE_A_DOCUMENT,

    //new documents
    GET_TRENDING_DOCUMENTS_LIST_REQUEST,
    GET_TRENDING_DOCUMENTS_LIST_SUCCESS,
    GET_TRENDING_DOCUMENTS_LIST_FAILURE,

    //my documents
    GET_MY_DOCUMENTS_REQUEST,
    GET_MY_DOCUMENTS_SUCCESS,
    GET_MY_DOCUMENTS_FAILURE,

    //documents list
    GET_DOCUMENTS_LIST_REQUEST,
    GET_DOCUMENTS_LIST_SUCCESS,
    GET_DOCUMENTS_LIST_FAILURE,

    //document search results
    GET_DOCUMENT_SEARCH_RESULT_REQUEST,
    GET_DOCUMENT_SEARCH_RESULT_SUCCESS,
    GET_DOCUMENT_SEARCH_RESULT_FAILURE,

    UPLOAD_DOCUMENT_REQUEST, UPLOAD_DOCUMENT_SUCCESS, UPLOAD_DOCUMENT_FAILURE

} from "../constants.js"



//
// export function get_NotApprovedDocumentsList(requestedDocs) {
//     return {
//         type: GET_ALL_NOT_APPROVED_DOCUMENTS,
//         payload: requestedDocs,
//     }
// }

// export function managementApproveADocument(requestedDoc) {
//     return {
//         type: APPROVE_A_DOCUMENT,
//         payload: requestedDoc,
//     }
// }


//my documents
export function get_MyDocumentsRequest() {
    return {
        type: GET_MY_DOCUMENTS_REQUEST,
    }
}

export function get_MyDocumentsSuccess(data) {
    return {
        type: GET_MY_DOCUMENTS_SUCCESS,
        payload: data
    }
}

export function get_MyDocumentsFailure(error) {
    return {
        type: GET_MY_DOCUMENTS_FAILURE,
        payload: error
    }
}

//documents list
export function get_DocumentsListRequest() {
    return {
        type: GET_DOCUMENTS_LIST_REQUEST,
    }
}

export function get_DocumentsListSuccess(data) {
    return {
        type: GET_DOCUMENTS_LIST_SUCCESS,
        payload: data
    }
}

export function get_DocumentsListFailure(error) {
    return {
        type: GET_DOCUMENTS_LIST_FAILURE,
        payload: error
    }
}

//document search result
export function get_DocumentSearchResultRequest() {
    return {
        type: GET_DOCUMENT_SEARCH_RESULT_REQUEST,
    }
}

export function get_DocumentSearchResultSuccess(data) {
    return {
        type: GET_DOCUMENT_SEARCH_RESULT_SUCCESS,
        payload: data
    }
}

export function get_DocumentSearchResultFailure(error) {
    return {
        type: GET_DOCUMENT_SEARCH_RESULT_FAILURE,
        payload: error
    }
}


//create a post 
export function post_UploadDocumentRequest() {
    return {
        type: UPLOAD_DOCUMENT_REQUEST
    }
}

export function post_UploadDocumentSuccess(notification) {
    return {
        type: UPLOAD_DOCUMENT_SUCCESS,
        payload: notification
    }
}

export function post_UploadDocumentFailure(notification) {
    return {
        type: UPLOAD_DOCUMENT_FAILURE,
        payload: notification
    }
}


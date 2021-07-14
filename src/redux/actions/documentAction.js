import {
    //my documents
    GET_MY_DOCUMENTS_REQUEST,
    GET_MY_DOCUMENTS_SUCCESS,
    GET_MY_DOCUMENTS_FAILURE,

    //pending documents
    GET_PENDING_DOCUMENTS_REQUEST,
    GET_PENDING_DOCUMENTS_SUCCESS,
    GET_PENDING_DOCUMENTS_FAILURE,

    //reported documents
    GET_REPORTED_DOCUMENTS_REQUEST,
    GET_REPORTED_DOCUMENTS_SUCCESS,
    GET_REPORTED_DOCUMENTS_FAILURE,

    //documents list
    GET_DOCUMENTS_LIST_REQUEST,
    GET_DOCUMENTS_LIST_SUCCESS,
    GET_DOCUMENTS_LIST_FAILURE,

    //document search results
    GET_DOCUMENT_SEARCH_REQUEST,
    GET_DOCUMENT_SEARCH_SUCCESS,
    GET_DOCUMENT_SEARCH_FAILURE,

    UPLOAD_DOCUMENT_REQUEST, //to drive
    UPLOAD_DOCUMENT_SUCCESS,
    UPLOAD_DOCUMENT_FAILURE,
    REACTION_A_DOCUMENT_REQUEST,
    REACTION_A_DOCUMENT_SUCCESS,
    REACTION_A_DOCUMENT_FAILURE,
    APPROVE_A_DOCUMENT_RESET,
    APPROVE_A_DOCUMENT_SUCCESS,
    APPROVE_A_DOCUMENT_FAILURE,
    REJECT_A_DOCUMENT_RESET,
    REJECT_A_DOCUMENT_SUCCESS,
    REJECT_A_DOCUMENT_FAILURE,
    REJECT_AND_FEEDBACK_A_DOCUMENT_RESET,
    REJECT_AND_FEEDBACK_A_DOCUMENT_SUCCESS,
    REJECT_AND_FEEDBACK_A_DOCUMENT_FAILURE,
    RESOLVE_A_DOCUMENT_RESET,
    RESOLVE_A_DOCUMENT_SUCCESS,
    RESOLVE_A_DOCUMENT_FAILURE,
    DELETE_A_DOCUMENT_RESET,
    DELETE_A_DOCUMENT_SUCCESS,
    DELETE_A_DOCUMENT_FAILURE,
    EDIT_A_DOCUMENT_RESET,
    EDIT_A_DOCUMENT_SUCCESS,
    EDIT_A_DOCUMENT_FAILURE,
    REPORT_A_DOCUMENT_RESET,
    REPORT_A_DOCUMENT_SUCCESS,
    REPORT_A_DOCUMENT_FAILURE,
    GET_DOCUMENT_BY_ID_SUCCESS,
    GET_DOCUMENT_BY_ID_FAILURE,
    GET_DOCUMENT_BY_ID_RESET,
    GET_MANAGEMENT_DOCUMENTS_FAILURE,
    GET_MANAGEMENT_DOCUMENTS_SUCCESS,
    GET_MANAGEMENT_DOCUMENTS_REQUEST,
    GET_SUBJECTS_LIST_REQUEST,
    GET_SUBJECTS_LIST_SUCCESS,
    GET_SUBJECTS_LIST_FAILURE,
    GET_DC_DOCUMENT_SUBJECTS_LIST_REQUEST,
    GET_DC_DOCUMENT_SUBJECTS_LIST_SUCCESS,
    GET_DC_DOCUMENT_SUBJECTS_LIST_FAILURE,
    GET_CSNN_DOCUMENT_SUBJECTS_LIST_REQUEST,
    GET_CSNN_DOCUMENT_SUBJECTS_LIST_SUCCESS,
    GET_CSNN_DOCUMENT_SUBJECTS_LIST_FAILURE,
    GET_RELATIVE_DOCUMENTS_SUCCESS,
    GET_RELATIVE_DOCUMENTS_FAILURE,
    GET_RELATIVE_DOCUMENTS_RESET,
    GET_SAME_SUBJECT_DOCUMENTS_FAILURE,
    GET_SAME_SUBJECT_DOCUMENTS_RESET,
    GET_SAME_SUBJECT_DOCUMENTS_SUCCESS,
    GET_DOWNLOAD_URL_RESET,
    GET_DOWNLOAD_URL_SUCCESS,
    GET_DOWNLOAD_URL_FAILURE,
    GET_DOCUMENTS_BY_FILTER_REQUEST,
    GET_DOCUMENTS_BY_FILTER_SUCCESS,
    GET_DOCUMENTS_BY_FILTER_FAILURE,
    SET_PROGRESS_UPLOAD_FILE_RESET,
    SET_PROGRESS_UPLOAD_FILE_SUCCESS,
    SET_PROGRESS_UPLOAD_FILE_FAILURE,
    GET_DOCUMENT_BY_ID_FOR_EDIT_SUCCESS,
    GET_DOCUMENT_BY_ID_FOR_EDIT_FAILURE,
    GET_DOCUMENT_BY_ID_FOR_EDIT_RESET,
    GET_RELATIVE_POSTS_TO_A_DOCUMENT_RESET,
    GET_RELATIVE_POSTS_TO_A_DOCUMENT_SUCCESS,
    GET_RELATIVE_POSTS_TO_A_DOCUMENT_FAILURE,
    GET_RELATIVE_EXERCISES_TO_A_POST_RESET,
    GET_RELATIVE_EXERCISES_TO_A_POST_SUCCESS,
    GET_RELATIVE_EXERCISES_TO_A_POST_FAILURE,
    GET_RELATIVE_EXERCISES_TO_A_DOCUMENT_RESET,
    GET_RELATIVE_EXERCISES_TO_A_DOCUMENT_SUCCESS,
    GET_RELATIVE_EXERCISES_TO_A_DOCUMENT_FAILURE
} from "../constants.js"

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

//my documents
export function get_PendingDocumentsRequest() {
    return {
        type: GET_PENDING_DOCUMENTS_REQUEST,
    }
}

export function get_PendingDocumentsSuccess(data) {
    return {
        type: GET_PENDING_DOCUMENTS_SUCCESS,
        payload: data
    }
}

export function get_PendingDocumentsFailure(error) {
    return {
        type: GET_PENDING_DOCUMENTS_FAILURE,
        payload: error
    }
}

export function get_ManagementDocumentsRequest() {
    return {
        type: GET_MANAGEMENT_DOCUMENTS_REQUEST,
    }
}

export function get_ManagementDocumentsSuccess(data) {
    return {
        type: GET_MANAGEMENT_DOCUMENTS_SUCCESS,
        payload: data
    }
}

export function get_ManagementDocumentsFailure(error) {
    return {
        type: GET_MANAGEMENT_DOCUMENTS_FAILURE,
        payload: error
    }
}

export function get_ReportedDocumentsRequest() {
    return {
        type: GET_REPORTED_DOCUMENTS_REQUEST,
    }
}

export function get_ReportedDocumentsSuccess(data) {
    return {
        type: GET_REPORTED_DOCUMENTS_SUCCESS,
        payload: data
    }
}

export function get_ReportedDocumentsFailure(error) {
    return {
        type: GET_REPORTED_DOCUMENTS_FAILURE,
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
export function get_DocumentSearchRequest() {
    return {
        type: GET_DOCUMENT_SEARCH_REQUEST,
    }
}

export function get_DocumentSearchSuccess(data) {
    return {
        type: GET_DOCUMENT_SEARCH_SUCCESS,
        payload: data
    }
}

export function get_DocumentSearchFailure(error) {
    return {
        type: GET_DOCUMENT_SEARCH_FAILURE,
        payload: error
    }
}


//create a post 
export function post_UploadDocumentRequest() {
    return {
        type: UPLOAD_DOCUMENT_REQUEST
    }
}

export function post_UploadDocumentSuccess(data) {
    return {
        type: UPLOAD_DOCUMENT_SUCCESS,
        payload: data
    }
}

export function post_UploadDocumentFailure(notification) {
    return {
        type: UPLOAD_DOCUMENT_FAILURE,
        payload: notification
    }
}

export function post_ReactionADocumentRequest() {
    return {
        type: REACTION_A_DOCUMENT_REQUEST
    }
}

export function post_ReactionADocumentSuccess() {
    return {
        type: REACTION_A_DOCUMENT_SUCCESS
    }
}

export function post_ReactionADocumentFailure() {
    return {
        type: REACTION_A_DOCUMENT_FAILURE
    }
}


export function post_ApproveADocumentReset() {
    return {
        type: APPROVE_A_DOCUMENT_RESET
    }
}

export function post_ApproveADocumentSuccess(notification) {
    return {
        type: APPROVE_A_DOCUMENT_SUCCESS,
        payload: notification
    }
}

export function post_ApproveADocumentFailure(notification) {
    return {
        type: APPROVE_A_DOCUMENT_FAILURE,
        payload: notification
    }
}

export function delete_RejectADocumentReset() {
    return {
        type: REJECT_A_DOCUMENT_RESET
    }
}

export function delete_RejectADocumentSuccess() {
    return {
        type: REJECT_A_DOCUMENT_SUCCESS
    }
}

export function delete_RejectADocumentFailure() {
    return {
        type: REJECT_A_DOCUMENT_FAILURE
    }
}

export function post_RejectAndFeedbackADocumentReset() {
    return {
        type: REJECT_AND_FEEDBACK_A_DOCUMENT_RESET
    }
}

export function post_RejectAndFeedbackADocumentSuccess() {
    return {
        type: REJECT_AND_FEEDBACK_A_DOCUMENT_SUCCESS
    }
}

export function post_RejectAndFeedbackADocumentFailure() {
    return {
        type: REJECT_AND_FEEDBACK_A_DOCUMENT_FAILURE
    }
}


export function post_ResolveADocumentReset() {
    return {
        type: RESOLVE_A_DOCUMENT_RESET
    }
}

export function post_ResolveADocumentSuccess() {
    return {
        type: RESOLVE_A_DOCUMENT_SUCCESS
    }
}

export function post_ResolveADocumentFailure() {
    return {
        type: RESOLVE_A_DOCUMENT_FAILURE
    }
}

// edit and delete post
export function delete_ADocumentReset() {
    return {
        type: DELETE_A_DOCUMENT_RESET,
    }
}

export function delete_ADocumentSuccess() {
    return {
        type: DELETE_A_DOCUMENT_SUCCESS,
    }
}

export function delete_ADocumentFailure(error) {
    return {
        type: DELETE_A_DOCUMENT_FAILURE,
        payload: error
    }
}

export function put_EditADocumentReset(data) {
    return {
        type: EDIT_A_DOCUMENT_RESET
    }
}

export function put_EditADocumentSuccess(data) {
    return {
        type: EDIT_A_DOCUMENT_SUCCESS,
        payload: data
    }
}

export function put_EditADocumentFailure() {
    return {
        type: EDIT_A_DOCUMENT_FAILURE
    }
}


export function post_ReportADocumentReset() {
    return {
        type: REPORT_A_DOCUMENT_RESET
    }
}

export function post_ReportADocumentSuccess() {
    return {
        type: REPORT_A_DOCUMENT_SUCCESS
    }
}

export function post_ReportADocumentFailure() {
    return {
        type: REPORT_A_DOCUMENT_FAILURE
    }
}

//document by id 
export function get_DocumentByIDSuccess(data) {
    return {
        type: GET_DOCUMENT_BY_ID_SUCCESS,
        payload: data
    }
}

export function get_DocumentByIDFailure(error) {
    return {
        type: GET_DOCUMENT_BY_ID_FAILURE,
        error: error
    }
}

export function get_DocumentByIDReset() {
    return {
        type: GET_DOCUMENT_BY_ID_RESET
    }
}


export function get_DocumentByIDForEditSuccess(data) {
    return {
        type: GET_DOCUMENT_BY_ID_FOR_EDIT_SUCCESS,
        payload: data
    }
}

export function get_DocumentByIDForEditFailure(error) {
    return {
        type: GET_DOCUMENT_BY_ID_FOR_EDIT_FAILURE,
        error: error
    }
}

export function get_DocumentByIDForEditReset() {
    return {
        type: GET_DOCUMENT_BY_ID_FOR_EDIT_RESET
    }
}

export function get_DocumentSubjectsListRequest() {
    return {
        type: GET_SUBJECTS_LIST_REQUEST
    }
}

export function get_DocumentSubjectsListSuccess() {
    return {
        type: GET_SUBJECTS_LIST_SUCCESS,
    }
}

export function get_DocumentSubjectsListFailure() {
    return {
        type: GET_SUBJECTS_LIST_FAILURE
    }
}

export function get_DCDocumentSubjectsListRequest() {
    return {
        type: GET_DC_DOCUMENT_SUBJECTS_LIST_REQUEST
    }
}

export function get_DCDocumentSubjectsListSuccess(data) {
    return {
        type: GET_DC_DOCUMENT_SUBJECTS_LIST_SUCCESS,
        payload: data
    }
}

export function get_DCDocumentSubjectsListFailure() {
    return {
        type: GET_DC_DOCUMENT_SUBJECTS_LIST_FAILURE
    }
}

export function get_CSNNDocumentSubjectsListRequest() {
    return {
        type: GET_CSNN_DOCUMENT_SUBJECTS_LIST_REQUEST
    }
}

export function get_CSNNDocumentSubjectsListSuccess() {
    return {
        type: GET_CSNN_DOCUMENT_SUBJECTS_LIST_SUCCESS,
    }
}

export function get_CSNNDocumentSubjectsListFailure() {
    return {
        type: GET_CSNN_DOCUMENT_SUBJECTS_LIST_FAILURE
    }
}

export function get_RelativeDocumentsReset() {
    return {
        type: GET_RELATIVE_DOCUMENTS_RESET
    }
}

export function get_RelativeDocumentsSuccess(data) {
    return {
        type: GET_RELATIVE_DOCUMENTS_SUCCESS,
        payload: data
    }
}

export function get_RelativeDocumentsFailure() {
    return {
        type: GET_RELATIVE_DOCUMENTS_FAILURE
    }
}

export function get_SameSubjectDocumentsReset() {
    return {
        type: GET_SAME_SUBJECT_DOCUMENTS_RESET
    }
}

export function get_SameSubjectDocumentsSuccess(data) {
    return {
        type: GET_SAME_SUBJECT_DOCUMENTS_SUCCESS,
        payload: data
    }
}

export function get_SameSubjectDocumentsFailure() {
    return {
        type: GET_SAME_SUBJECT_DOCUMENTS_FAILURE
    }
}

export function get_DownloadURLReset() {
    return {
        type: GET_DOWNLOAD_URL_RESET
    }
}

export function get_DownloadURSuccess(data) {
    return {
        type: GET_DOWNLOAD_URL_SUCCESS,
        payload: data
    }
}

export function get_DownloadURLFailure() {
    return {
        type: GET_DOWNLOAD_URL_FAILURE
    }
}

export function get_DocumentsByFilterRequest() {
    return { type: GET_DOCUMENTS_BY_FILTER_REQUEST }
}

export function get_DocumentsByFilterSuccess(data) {
    return { type: GET_DOCUMENTS_BY_FILTER_SUCCESS, payload: data }
}

export function get_DocumentsByFilterFailure(error) {
    return { type: GET_DOCUMENTS_BY_FILTER_FAILURE, payload: error }
}

export function setProgressUploadFileReset() {
    return { type: SET_PROGRESS_UPLOAD_FILE_RESET }
}

export function setProgressUploadFileSuccess(data) {
    return { type: SET_PROGRESS_UPLOAD_FILE_SUCCESS, payload: data }
}

export function setProgressUploadFileFailure(error) {
    return { type: SET_PROGRESS_UPLOAD_FILE_FAILURE, payload: error }
}

export function get_RelativePostsToADocumentReset() {
    return { type: GET_RELATIVE_POSTS_TO_A_DOCUMENT_RESET }
}

export function get_RelativePostsToADocumentSuccess(data) {
    return { type: GET_RELATIVE_POSTS_TO_A_DOCUMENT_SUCCESS, payload: data }
}

export function get_RelativePostsToADocumentFailure() {
    return { type: GET_RELATIVE_POSTS_TO_A_DOCUMENT_FAILURE
     }
}

export function get_RelativeExercisesToADocumentReset() {
    return { type: GET_RELATIVE_EXERCISES_TO_A_DOCUMENT_RESET
     }
}

export function get_RelativeExercisesToADocumentSuccess(data) {
    return { type: GET_RELATIVE_EXERCISES_TO_A_DOCUMENT_SUCCESS
        , payload: data }
}

export function get_RelativeExercisesToADocumentFailure() {
    return { type: GET_RELATIVE_EXERCISES_TO_A_DOCUMENT_FAILURE
     }
}
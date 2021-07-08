
import {
  GET_A_DOCUMENT_COMMENTS_SUCCESS,
  GET_A_DOCUMENT_COMMENTS_REQUEST,
  GET_A_DOCUMENT_COMMENTS_FAILURE,
  EDIT_A_DOCUMENT_COMMENT_RESET,
  EDIT_A_DOCUMENT_COMMENT_SUCCESS,
  EDIT_A_DOCUMENT_COMMENT_FAILURE,
  CREATE_A_DOCUMENT_COMMENT_SUCCESS,
  CREATE_A_DOCUMENT_COMMENT_RESET,
  CREATE_A_DOCUMENT_COMMENT_FAILURE,
  LIKE_A_DOCUMENT_COMMENT_REQUEST,
  LIKE_A_DOCUMENT_COMMENT_SUCCESS,
  LIKE_A_DOCUMENT_COMMENT_FAILURE,
  UNLIKE_A_DOCUMENT_COMMENT_REQUEST,
  UNLIKE_A_DOCUMENT_COMMENT_SUCCESS,
  UNLIKE_A_DOCUMENT_COMMENT_FAILURE,
  DELETE_A_DOCUMENT_COMMENT_RESET,
  DELETE_A_DOCUMENT_COMMENT_SUCCESS,
  DELETE_A_DOCUMENT_COMMENT_FAILURE,
  REPORT_A_DOCUMENT_COMMENT_SUCCESS,
  REPORT_A_DOCUMENT_COMMENT_RESET,
  REPORT_A_DOCUMENT_COMMENT_FAILURE,
  RESOLVE_A_DOCUMENT_COMMENT_RESET,
  RESOLVE_A_DOCUMENT_COMMENT_FAILURE,
  RESOLVE_A_DOCUMENT_COMMENT_SUCCESS,
  CREATE_A_DOCUMENT_COMMENT_REPLY_FAILURE,
  CREATE_A_DOCUMENT_COMMENT_REPLY_SUCCESS,
  CREATE_A_DOCUMENT_COMMENT_REPLY_RESET,

  GET_REPORTED_DOCUMENT_COMMENTS_REQUEST,
  GET_REPORTED_DOCUMENT_COMMENTS_SUCCESS,
  GET_REPORTED_DOCUMENT_COMMENTS_FAILURE,
} from "../constants.js"

const initialState = {
  currentDocumentComments: {
    isLoading: false,
    isLoadDone: false,
    data: [],
    totalPages: 5,
    totalElements: 23,
  },
  reportedDocumentComments: {
    isLoading: false,
    isLoadDone: false,
    data: [],
    totalPages: 0,
    totalElements: 0,
  },
  reportReasons: {
    isLoading: false,
    data: []
  },
  isHaveDeleted: false,
  isHaveEdited: false,
  isHaveReported: false,
  isHaveApppoved: false,
  isHaveResolved: false,
  isHaveCreated: false,
  createdCommentId: null,
  editedCommentId: null,

}

function CommentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_A_DOCUMENT_COMMENTS_REQUEST:
      return {
        ...state,
        currentDocumentComments: {
          ...state.currentDocumentComments,
          isLoading: true
        }
      }
    case GET_A_DOCUMENT_COMMENTS_SUCCESS:
      return {
        ...state, currentDocumentComments: {
          isLoading: false,
          data: action.payload.documentCommentDTOs,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements
        }
      };

    case GET_A_DOCUMENT_COMMENTS_FAILURE: return {
      ...state
    }

    case CREATE_A_DOCUMENT_COMMENT_RESET: return {
      ...state, isHaveCreated: false,
    }

    case CREATE_A_DOCUMENT_COMMENT_SUCCESS:
      return {
        ...state, isHaveCreated: true,
        createdCommentId: action.payload,
      }

    // maybe use internal state to handle
    case CREATE_A_DOCUMENT_COMMENT_FAILURE: return {
      ...state, isHaveCreated: false,
      createdCommentId: null,
    }

    case CREATE_A_DOCUMENT_COMMENT_REPLY_RESET: return {
      ...state,
      isHaveCreated: false,
    }

    case CREATE_A_DOCUMENT_COMMENT_REPLY_SUCCESS:
      return {
        ...state,
        isHaveCreated: true,
        createdCommentId: action.payload,
      }

    case CREATE_A_DOCUMENT_COMMENT_REPLY_FAILURE: return {
      ...state, isHaveCreated: false,
      createdCommentId: null,
    }

    //like Document comment
    case LIKE_A_DOCUMENT_COMMENT_REQUEST:
      return { ...state, likeDocument: { isLoading: true } }//use for all Document item
    case LIKE_A_DOCUMENT_COMMENT_SUCCESS:
      return { ...state, likeDocument: { isLoading: false } }
    case LIKE_A_DOCUMENT_COMMENT_FAILURE:
      return { ...state, likeDocument: { isLoading: false } }

    //delete
    case DELETE_A_DOCUMENT_COMMENT_RESET:
      return {
        ...state, isHaveDeleted: false
      };
    case DELETE_A_DOCUMENT_COMMENT_SUCCESS:
      return {
        ...state, isHaveDeleted: true
      };
    case DELETE_A_DOCUMENT_COMMENT_FAILURE:
      return {
        ...state, isHaveDeleted: false
      };

    //edit Document
    case EDIT_A_DOCUMENT_COMMENT_RESET:
      return {
        ...state, isHaveEdited: false
      };
    case EDIT_A_DOCUMENT_COMMENT_SUCCESS:
      return {
        ...state, isHaveEdited: true
      };
    case EDIT_A_DOCUMENT_COMMENT_FAILURE:
      return {
        ...state, isHaveEdited: false
      };

    //report
    case REPORT_A_DOCUMENT_COMMENT_RESET:
      return { ...state, isHaveReported: false };
    case REPORT_A_DOCUMENT_COMMENT_SUCCESS:
      return { ...state, isHaveReported: true };
    case REPORT_A_DOCUMENT_COMMENT_FAILURE:
      return { ...state, isHaveReported: false };

    //resolve    
    case RESOLVE_A_DOCUMENT_COMMENT_RESET:
      return { ...state, isHaveResolved: false };
    case RESOLVE_A_DOCUMENT_COMMENT_SUCCESS:
      return { ...state, isHaveResolved: true };
    case RESOLVE_A_DOCUMENT_COMMENT_FAILURE:
      return { ...state, isHaveResolved: false };

    //resolve    
    case GET_REPORTED_DOCUMENT_COMMENTS_REQUEST:
      return {
        ...state, reportedDocumentComments: {
          ...state.documentReportedCommentWithStateDTOs,
          isLoading: true
        }
      };
    case GET_REPORTED_DOCUMENT_COMMENTS_SUCCESS:
      return {
        ...state, reportedDocumentComments: {
          isLoading: false,
          data: action.payload.documentReportedCommentWithStateDTOs,
          totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
          totalElements: action.payload.totalElements ? action.payload.totalElements : 0
        }
      };
    case GET_REPORTED_DOCUMENT_COMMENTS_FAILURE:
      return {
        ...state, reportedDocumentComments: {
          isLoading: false,
          data: [],
          totalPages: 1,
          totalElements: 0
        }
      };
    //report
    default:
      return state;
  }
}

export default CommentReducer;
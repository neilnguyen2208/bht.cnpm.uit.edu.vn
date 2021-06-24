
import {
  GET_A_POST_COMMENTS_SUCCESS,
  GET_A_POST_COMMENTS_REQUEST,
  GET_A_POST_COMMENTS_FAILURE,
  EDIT_A_POST_COMMENT_RESET,
  EDIT_A_POST_COMMENT_SUCCESS,
  EDIT_A_POST_COMMENT_FAILURE,
  CREATE_A_POST_COMMENT_SUCCESS,
  CREATE_A_POST_COMMENT_RESET,
  CREATE_A_POST_COMMENT_FAILURE,
  LIKE_A_POST_COMMENT_REQUEST,
  LIKE_A_POST_COMMENT_SUCCESS,
  LIKE_A_POST_COMMENT_FAILURE,
  UNLIKE_A_POST_COMMENT_REQUEST,
  UNLIKE_A_POST_COMMENT_SUCCESS,
  UNLIKE_A_POST_COMMENT_FAILURE,
  DELETE_A_POST_COMMENT_RESET,
  DELETE_A_POST_COMMENT_SUCCESS,
  DELETE_A_POST_COMMENT_FAILURE,
  REPORT_A_POST_COMMENT_SUCCESS,
  REPORT_A_POST_COMMENT_RESET,
  REPORT_A_POST_COMMENT_FAILURE,
  RESOLVE_A_POST_COMMENT_RESET,
  RESOLVE_A_POST_COMMENT_FAILURE,
  RESOLVE_A_POST_COMMENT_SUCCESS,
  CREATE_A_POST_COMMENT_REPLY_FAILURE,
  CREATE_A_POST_COMMENT_REPLY_SUCCESS,
  CREATE_A_POST_COMMENT_REPLY_RESET, 

  GET_REPORTED_POST_COMMENTS_REQUEST,
  GET_REPORTED_POST_COMMENTS_SUCCESS,
  GET_REPORTED_POST_COMMENTS_FAILURE,
} from "../constants.js"

const initialState = {
  currentPostComments: {
    isLoading: false,
    isLoadDone: false,
    data: [],
    totalPages: 5,
    totalElements: 23,
  },
  reportedPostComments: {
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
    case GET_A_POST_COMMENTS_REQUEST:
      return {
        ...state,
        currentPostComments: {
          ...state.currentPostComments,
          isLoading: true
        }
      }
    case GET_A_POST_COMMENTS_SUCCESS:
      return {
        ...state, currentPostComments: {
          isLoading: false,
          data: action.payload.postCommentDTOs,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements
        }
      };

    case GET_A_POST_COMMENTS_FAILURE: return {
      ...state
    }

    case CREATE_A_POST_COMMENT_RESET: return {
      ...state, isHaveCreated: false,
    }

    case CREATE_A_POST_COMMENT_SUCCESS:
      return {
        ...state, isHaveCreated: true,
        createdCommentId: action.payload,
      }

    // maybe use internal state to handle
    case CREATE_A_POST_COMMENT_FAILURE: return {
      ...state, isHaveCreated: false,
      createdCommentId: null,
    }

    case CREATE_A_POST_COMMENT_REPLY_RESET: return {
      ...state,
      isHaveCreated: false,
    }

    case CREATE_A_POST_COMMENT_REPLY_SUCCESS:
      return {
        ...state,
        isHaveCreated: true,
        createdCommentId: action.payload,
      }

    case CREATE_A_POST_COMMENT_REPLY_FAILURE: return {
      ...state, isHaveCreated: false,
      createdCommentId: null,
    }

    //like post comment
    case LIKE_A_POST_COMMENT_REQUEST:
      return { ...state, likePost: { isLoading: true } }//use for all post item
    case LIKE_A_POST_COMMENT_SUCCESS:
      return { ...state, likePost: { isLoading: false } }
    case LIKE_A_POST_COMMENT_FAILURE:
      return { ...state, likePost: { isLoading: false } }

    //unlike post
    case UNLIKE_A_POST_COMMENT_REQUEST:
      return { ...state, unLikePost: { isLoading: true } } //true when any post is in the like request
    case UNLIKE_A_POST_COMMENT_SUCCESS:
      return { ...state, unLikePost: { isLoading: false } } //sau nay xu ly sau
    case UNLIKE_A_POST_COMMENT_FAILURE:
      return { ...state, unLikePost: { isLoading: false } };

    //delete
    case DELETE_A_POST_COMMENT_RESET:
      return {
        ...state, isHaveDeleted: false
      };
    case DELETE_A_POST_COMMENT_SUCCESS:
      return {
        ...state, isHaveDeleted: true
      };
    case DELETE_A_POST_COMMENT_FAILURE:
      return {
        ...state, isHaveDeleted: false
      };

    //edit post
    case EDIT_A_POST_COMMENT_RESET:
      return {
        ...state, isHaveEdited: false
      };
    case EDIT_A_POST_COMMENT_SUCCESS:
      return {
        ...state, isHaveEdited: true
      };
    case EDIT_A_POST_COMMENT_FAILURE:
      return {
        ...state, isHaveEdited: false
      };

    //report
    case REPORT_A_POST_COMMENT_RESET:
      return { ...state, isHaveReported: false };
    case REPORT_A_POST_COMMENT_SUCCESS:
      return { ...state, isHaveReported: true };
    case REPORT_A_POST_COMMENT_FAILURE:
      return { ...state, isHaveReported: false };

    //resolve    
    case RESOLVE_A_POST_COMMENT_RESET:
      return { ...state, isHaveResolved: false };
    case RESOLVE_A_POST_COMMENT_SUCCESS:
      return { ...state, isHaveResolved: true };
    case RESOLVE_A_POST_COMMENT_FAILURE:
      return { ...state, isHaveResolved: false };

    //resolve    
    case GET_REPORTED_POST_COMMENTS_REQUEST:
      return {
        ...state, reportedPostComments: {
          ...state.postReportedCommentWithStateDTOs,
          isLoading: true
        }
      };
    case GET_REPORTED_POST_COMMENTS_SUCCESS:
      return {
        ...state, reportedPostComments: {
          isLoading: false,
          data: action.payload.postReportedCommentWithStateDTOs,
          totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
          totalElements: action.payload.totalElements ? action.payload.totalElements : 0
        }
      };
    case GET_REPORTED_POST_COMMENTS_FAILURE:
      return {
        ...state, reportedPostComments: {
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
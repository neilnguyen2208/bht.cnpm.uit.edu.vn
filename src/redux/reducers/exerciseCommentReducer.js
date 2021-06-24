
import {
  GET_AN_EXERCISE_COMMENTS_SUCCESS,
  GET_AN_EXERCISE_COMMENTS_REQUEST,
  GET_AN_EXERCISE_COMMENTS_FAILURE,
  EDIT_AN_EXERCISE_COMMENT_RESET,
  EDIT_AN_EXERCISE_COMMENT_SUCCESS,
  EDIT_AN_EXERCISE_COMMENT_FAILURE,
  CREATE_AN_EXERCISE_COMMENT_SUCCESS,
  CREATE_AN_EXERCISE_COMMENT_RESET,
  CREATE_AN_EXERCISE_COMMENT_FAILURE,
  LIKE_AN_EXERCISE_COMMENT_REQUEST,
  LIKE_AN_EXERCISE_COMMENT_SUCCESS,
  LIKE_AN_EXERCISE_COMMENT_FAILURE,
  UNLIKE_AN_EXERCISE_COMMENT_REQUEST,
  UNLIKE_AN_EXERCISE_COMMENT_SUCCESS,
  UNLIKE_AN_EXERCISE_COMMENT_FAILURE,
  DELETE_AN_EXERCISE_COMMENT_RESET,
  DELETE_AN_EXERCISE_COMMENT_SUCCESS,
  DELETE_AN_EXERCISE_COMMENT_FAILURE,
  REPORT_AN_EXERCISE_COMMENT_SUCCESS,
  REPORT_AN_EXERCISE_COMMENT_RESET,
  REPORT_AN_EXERCISE_COMMENT_FAILURE,
  RESOLVE_AN_EXERCISE_COMMENT_RESET,
  RESOLVE_AN_EXERCISE_COMMENT_FAILURE,
  RESOLVE_AN_EXERCISE_COMMENT_SUCCESS,
  CREATE_AN_EXERCISE_COMMENT_REPLY_FAILURE,
  CREATE_AN_EXERCISE_COMMENT_REPLY_SUCCESS,
  CREATE_AN_EXERCISE_COMMENT_REPLY_RESET,

  GET_REPORTED_EXERCISE_COMMENTS_REQUEST,
  GET_REPORTED_EXERCISE_COMMENTS_SUCCESS,
  GET_REPORTED_EXERCISE_COMMENTS_FAILURE,
} from "../constants.js"

const initialState = {
  currentExerciseComments: {
    isLoading: false,
    isLoadDone: false,
    data: [],
    totalPages: 5,
    totalElements: 23,
  },
  reportedExerciseComments: {
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

function ExerciseCommentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AN_EXERCISE_COMMENTS_REQUEST:
      return {
        ...state,
        currentExerciseComments: {
          ...state.currentExerciseComments,
          isLoading: true
        }
      }
    case GET_AN_EXERCISE_COMMENTS_SUCCESS:
      return {
        ...state, currentExerciseComments: {
          isLoading: false,
          data: action.payload.postCommentDTOs,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements
        }
      };

    case GET_AN_EXERCISE_COMMENTS_FAILURE: return {
      ...state
    }

    case CREATE_AN_EXERCISE_COMMENT_RESET: return {
      ...state, isHaveCreated: false,
    }

    case CREATE_AN_EXERCISE_COMMENT_SUCCESS:
      return {
        ...state, isHaveCreated: true,
        createdCommentId: action.payload,
      }

    // maybe use internal state to handle
    case CREATE_AN_EXERCISE_COMMENT_FAILURE: return {
      ...state, isHaveCreated: false,
      createdCommentId: null,
    }

    case CREATE_AN_EXERCISE_COMMENT_REPLY_RESET: return {
      ...state,
      isHaveCreated: false,
    }

    case CREATE_AN_EXERCISE_COMMENT_REPLY_SUCCESS:
      return {
        ...state,
        isHaveCreated: true,
        createdCommentId: action.payload,
      }

    case CREATE_AN_EXERCISE_COMMENT_REPLY_FAILURE: return {
      ...state, isHaveCreated: false,
      createdCommentId: null,
    }

    //like post comment
    case LIKE_AN_EXERCISE_COMMENT_REQUEST:
      return { ...state, likeExercise: { isLoading: true } }//use for all post item
    case LIKE_AN_EXERCISE_COMMENT_SUCCESS:
      return { ...state, likeExercise: { isLoading: false } }
    case LIKE_AN_EXERCISE_COMMENT_FAILURE:
      return { ...state, likeExercise: { isLoading: false } }

    //unlike post
    case UNLIKE_AN_EXERCISE_COMMENT_REQUEST:
      return { ...state, unLikeExercise: { isLoading: true } } //true when any post is in the like request
    case UNLIKE_AN_EXERCISE_COMMENT_SUCCESS:
      return { ...state, unLikeExercise: { isLoading: false } } //sau nay xu ly sau
    case UNLIKE_AN_EXERCISE_COMMENT_FAILURE:
      return { ...state, unLikeExercise: { isLoading: false } };

    //delete
    case DELETE_AN_EXERCISE_COMMENT_RESET:
      return {
        ...state, isHaveDeleted: false
      };
    case DELETE_AN_EXERCISE_COMMENT_SUCCESS:
      return {
        ...state, isHaveDeleted: true
      };
    case DELETE_AN_EXERCISE_COMMENT_FAILURE:
      return {
        ...state, isHaveDeleted: false
      };

    //edit post
    case EDIT_AN_EXERCISE_COMMENT_RESET:
      return {
        ...state, isHaveEdited: false
      };
    case EDIT_AN_EXERCISE_COMMENT_SUCCESS:
      return {
        ...state, isHaveEdited: true
      };
    case EDIT_AN_EXERCISE_COMMENT_FAILURE:
      return {
        ...state, isHaveEdited: false
      };

    //report
    case REPORT_AN_EXERCISE_COMMENT_RESET:
      return { ...state, isHaveReported: false };
    case REPORT_AN_EXERCISE_COMMENT_SUCCESS:
      return { ...state, isHaveReported: true };
    case REPORT_AN_EXERCISE_COMMENT_FAILURE:
      return { ...state, isHaveReported: false };

    //resolve    
    case RESOLVE_AN_EXERCISE_COMMENT_RESET:
      return { ...state, isHaveResolved: false };
    case RESOLVE_AN_EXERCISE_COMMENT_SUCCESS:
      return { ...state, isHaveResolved: true };
    case RESOLVE_AN_EXERCISE_COMMENT_FAILURE:
      return { ...state, isHaveResolved: false };

    //resolve    
    case GET_REPORTED_EXERCISE_COMMENTS_REQUEST:
      return {
        ...state, reportedExerciseComments: {
          ...state.postReportedCommentWithStateDTOs,
          isLoading: true
        }
      };
    case GET_REPORTED_EXERCISE_COMMENTS_SUCCESS:
      return {
        ...state, reportedExerciseComments: {
          isLoading: false,
          data: action.payload.postReportedCommentWithStateDTOs,
          totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
          totalElements: action.payload.totalElements ? action.payload.totalElements : 0
        }
      };
    case GET_REPORTED_EXERCISE_COMMENTS_FAILURE:
      return {
        ...state, reportedExerciseComments: {
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

export default ExerciseCommentReducer;
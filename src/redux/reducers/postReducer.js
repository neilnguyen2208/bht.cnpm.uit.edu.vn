import {
    APPROVE_A_POST_RESET,
    APPROVE_A_POST_SUCCESS,
    APPROVE_A_POST_FAILURE,

    REJECT_A_POST_RESET,
    REJECT_A_POST_SUCCESS,
    REJECT_A_POST_FAILURE,

    REJECT_AND_FEEDBACK_A_POST_RESET,
    REJECT_AND_FEEDBACK_A_POST_SUCCESS,
    REJECT_AND_FEEDBACK_A_POST_FAILURE,

    //post
    GET_POST_BY_ID_SUCCESS,
    GET_POST_BY_ID_FAILURE,
    GET_POST_BY_ID_RESET,

    //my post
    GET_MY_POSTS_REQUEST,
    GET_MY_POSTS_SUCCESS,
    GET_MY_POSTS_FAILURE,

    //management post
    GET_MANAGEMENT_POSTS_REQUEST,
    GET_MANAGEMENT_POSTS_SUCCESS,
    GET_MANAGEMENT_POSTS_FAILURE,

    //search post 
    GET_POST_SEARCH_REQUEST,
    GET_POST_SEARCH_SUCCESS,
    GET_POST_SEARCH_FAILURE,

    //like post
    LIKE_A_POST_REQUEST,
    UNLIKE_A_POST_REQUEST,
    LIKE_A_POST_SUCCESS,
    UNLIKE_A_POST_SUCCESS,
    LIKE_A_POST_FAILURE,
    UNLIKE_A_POST_FAILURE,

    SAVE_A_POST_RESET,
    UNSAVE_A_POST_RESET,
    SAVE_A_POST_SUCCESS,
    UNSAVE_A_POST_SUCCESS,
    SAVE_A_POST_FAILURE,
    UNSAVE_A_POST_FAILURE,

    DELETE_A_POST_RESET,
    DELETE_A_POST_SUCCESS,
    DELETE_A_POST_FAILURE,

    EDIT_A_POST_RESET,
    EDIT_A_POST_SUCCESS,
    EDIT_A_POST_FAILURE,

    REPORT_A_POST_RESET,
    REPORT_A_POST_SUCCESS,
    REPORT_A_POST_FAILURE,

    GET_PENDING_POSTS_REQUEST,
    GET_PENDING_POSTS_SUCCESS,
    GET_PENDING_POSTS_FAILURE,

    GET_REPORTED_POSTS_REQUEST,
    GET_REPORTED_POSTS_SUCCESS,
    GET_REPORTED_POSTS_FAILURE,

    RESOLVE_A_POST_RESET,
    RESOLVE_A_POST_SUCCESS,
    RESOLVE_A_POST_FAILURE,
    GET_RELATIVE_SAME_AUTHOR_POSTS_RESET,
    GET_RELATIVE_SAME_AUTHOR_POSTS_SUCCESS,
    GET_RELATIVE_SAME_AUTHOR_POSTS_FAILURE,
    GET_RELATIVE_SAME_CATEGORY_POSTS_RESET,
    GET_RELATIVE_SAME_CATEGORY_POSTS_SUCCESS,
    GET_RELATIVE_SAME_CATEGORY_POSTS_FAILURE,

    CREATE_A_POST_RESET,
    CREATE_A_POST_SUCCESS,
    GET_SAVED_POSTS_REQUEST,
    GET_SAVED_POSTS_FAILURE,
    GET_SAVED_POSTS_SUCCESS,
    GET_A_POST_STATISTIC_RESET,
    GET_A_POST_STATISTIC_SUCCESS,
    GET_A_POST_STATISTIC_FAILURE,
    GET_POSTS_BY_FILTER_REQUEST,
    GET_POSTS_BY_FILTER_SUCCESS,
    GET_POSTS_BY_FILTER_FAILURE,
    GET_POSTS_BY_CATEGORY_ID_REQUEST,
    GET_POSTS_BY_CATEGORY_ID_SUCCESS,
    GET_POSTS_BY_CATEGORY_ID_FAILURE,
    GET_TRENDING_POSTS_REQUEST,
    GET_TRENDING_POSTS_FAILURE,
    GET_TRENDING_POSTS_SUCCESS,
    GET_POST_BY_ID_FOR_EDIT_FAILURE,
    GET_POST_BY_ID_FOR_EDIT_REQUEST,
    GET_POST_BY_ID_FOR_EDIT_SUCCESS,
    GET_RELATIVE_DOCUMENTS_TO_A_POST_RESET,
    GET_RELATIVE_DOCUMENTS_TO_A_POST_SUCCESS,
    GET_RELATIVE_DOCUMENTS_TO_A_POST_FAILURE,
    GET_RELATIVE_EXERCISES_TO_A_POST_RESET,
    GET_RELATIVE_EXERCISES_TO_A_POST_SUCCESS,
    GET_RELATIVE_EXERCISES_TO_A_POST_FAILURE,

} from '../constants.js'

const initialState = {
    //for post detail
    currentPost: {
        isLoading: false,
        data: {},
        isLoadDone: false,

    },
    postDetailForEdit: {
        isLoading: false,
        data: {},
        isLoadDone: false,

    },
    sameCategory: {
        isLoadDone: false,
        data: [],
        error: ''
    },
    sameAuthor: {
        isLoadDone: false,
        data: [],
        error: ''
    },

    //action for reload
    isHaveDeleted: false,
    isHaveEdited: false,
    isHaveReported: false,
    isHaveRejected: false,
    isHaveReportedAndFeedbacked: false,
    isHaveApppoved: false,
    isHaveResolved: false,
    isHaveCreated: false,
    isHaveUnsaved: false,
    isHaveSaved: false,
    postStatistic: {
        isLoadDone: false,
        data: {},
        error: ''
    },

    postsByFilter: {
        isLoading: false,
        data: [],
        error: '',
        totalPages: 0,
        totalElements: 0
    },

    //search post: use for search post and post list
    postsList: {
        isLoading: false,
        data: [],
        totalPages: 1,
        totalElements: 0
    },

    savedPosts: {
        isLoading: false,
        data: [],
        totalPages: 1,
        totalElements: 0
    },

    //my posts
    myPosts: {
        isLoading: false,
        data: [],
        totalPages: 1,
        totalElements: 0
    },

    //highlight posts list
    highlightPosts: {
        isLoading: false,
        data: []
    },

    postsListByTag: {
        isLoading: false,
        data: []
    },

    pendingPosts: {
        isLoading: false,
        data: null,
        totalPages: 1,
        totalElements: 0
    },

    reportedPosts: {
        data: [],
        isLoading: false,
        totalPages: 1,
        totalElements: 0
    },

    managementPosts: {
        isLoading: false,
        data: [],
        totalPages: 1,
        totalElements: 0
    },

    postsByCategory: [],

    trendingPosts: {
        isLoading: false,
        data: []
    },

    relativeDocuments: {
        isLoading: false,
        data: [],
        error: ''
    },

    relativeExercises: {
        isLoading: false,
        data: [],
        error: ''
    }
};

function PostReducer(state = initialState, action) {
    switch (action.type) {

        case GET_POST_BY_ID_SUCCESS:
            return {
                ...state, currentPost: { isLoading: false, data: action.payload, isLoadDone: true }
            };
        case GET_POST_BY_ID_FAILURE:
            return { ...state, currentPost: { ...state.currentPost, isLoading: false, isLoadDone: true } };
        case GET_POST_BY_ID_RESET:
            return { ...state, currentPost: { ...state.currentPost, isLoadDone: false } };

        //appvove  
        case APPROVE_A_POST_SUCCESS:
            return { ...state, isHaveApproved: true };
        case APPROVE_A_POST_FAILURE:
            return { ...state, isHaveApproved: false };
        case APPROVE_A_POST_RESET:
            return { ...state, isHaveApproved: false };

        //reject 
        case REJECT_A_POST_SUCCESS:
            return { ...state, isHaveRejected: true };
        case REJECT_A_POST_FAILURE:
            return { ...state, isHaveRejected: false };
        case REJECT_A_POST_RESET:
            return { ...state, isHaveRejected: false };

        case REJECT_AND_FEEDBACK_A_POST_SUCCESS:
            return { ...state, isHaveRejectedAndFeedbacked: true };
        case REJECT_AND_FEEDBACK_A_POST_FAILURE:
            return { ...state, isHaveRejectedAndFeedbacked: false };
        case REJECT_AND_FEEDBACK_A_POST_RESET:
            return { ...state, isHaveRejectedAndFeedbacked: false };

        //my post
        case GET_MY_POSTS_REQUEST:
            return {
                ...state, myPosts: { isLoading: true }
            };
        case GET_MY_POSTS_SUCCESS:
            return {
                ...state, myPosts: {
                    isLoading: false,
                    data: action.payload.postSummaryWithStateDTOs,
                    totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
                    totalElements: action.payload.totalElements ? action.payload.totalElements : 0
                }
            };
        case GET_MY_POSTS_FAILURE:
            return { ...state, myPosts: { isLoading: false, data: [] } };

        //get post search result
        case GET_POST_SEARCH_REQUEST:
            return {
                ...state, postsList: { isLoading: true }
            };
        case GET_POST_SEARCH_SUCCESS:
            {
                return {
                    ...state, postsList: {
                        isLoading: false,
                        data: action.payload.postSummaryWithStateDTOs,
                        totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
                        totalElements: action.payload.totalElements ? action.payload.totalElements : 0
                    }
                }
            }
        case GET_POST_SEARCH_FAILURE:
            return { ...state, postsList: { isLoading: false, data: [] } }

        //get post search result
        case GET_MANAGEMENT_POSTS_REQUEST:
            return {
                ...state, managementPosts: { isLoading: true }
            };
        case GET_MANAGEMENT_POSTS_SUCCESS:
            {
                return {
                    ...state, managementPosts: {
                        isLoading: false,
                        data: action.payload.postSummaryWithStateDTOs,
                        totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
                        totalElements: action.payload.totalElements ? action.payload.totalElements : 0
                    }
                }
            }
        case GET_MANAGEMENT_POSTS_FAILURE:
            return { ...state, managementPosts: { isLoading: false, data: [] } }

        //like post
        case LIKE_A_POST_REQUEST:
            return { ...state, likePost: { isLoading: true } }//use for all post item
        case LIKE_A_POST_SUCCESS:
            return { ...state, likePost: { isLoading: false } }
        case LIKE_A_POST_FAILURE:
            return { ...state, likePost: { isLoading: false } }

        //unlike post
        case UNLIKE_A_POST_REQUEST:
            return { ...state, unLikePost: { isLoading: true } } //true when any post is in the like request
        case UNLIKE_A_POST_SUCCESS:
            return { ...state, unLikePost: { isLoading: false } } //sau nay xu ly sau
        case UNLIKE_A_POST_FAILURE:
            return { ...state, unLikePost: { isLoading: false } };

        //save post
        case SAVE_A_POST_RESET:
        case SAVE_A_POST_FAILURE:
            return { ...state, isHaveSaved: false };//use for all post item
        case SAVE_A_POST_SUCCESS:
            return { ...state, isHaveSaved: true };

        //unsave post
        case UNSAVE_A_POST_RESET:
        case UNSAVE_A_POST_FAILURE:
            return { ...state, isHaveUnsaved: false }; //true when any post is in the save request
        case UNSAVE_A_POST_SUCCESS:
            return { ...state, isHaveUnsaved: true };

        //delete
        case DELETE_A_POST_RESET:
            return {
                ...state, isHaveDeleted: false
            };
        case DELETE_A_POST_SUCCESS:
            return {
                ...state, isHaveDeleted: true
            };
        case DELETE_A_POST_FAILURE:
            return {
                ...state, isHaveDeleted: false
            };

        //edit post
        case EDIT_A_POST_RESET:
            return {
                ...state, isHaveEdited: false
            };
        case EDIT_A_POST_SUCCESS:
            return {
                ...state, isHaveEdited: true
            };
        case EDIT_A_POST_FAILURE:
            return {
                ...state, isHaveEdited: false
            };

        //report
        case REPORT_A_POST_RESET:
            return { ...state, isHaveReported: false };
        case REPORT_A_POST_SUCCESS:
            return { ...state, isHaveReported: true };
        case REPORT_A_POST_FAILURE:
            return { ...state, isHaveReported: false };

        //resolve    
        case RESOLVE_A_POST_RESET:
            return { ...state, isHaveResolved: false };
        case RESOLVE_A_POST_SUCCESS:
            return { ...state, isHaveResolved: true };
        case RESOLVE_A_POST_FAILURE:
            return { ...state, isHaveResolved: false };

        //pending post
        case GET_PENDING_POSTS_REQUEST:
            return {
                ...state, pendingPosts: {
                    ...state.pendingPosts,
                    isLoading: true
                }
            };
        case GET_PENDING_POSTS_SUCCESS:
            return {
                ...state, pendingPosts: {
                    isLoading: false,
                    data: action.payload.postSummaryWithStateDTOs,
                    totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
                    totalElements: action.payload.totalElements ? action.payload.totalElements : 0
                }
            };
        case GET_PENDING_POSTS_FAILURE:
            return {
                ...state, pendingPosts: {
                    isLoading: false,
                    data: null
                }
            };

        case GET_REPORTED_POSTS_REQUEST:
            return {
                ...state, reportedPosts: {
                    ...state.reportedPosts,
                    isLoading: true
                }
            };
        case GET_REPORTED_POSTS_SUCCESS:
            return {
                ...state, reportedPosts: {
                    isLoading: false,
                    data: action.payload.postSummaryWithStateDTOs,
                    totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
                    totalElements: action.payload.totalElements ? action.payload.totalElements : 0
                }
            };
        case GET_REPORTED_POSTS_FAILURE:
            return {
                ...state, reportedPosts: {
                    isLoading: false,
                    data: [],
                    totalPages: 1,
                    totalElements: 0
                }
            };
        case GET_RELATIVE_SAME_AUTHOR_POSTS_RESET:
            return { ...state, sameAuthor: { isLoadDone: false } };
        case GET_RELATIVE_SAME_AUTHOR_POSTS_SUCCESS:
            return {
                ...state, sameAuthor: {
                    isLoadDone: true,
                    data: action.payload,
                    error: ''
                }
            };
        case GET_RELATIVE_SAME_AUTHOR_POSTS_FAILURE:
            return {
                ...state, sameAuthor: {
                    error: action.payload,
                    isLoadDone: true, data: []
                }
            }

        case GET_RELATIVE_SAME_CATEGORY_POSTS_RESET:
            return { ...state, sameCategory: { isLoadDone: false } };
        case GET_RELATIVE_SAME_CATEGORY_POSTS_SUCCESS:
            return {
                ...state, sameCategory: {
                    isLoadDone: true,
                    data: action.payload,
                    error: ''
                }
            };
        case GET_RELATIVE_SAME_CATEGORY_POSTS_FAILURE:
            return {
                ...state, sameCategory: {
                    error: action.payload,
                    isLoadDone: true, data: []
                }
            }

        case CREATE_A_POST_RESET:
            return { ...state, isHaveCreated: false }
        case CREATE_A_POST_SUCCESS:
            return { ...state, isHaveCreated: true }
        case GET_SAVED_POSTS_REQUEST:
            return {
                ...state, savedPosts: { isLoading: true }
            };
        case GET_SAVED_POSTS_SUCCESS:
            {
                return {
                    ...state, savedPosts: {
                        isLoading: false,
                        data: action.payload.postSummaryWithStateDTOs,
                        totalPages: action.payload.totalPages ? action.payload.totalPages : 1,
                        totalElements: action.payload.totalElements ? action.payload.totalElements : 0
                    }
                }
            }
        case GET_SAVED_POSTS_FAILURE:
            return { ...state, savedPosts: { isLoading: false, data: [] } }

        case GET_A_POST_STATISTIC_RESET: return {
            ...state, postStatistic: {
                ...state.postStatistic,
                isLoadDone: false
            }
        }

        case GET_A_POST_STATISTIC_SUCCESS: return {
            ...state, postStatistic: {
                data: action.payload.data,
                isLoadDone: true
            }
        }

        case GET_A_POST_STATISTIC_FAILURE: return {
            ...state, postStatistic: {
                ...state.postStatistic,
                isLoadDone: false,
                error: action.payload
            }
        }

        case GET_POSTS_BY_FILTER_REQUEST: return {
            ...state, postsByFilter: {
                ...state.postsByFilter,
                isLoading: true
            }
        }

        case GET_POSTS_BY_FILTER_SUCCESS:
            return {
                ...state, postsByFilter: {
                    data: action.payload.postSummaryWithStateDTOs,
                    isLoading: false,
                    totalPages: action.payload.totalPages,
                    totalElements: action.payload.totalElements

                }
            }

        case GET_POSTS_BY_FILTER_FAILURE: return {
            ...state, postsByFilter: {
                ...state.postsByFilter,
                isLoading: false,
                error: action.payload
            }
        }

        // case GET_POSTS_BY_CATEGORY_ID_REQUEST: return {
        //     ...state, postsByCategory: [
        //         ...state.postsByCategory,
        //     ]
        // }

        // case GET_POSTS_BY_CATEGORY_ID_SUCCESS:
        //     return {
        //         ...state, postsByFilter: [
        //             ...state.postsByCategory,
        //         ]
        //     }

        // case GET_POSTS_BY_CATEGORY_ID_FAILURE:
        //     return {
        //         ...state, postsByCategory: [
        //             ...state.postsByCategory,
        //         ]
        //     }

        case GET_TRENDING_POSTS_REQUEST: return {
            ...state, trendingPosts: {
                ...state.trendingPosts,
                isLoading: true
            }
        }

        case GET_TRENDING_POSTS_SUCCESS:
            return {
                ...state, trendingPosts: {
                    data: action.payload,
                    isLoading: false

                }
            }

        case GET_TRENDING_POSTS_FAILURE:
            return {
                ...state, trendingPosts: {
                    ...state.trendingPosts,
                    isLoading: false,
                    error: action.payload
                }
            }
        case GET_POST_BY_ID_FOR_EDIT_SUCCESS:
            return {
                ...state,
                postDetailForEdit: { isLoading: false, data: action.payload, isLoadDone: true }
            };
        case GET_POST_BY_ID_FOR_EDIT_FAILURE:
            return {
                ...state,
                postDetailForEdit: { ...state.postDetailForEdit, isLoading: false, isLoadDone: true }
            };
        case GET_POST_BY_ID_FOR_EDIT_REQUEST:
            return {
                ...state,
                postDetailForEdit: { ...state.postDetailForEdit, isLoadDone: false }
            };

        case GET_RELATIVE_DOCUMENTS_TO_A_POST_RESET:
            return { ...state, relativeDocuments: { isLoading: true } };
        case GET_RELATIVE_DOCUMENTS_TO_A_POST_SUCCESS:
            return {
                ...state, relativeDocuments: {
                    isLoading: false,
                    data: action.payload,
                    error: ''
                }
            };
        case GET_RELATIVE_DOCUMENTS_TO_A_POST_FAILURE:
            return {
                ...state, relativeDocuments: {
                    error: action.payload,
                    isLoading: false, data: []
                }
            }

        case GET_RELATIVE_EXERCISES_TO_A_POST_RESET:
            return { ...state, relativeExercises: { isLoading: true } };
        case GET_RELATIVE_EXERCISES_TO_A_POST_SUCCESS:
            return {
                ...state, relativeExercises: {
                    isLoading: false,
                    data: action.payload,
                    error: ''
                }
            };
        case GET_RELATIVE_EXERCISES_TO_A_POST_FAILURE:
            return {
                ...state, relativeExercises: {
                    error: action.payload,
                    isLoading: false, data: []
                }
            }



        default:
            return state;
    }
}

export default PostReducer;

export const HOME_GET_TOP_DOC = "HOME_GET_TOP_DOC";
export const HOME_GET_TOP_DOCUMENT = "HOME_GET_TOP_DOCUMENT";
export const HOME_GET_ACCOUNT_INFO = "HOME_GET_ACCOUNT_INFO";

// doc
//// 1. For writer

//// 2. For reader

// post
//// 1. For writer


//// 2. For reader


// user

//#endregion 

//#region management exclusive constant

//for document
export const GET_ALL_NOT_APPROVED_DOCUMENTS_REQUEST = "GET_ALL_NOT_APPROVED_DOCUMENTS_REQUEST";
export const GET_ALL_NOT_APPROVED_DOCUMENTS_SUCCESS = "GET_ALL_NOT_APPROVED_DOCUMENTS_SUCCESS";
export const GET_ALL_NOT_APPROVED_DOCUMENTS_FAILURE = "GET_ALL_NOT_APPROVED_DOCUMENTS_FAILURE";

export const UPLOAD_DOCUMENT_REQUEST = "UPLOAD_DOCUMENT_REQUEST";
export const UPLOAD_DOCUMENT_SUCCESS = "UPLOAD_DOCUMENT_SUCCESS";
export const UPLOAD_DOCUMENT_FAILURE = "UPLOAD_DOCUMENT_FAILURE";

export const APPROVE_A_DOCUMENT = "APPROVE_A_DOCUMENT";

//#post actions area
export const GET_PENDING_POSTS_REQUEST = "GET_PENDING_POSTS_REQUEST";
export const GET_PENDING_POSTS_SUCCESS = "GET_PENDING_POSTS_SUCCESS";
export const GET_PENDING_POSTS_FAILURE = "GET_PENDING_POSTS_FAILURE";

export const APPROVE_A_POST_RESET = "APPROVE_A_POST_RESET";
export const APPROVE_A_POST_SUCCESS = "APPROVE_A_POST_SUCCESS";
export const APPROVE_A_POST_FAILURE = "APPROVE_A_POST_FAILURE";

export const REJECT_A_POST_RESET = "REJECT_A_POST_RESET";
export const REJECT_A_POST_SUCCESS = "REJECT_A_POST_SUCCESS";
export const REJECT_A_POST_FAILURE = "REJECT_A_POST_FAILURE";

export const REJECT_AND_FEEDBACK_A_POST_RESET = "REJECT_AND_FEEDBACK_A_POST_RESET";
export const REJECT_AND_FEEDBACK_A_POST_SUCCESS = "REJECT_AND_FEEDBACK_A_POST_SUCCESS";
export const REJECT_AND_FEEDBACK_A_POST_FAILURE = "REJECT_AND_FEEDBACK_A_POST_FAILURE";

export const REPORT_A_POST_RESET = "REPORT_A_POST_RESET";
export const REPORT_A_POST_SUCCESS = "REPORT_A_POST_SUCCESS";
export const REPORT_A_POST_FAILURE = "REPORT_A_POST_FAILURE";


//user
export const GET_ALL_USERS = "GET_ALL_USERS"
export const GET_ALL_ROLES = "GET_ALL_ROLES"
// export const 


//#region home 
//highlight posts 
export const GET_HIGHLIGHT_POSTS_LIST_REQUEST = "GET_HIGHLIGHT_POSTS_LIST_REQUEST";
export const GET_HIGHLIGHT_POSTS_LIST_SUCCESS = "GET_HIGHLIGHT_POSTS_LIST_SUCCESS";
export const GET_HIGHLIGHT_POSTS_LIST_FAILURE = "GET_HIGHLIGHT_POSTS_LIST_FAILURE";

//new posts 
export const GET_NEWEST_POSTS_LIST_REQUEST = "GET_NEWEST_POSTS_LIST_REQUEST";
export const GET_NEWEST_POSTS_LIST_SUCCESS = "GET_NEWEST_POSTS_LIST_SUCCESS";
export const GET_NEWEST_POSTS_LIST_FAILURE = "GET_NEWEST_POSTS_LIST_FAILURE";

//amazing documents
export const GET_TRENDING_DOCUMENTS_LIST_REQUEST = "GET_TRENDING_DOCUMENTS_LIST_REQUEST";
export const GET_TRENDING_DOCUMENTS_LIST_SUCCESS = "GET_TRENDING_DOCUMENTS_LIST_SUCCESS";
export const GET_TRENDING_DOCUMENTS_LIST_FAILURE = "GET_TRENDING_DOCUMENTS_LIST_FAILURE";

//new posts 
export const GET_NEWEST_ACTIVITIES_LIST_REQUEST = "GET_NEWEST_ACTIVITIES_LIST_REQUEST";
export const GET_NEWEST_ACTIVITIES_LIST_SUCCESS = "GET_NEWEST_ACTIVITIES_LIST_SUCCESS";
export const GET_NEWEST_ACTIVITIES_LIST_FAILURE = "GET_NEWEST_ACTIVITIES_LIST_FAILURE";
//#endregion

//#region post
//posts list
export const GET_POSTS_LIST_REQUEST = "GET_POSTS_LIST_REQUEST";
export const GET_POSTS_LIST_SUCCESS = "GET_POSTS_LIST_SUCCESS";
export const GET_POSTS_LIST_FAILURE = "GET_POSTS_LIST_FAILURE";

//my posts list:
export const GET_MY_POSTS_REQUEST = "GET_MY_POSTS_REQUEST";
export const GET_MY_POSTS_SUCCESS = "GET_MY_POSTS_SUCCESS";
export const GET_MY_POSTS_FAILURE = "GET_MY_POSTS_FAILURE";


//#endregion

//#region document

//documents list
export const GET_DOCUMENTS_LIST_REQUEST = "GET_DOCUMENTS_LIST_REQUEST";
export const GET_DOCUMENTS_LIST_SUCCESS = "GET_DOCUMENTS_LIST_SUCCESS";
export const GET_DOCUMENTS_LIST_FAILURE = "GET_DOCUMENTS_LIST_FAILURE";

//my documents list:
export const GET_MY_DOCUMENTS_REQUEST = "GET_MY_DOCUMENTS_REQUEST";
export const GET_MY_DOCUMENTS_SUCCESS = "GET_MY_DOCUMENTS_SUCCESS";
export const GET_MY_DOCUMENTS_FAILURE = "GET_MY_DOCUMENTS_FAILURE";

//#region post category

//post category: 
export const GET_POST_CATEGORIES_REQUEST = "GET_POST_CATEGORIES_REQUEST";
export const GET_POST_CATEGORIES_SUCCESS_HAVE_ALL = "GET_POST_CATEGORIES_SUCCESS_HAVE_ALL";
export const GET_POST_CATEGORIES_SUCCESS = "GET_POST_CATEGORIES_SUCCESS";
export const GET_POST_CATEGORIES_FAILURE = "GET_POST_CATEGORIES_FAILURE";

//#endregion

//#region doc category

//doc category: 
export const GET_DOC_CATEGORIES_REQUEST = "GET_DOC_CATEGORIES_REQUEST";
export const GET_DOC_CATEGORIES_SUCCESS = "GET_DOC_CATEGORIES_SUCCESS";
export const GET_DOC_CATEGORIES_FAILURE = "GET_DOC_CATEGORIES_FAILURE";

//#endregion

//#region search pages

//search posts result:
export const GET_POST_SEARCH_REQUEST = "GET_POST_SEARCH_REQUEST";
export const GET_POST_SEARCH_SUCCESS = "GET_POST_SEARCH_SUCCESS";
export const GET_POST_SEARCH_FAILURE = "GET_POST_SEARCH_FAILURE";

//search document result:
export const GET_DOCUMENT_SEARCH_REQUEST = "GET_DOCUMENT_SEARCH_REQUEST";
export const GET_DOCUMENT_SEARCH_SUCCESS = "GET_DOCUMENT_SEARCH_SUCCESS";
export const GET_DOCUMENT_SEARCH_FAILURE = "GET_DOCUMENT_SEARCH_FAILURE";

//tag search result: (in header)
export const GET_TAG_SEARCH_REQUEST = "GET_TAG_SEARCH_REQUEST";
export const GET_TAG_SEARCH_SUCCESS = "GET_TAG_SEARCH_SUCCESS";
export const GET_TAG_SEARCH_FAILURE = "GET_TAG_SEARCH_FAILURE";

//search courses result:
export const GET_COURSE_SEARCH_REQUEST = "GET_COURSE_SEARCH_REQUEST";
export const GET_COURSE_SEARCH_SUCCESS = "GET_COURSE_SEARCH_SUCCESS";
export const GET_COURSE_SEARCH_FAILURE = "GET_COURSE_SEARCH_FAILURE";

//search quick search result (header)
export const GET_QUICK_SEARCH_REQUEST = "GET_QUICK_SEARCH_REQUEST";
export const GET_QUICK_SEARCH_SUCCESS = "GET_QUICK_SEARCH_SUCCESS";
export const GET_QUICK_SEARCH_FAILURE = "GET_QUICK_SEARCH_FAILURE";
export const GET_QUICK_SEARCH_RESET = "GET_QUICK_SEARCH_RESET";
//#endregion

//#region quick search tag for create post and document
export const GET_TAG_QUICK_QUERY_REQUEST = "GET_TAG_QUICK_QUERY_REQUEST";
export const GET_TAG_QUICK_QUERY_SUCCESS = "GET_TAG_QUICK_QUERY_SUCCESS";
export const GET_TAG_QUICK_QUERY_FAILURE = "GET_TAG_QUICK_QUERY_FAILURE";
export const GET_TAG_QUICK_QUERY_RESET = "GET_TAG_QUICK_QUERY_RESET";
//#endregion

//#region create post
export const POST_CREATE_POST_REQUEST = "POST_CREATE_POST_REQUEST";
export const POST_CREATE_POST_SUCCESS = "POST_CREATE_POST_SUCCESS";
export const POST_CREATE_POST_FAILURE = "POST_CREATE_POST_FAILURE";
//#endregion

//#region course list
export const GET_DAI_CUONG_COURSES_LIST_REQUEST = "GET_DAI_CUONG_COURSES_LIST_REQUEST";
export const GET_DAI_CUONG_COURSES_LIST_SUCCESS = "GET_DAI_CUONG_COURSES_LIST_SUCCESS";
export const GET_DAI_CUONG_COURSES_LIST_FAILURE = "GET_DAI_CUONG_COURSES_LIST_FAILURE";

export const GET_CS_NHOM_NGANH_COURSES_LIST_REQUEST = "GET_DAI_CUONG_COURSES_LIST_REQUEST";
export const GET_CS_NHOM_NGANH_COURSES_LIST_SUCCESS = "GET_DAI_CUONG_COURSES_LIST_SUCCESS";
export const GET_CS_NHOM_NGANH_COURSES_LIST_FAILURE = "GET_DAI_CUONG_COURSES_LIST_FAILURE";

export const GET_COURSES_LIST_REQUEST = "GET_DAI_CUONG_COURSES_LIST_REQUEST";
export const GET_COURSES_LIST_SUCCESS = "GET_DAI_CUONG_COURSES_LIST_SUCCESS";
export const GET_COURSES_LIST_FAILURE = "GET_DAI_CUONG_COURSES_LIST_FAILURE";


export const GET_MY_COURSES_REQUEST = "GET_MY_COURSES_REQUEST";
export const GET_MY_COURSES_SUCCESS = "GET_MY_COURSES_SUCCESS";
export const GET_MY_COURSES_FAILURE = "GET_MY_COURSES_FAILURE";

//#endregion

//#region course category
export const GET_COURSE_FALCUTY_CATEGORIES_REQUEST = "GET_COURSE_FALCUTY_CATEGORIES_REQUEST";
export const GET_COURSE_FALCUTY_CATEGORIES_SUCCESS = "GET_COURSE_FALCUTY_CATEGORIES_SUCCESS";
export const GET_COURSE_FALCUTY_CATEGORIES_FAILURE = "GET_COURSE_FALCUTY_CATEGORIES_FAILURE";

//#endregion

export const GET_HEADINGS_LIST_REQUEST = "GET_HEADINGS_LIST_REQUEST";
export const GET_HEADINGS_LIST_SUCCESS = "GET_HEADINGS_LIST_SUCCESS";
export const GET_HEADINGS_LIST_FAILURE = "GET_HEADINGS_LIST_FAILURE";

export const GET_POST_BY_ID_REQUEST = "GET_POST_BY_ID_REQUEST";
export const GET_POST_BY_ID_SUCCESS = "GET_POST_BY_ID_SUCCESS";
export const GET_POST_BY_ID_FAILURE = "GET_POST_BY_ID_FAILURE";
export const GET_POST_BY_ID_RESET = "GET_POST_BY_ID_RESET";

//#region modal constant

export const MODAL_CLOSE = "MODAL_CLOSE";
export const MODAL_OPEN = "MODAL_OPEN";

export const MODAL_BL_CLOSE = "MODAL_BL_CLOSE";
export const MODAL_BL_OPEN = "MODAL_BL_OPEN";


export const MODAL_BIG_CLOSE = "MODAL_BIG_CLOSE";
export const MODAL_BIG_OPEN = "MODAL_BIG_OPEN";

//#region post interactive 
export const LIKE_A_POST_REQUEST = "LIKE_A_POST_REQUEST";
export const LIKE_A_POST_SUCCESS = "UNLIKE_A_POST_SUCCESS";
export const LIKE_A_POST_FAILURE = "UNLIKE_A_POST_FAILURE";

export const UNLIKE_A_POST_REQUEST = "LIKE_A_POST_REQUEST";
export const UNLIKE_A_POST_SUCCESS = "LIKE_A_POST_SUCCESS";
export const UNLIKE_A_POST_FAILURE = "LIKE_A_POST_FAILURE";

export const SAVE_A_POST_SUCCESS = "SAVE_A_POST_SUCCESS";
export const SAVE_A_POST_FAILURE = "SAVE_A_POST_FAILURE";
export const SAVE_A_POST_REQUEST = "SAVE_A_POST_REQUEST";

export const UNSAVE_A_POST_REQUEST = "UNSAVE_A_POST_REQUEST";
export const UNSAVE_A_POST_SUCCESS = "UNSAVE_A_POST_SUCCESS";
export const UNSAVE_A_POST_FAILURE = "UNSAVE_A_POST_FAILURE";

export const DELETE_A_POST_RESET = "DELETE_A_POST_RESET";
export const DELETE_A_POST_SUCCESS = "DELETE_A_POST_SUCCESS";
export const DELETE_A_POST_FAILURE = "DELETE_A_POST_FAILURE";

export const EDIT_A_POST_RESET = "EDIT_A_POST_RESET";
export const EDIT_A_POST_SUCCESS = "EDIT_A_POST_SUCCESS";
export const EDIT_A_POST_FAILURE = "EDIT_A_POST_FAILURE";
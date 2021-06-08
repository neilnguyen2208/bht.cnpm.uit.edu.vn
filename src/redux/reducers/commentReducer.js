
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
  CREATE_A_PC_REPLY_FAILURE,
  CREATE_A_PC_REPLY_SUCCESS,
  CREATE_A_PC_REPLY_RESET,

  GET_COMMENT_REPORT_REASONS_REQUEST,
  GET_COMMENT_REPORT_REASONS_SUCCESS,
  GET_COMMENT_REPORT_REASONS_FAILURE,

} from "../constants.js"

const commentDTOs = [
  {
    id: 1,
    authorName: "Nguyễn Văn Đông",
    idauthorName: 1,
    isContentAuthor: true,
    createdTime: "2021-05-03T03:24:00",
    likeCount: 2,
    isLiked: false,
    replyCount: 5,
    replyArray: [
      {
        id: 8,
        authorName: "Diamondo",
        idauthorName: 3,
        isContentAuthor: false,
        isLiked: false,
        createdTime: "2021-05-03T07:11:06",
        likeCount: 2,
        content: "Sao anh không thử áp dụng cách khác!?"
      },
      {
        id: 7,
        authorName: "Nicolas Tesla",
        idauthorName: 3,
        isContentAuthor: true,
        isLiked: true,
        createdTime: "2021-03-21T07:11:06",
        content: "Like cho bản thân!",
        likeCount: 2,


      }, {
        id: 11,
        authorName: "Diamondo",
        idauthorName: 3,
        isContentAuthor: false,
        isLiked: false,
        createdTime: "2021-03-21T07:11:06",
        content: "Sao anh không thử áp dụng cách khác!?",
        likeCount: 2,

      },
      {
        id: 27,
        authorName: "Nicolas Tesla",
        idauthorName: 3,
        isContentAuthor: true,
        isLiked: true,
        createdTime: "2021-03-21T07:11:06",
        likeCount: 10,
        content: "Đây là cách mà mọi người vẫn dùng á bạn!",

      }, {
        id: 28,
        authorName: "Nicolas Tesla",
        idauthorName: 3,
        isContentAuthor: true,
        isLiked: true,
        likeCount: 10,
        createdTime: "2021-03-21T07:11:06",
        content: "Ukm, ca này khó!"

      }
    ],
    content: `
        <p> <strong><em>T&iacute;nh đ&oacute;ng g&oacute;i (Encapsulation)&nbsp;</em></strong>chỉ đơn giản l& agrave; việc kết hợp & nbsp; một bộ c & aacute; c & nbsp; <strong>dữ liệu (data)</strong> & nbsp; li & ecirc; n quan đến nhau c & ugrave; ng với một bộ c & aacute; c & nbsp; <strong>h&agrave;m/phương thức (functions/methods)</strong> hoạt động tr & ecirc; n c & aacute; c dữ liệu đ & oacute;.Sau đ & oacute; & ldquo; g & oacute; i & rdquo; tất cả v & agrave; o trong một c & aacute; i gọi l & agrave; <strong>lớp (class)</strong>.& nbsp; C & aacute; c thực thể của c & aacute; c class th& igrave; được gọi l & agrave; c & aacute; c & nbsp; <strong>đối tượng (objects)</strong> & nbsp; trong khi & nbsp; <strong>class</strong> & nbsp; giống như một c & ocirc; ng thức được sử dụng để tạo ra c & aacute; c đối tượng đ & oacute;.</p>
      <p><img alt="Encapsulation OOP C++" class="aligncenter lazyautosizes lazyloaded size-full td-animation-stack-type0-2 wp-image-5616" src="https://nguyenvanhieu.vn/wp-content/uploads/2019/12/encapsulation_.png" style="height:295px; width:581px" title="Lập Trình Hướng Đối Tượng Là Gì? 3" /></p>
      <p>Một v&iacute; dụ về t&iacute;nh đ&oacute;ng g&oacute;i</p>`,
  },
  {
    id: 2,
    authorName: "VegKnight",
    idauthorName: 3,
    isContentAuthor: false,
    createdTime: "2021-05-02T07:11:06",
    likeCount: 4,
    isLiked: true,

    replyCount: 2,
    replyArray: [
      {
        id: 1,
        authorName: "VegKnight",
        idauthorName: 3,
        isContentAuthor: false,
        isLiked: false,
        createdTime: "2020-03-21T07:11:06",
        likeCount: 2,
        content: "Nước lọc ngon tuyệt!",
      },
      {
        id: 2,
        authorName: "VegKnight",
        idauthorName: 3,
        isContentAuthor: false,
        isLiked: false,
        createdTime: "2021-03-21T07:11:06",
        likeCount: 10,
        content: "Nước lọc ngon tuyệt!",
      }
    ],
    content: `
      <pre>\nclass connguoi {\nprivate:\n    string ten;\n    int tuoi;\npublic:\n    void input()\n    {\n        cout &lt;&lt; &quot;Nhap Ten: &quot;;\n        fflush(stdin);\n        getline(cin, this-&gt;ten);\n        cout &lt;&lt; &quot;Nhap Tuoi: &quot;;\n        cin &gt;&gt; tuoi;\n    }\n    void output()\n    {\n        cout &lt;&lt; &quot;Ten: &quot; &lt;&lt; this-&gt;ten &lt;&lt; endl;\n        cout &lt;&lt; &quot;Tuoi: &quot; &lt;&lt; this-&gt;tuoi &lt;&lt; endl;\n    }\n};</pre>\n
      `
  },
]

const initialState = {
  currentPostComments: {
    isLoading: false,
    isLoadDone: false,
    data: commentDTOs,
    totalPages: 5,
    totalElements: 23,
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

    case CREATE_A_PC_REPLY_RESET: return {
      ...state,
      isHaveCreated: false,
    }

    case CREATE_A_PC_REPLY_SUCCESS:
      return {
        ...state,
        isHaveCreated: true,
        createdCommentId: action.payload,
      }

    case CREATE_A_PC_REPLY_FAILURE: return {
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

    //report
    default:
      return state;
  }
}

export default CommentReducer;
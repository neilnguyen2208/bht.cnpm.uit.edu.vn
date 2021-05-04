
import {
  GET_A_POST_COMMENTS_REQUEST,
  GET_A_POST_COMMENTS_SUCCESS,
  GET_A_POST_COMMENTS_FAILURE

} from "../constants.js"

const commentDTOs = [
  {
    id: 1,
    cmtAuthorName: "Nguyễn Văn Đông",
    idCmtAuthorName: 1,
    isContentAuthor: true,
    createdTime: "2021-05-03T03:24:00",
    likeCount: 2,
    isLiked: false,

    replyCount: 5,
    replyArray: [
      {
        id: 8,
        cmtAuthorName: "Diamondo",
        idCmtAuthorName: 3,
        isContentAuthor: false,
        isLiked: false,
        createdTime: "2021-05-03T07:11:06",
        likeCount: 2,

        content: "Sao anh không thử áp dụng cách khác!?"
      },
      {
        id: 7,
        cmtAuthorName: "Nicolas Tesla",
        idCmtAuthorName: 3,
        isContentAuthor: true,
        isLiked: true,
        createdTime: "2021-03-21T07:11:06",
        content: "Like cho bản thân!",
        likeCount: 2,


      }, {
        id: 11,
        cmtAuthorName: "Diamondo",
        idCmtAuthorName: 3,
        isContentAuthor: false,
        isLiked: false,
        createdTime: "2021-03-21T07:11:06",
        content: "Sao anh không thử áp dụng cách khác!?",
        likeCount: 2,

      },
      {
        id: 27,
        cmtAuthorName: "Nicolas Tesla",
        idCmtAuthorName: 3,
        isContentAuthor: true,
        isLiked: true,
        createdTime: "2021-03-21T07:11:06",
        likeCount: 10,
        content: "Like cho bản thân!",

      }, {
        id: 27,
        cmtAuthorName: "Nicolas Tesla",
        idCmtAuthorName: 3,
        isContentAuthor: true,
        isLiked: true,
        likeCount: 10,
        createdTime: "2021-03-21T07:11:06",
        content: "Like cho bản thân!"

      }
    ],

    content: `
        <p> <strong><em>T&iacute;nh đ&oacute;ng g&oacute;i (Encapsulation)&nbsp;</em></strong>chỉ đơn giản l& agrave; việc kết hợp & nbsp; một bộ c & aacute; c & nbsp; <strong>dữ liệu (data)</strong> & nbsp; li & ecirc; n quan đến nhau c & ugrave; ng với một bộ c & aacute; c & nbsp; <strong>h&agrave;m/phương thức (functions/methods)</strong> hoạt động tr & ecirc; n c & aacute; c dữ liệu đ & oacute;.Sau đ & oacute; & ldquo; g & oacute; i & rdquo; tất cả v & agrave; o trong một c & aacute; i gọi l & agrave; <strong>lớp (class)</strong>.& nbsp; C & aacute; c thực thể của c & aacute; c class th& igrave; được gọi l & agrave; c & aacute; c & nbsp; <strong>đối tượng (objects)</strong> & nbsp; trong khi & nbsp; <strong>class</strong> & nbsp; giống như một c & ocirc; ng thức được sử dụng để tạo ra c & aacute; c đối tượng đ & oacute;.</p>
      <p><img alt="Encapsulation OOP C++" class="aligncenter lazyautosizes lazyloaded size-full td-animation-stack-type0-2 wp-image-5616" src="https://nguyenvanhieu.vn/wp-content/uploads/2019/12/encapsulation_.png" style="height:295px; width:581px" title="Lập Trình Hướng Đối Tượng Là Gì? 3" /></p>
      <p>Một v&iacute; dụ về t&iacute;nh đ&oacute;ng g&oacute;i</p>`,

  },
  {
    id: 2,
    cmtAuthorName: "VegKnight",
    idCmtAuthorName: 3,
    isContentAuthor: false,
    createdTime: "2021-05-02T07:11:06",
    likeCount: 4,
    isLiked: true,

    replyCount: 2,
    replyArray: [
      {
        id: 1,
        cmtAuthorName: "VegKnight",
        idCmtAuthorName: 3,
        isContentAuthor: false,
        isLiked: false,
        createdTime: "2020-03-21T07:11:06",
        likeCount: 2,
        content: "Nước lọc ngon tuyệt!", 
      },
      {
        id: 2,
        cmtAuthorName: "VegKnight",
        idCmtAuthorName: 3,
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

  }
]

const initialState = {
  currentPostComments: {
    isLoadDone: false,
    data: commentDTOs,
    totalPages: 1,
    totalElements: 23,
  }
}

function CommentReducer(state = initialState, action) {
  switch (action.type) {
    // case GET_A_POST_COMMENTS_SUCCESS:
    // return { ...state, currentPostComments: { isLoadDone: false, data: action.payload.data, pageCount: 0, totalElement: 0 } };

    default:
      return state;
  }
}

export default CommentReducer;
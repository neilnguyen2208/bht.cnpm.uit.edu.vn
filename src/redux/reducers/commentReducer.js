
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
  
        },
        {
  
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
      createdTime: "20:20:10",
      likeCount: 4,
      isLiked: false,
  
      replyCount: 2,
      replyArray: [
        {
  
        },
        {
  
        }
      ],
  
      content: `Trong lập trình hướng đối tượng và cụ thể là trong ngôn ngữ C++ thì tính đa hình chỉ có 2 dạng thôi, không phải 3 như tác giả đã nói.`
  
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
import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'
import edit_icon from 'assets/icons/24x24/nb_gray_write_icon_24x24.png'
import report_icon from 'assets/icons/24x24/report_icon_24x24.png'
import { Post, PostCommentAction } from 'authentication/permission.config'

const commentMenu = [
  {
    id: 1,
    text: "Report",
    icon: report_icon,
    value: "REPORT_COMMENT",
    permissions: [Post.Comment.Report], //base on permission
    showOnPermission: false,
    requiredAction: PostCommentAction.Report
  },
  {
    id: 2,
    text: "Xoá",
    icon: trash_icon,
    value: "DELETE_COMMENT",
    permissions: [],
    showOnPermission: false,
    showOnAction: true,
    requiredAction: PostCommentAction.Delete
  },
  {
    id: 3,
    text: "Chỉnh sửa",
    icon: edit_icon,
    value: "EDIT_COMMENT",
    permissions: [],
    showOnPermission: false,
    showOnAction: true,
    requiredAction: PostCommentAction.Update
  },
]

export default commentMenu;


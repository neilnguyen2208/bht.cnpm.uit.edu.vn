import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'
import edit_icon from 'assets/icons/24x24/nb_gray_write_icon_24x24.png'
import report_icon from 'assets/icons/24x24/report_icon_24x24.png'
import pin_icon from 'assets/icons/24x24/pinned_icon_24x24.png'
import unpin_icon from 'assets/icons/24x24/unpinned_icon_24x24.png'
import stick_to_top from 'assets/icons/24x24/stick_to_top_icon_24x24.png'
import { Post, PostAction } from 'authentication/permission.config'

export const basicMenu = [
  {
    id: 1,
    text: "Report",
    icon: report_icon,
    value: "REPORT_POST",
    permissions: [Post.Comment.Report], //base on permission
  },
  {
    id: 2,
    text: "Xoá",
    icon: trash_icon,
    value: "DELETE_POST",
    permissions: [],
    showOnPermission: false,
    showOnAction: true,
    requiredAction: PostAction.Delete
  },
  {
    id: 3,
    text: "Chỉnh sửa",
    icon: edit_icon,
    value: "EDIT_POST",
    permissions: [],
    showOnPermission: false,
    showOnAction: true,
    requiredAction: PostAction.Update
  },

]

export const adminMenu = [
  ...basicMenu,
  {
    id: 4, text: "Ghim nội dung", value: "HIGHLIGHT_POST", icon: pin_icon, tip: "Hiển thị ở trang chủ.",
    style: {
      height: "26px",
      paddingTop: "1px",
      paddingBottom: "5px"
    },
    permissions: [],
    showOnPermission: false,
    showOnAction: true,
    requiredAction: PostAction.Highlight
  },
  {
    id: 5, text: "Bỏ ghim", value: "UNHIGHLIGHT_POST", icon: unpin_icon,
    style: {
      height: "26px",
      paddingTop: "1px",
      paddingBottom: "5px"
    },
    showOnAction: true,
    permissions: [],
    showOnPermission: false,
    requiredAction: PostAction.Unhighlight
  },
  {
    id: 6, text: "Ghim lên đầu", value: "STICK_TO_TOP_POST", icon: stick_to_top,
    style: {
      height: "26px",
      paddingTop: "1px",
      paddingBottom: "5px"
    },
    showOnAction: true,
    showOnPermission: false,
    permissions: [],
    requiredAction: PostAction.StickToTop
  },
]
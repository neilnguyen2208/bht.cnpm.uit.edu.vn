import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'
import edit_icon from 'assets/icons/24x24/nb_gray_write_icon_24x24.png'
import report_icon from 'assets/icons/24x24/report_icon_24x24.png'
import pin_icon from 'assets/icons/24x24/pinned_icon_24x24.png'
import unpin_icon from 'assets/icons/24x24/unpinned_icon_24x24.png'
import stick_to_top from 'assets/icons/24x24/stick_to_top_icon_24x24.png'

export const itemType = { approval: "APPROVAL", normal: "NORMAL", mySelf: "MYSELF", report: "REPORT", management: "MANAGEMENT" }
export const componentType = { document: "DOCUMENT", post: "POST" }
export const approvalStatus = { pending: "PENDING_APPROVAL", rejected: "REJECTED", waitingForFeedback: "PENDING_FIX" }
export const resolveType = { keep: "KEEP", delete: "DELETE" }
export const resolveStatus = { resolved: "RESOLVED", notResolved: "NOT_RESOLVED" }
export const courseContentType = { video: "VIDEO", artical: "ARTICAL", exercise: "EXERCISE" };
export const detailType = { preview: "PREVIEW", normal: "NORMAL" }
export const docReactionType = { like: "LIKE", dislike: "DISLIKE", none: "NONE" }

export const RECAPTCHA_CLIENT_SIDE_KEY = "6Lfz648aAAAAADzC-bW2K8CXpQ8ZEJETupqfHBe8";

export const userApproveStatusOptions = [
  { id: 1, name: "Tất cả", postState: "" },
  { id: 2, name: "Đã duyệt", postState: "APPROVED" },
  { id: 3, name: "Chưa duyệt", postState: "PENDING_APPROVAL" },
  { id: 4, name: "Cần xem lại", postState: "PENDING_FIX" }
];

export const adminApproveStatusOptions = [
  { id: 1, name: "Tất cả", postState: "" },
  { id: 2, name: "Đã duyệt", postState: "APPROVED" },
  { id: 3, name: "Chưa duyệt", postState: "PENDING_APPROVAL" }
];

export const sS = sessionStorage;

export const publishedTimeOptions = [
  { id: 1, name: "Mới nhất", sort: "DESC" },
  { id: 2, name: "Cũ nhất", sort: "ASC" }
]

export const requestedTimeOptions = [
  { id: 1, name: "Mới nhất", sort: "publishDtm,desc" },
  { id: 2, name: "Cũ nhất", sort: "publishDtm,asc" }
]

export const mySelfMenuItemList = [
  { id: 1, text: "Xoá", value: "DELETE_POST", icon: trash_icon, tip: "Không cần duyệt.", hasLine: true },
  { id: 2, text: "Chỉnh sửa", value: "EDIT_POST", icon: edit_icon, tip: "Cần chờ kiểm duyệt." },
  {
    id: 3, text: "Report", value: "REPORT_POST", icon: report_icon,
    style: {
      height: "26px",
      paddingTop: "3px",
      paddingBottom: "3px"
    }
  },
]

export const baseAdminMenuItemList = [
  { id: 1, text: "Xoá", value: "DELETE_POST", icon: trash_icon, tip: "Không cần duyệt.", hasLine: true },
  { id: 2, text: "Chỉnh sửa", value: "EDIT_POST", icon: edit_icon, tip: "Cần chờ kiểm duyệt." },
  {
    id: 3, text: "Report", value: "REPORT_POST", icon: report_icon,
    style: {
      height: "26px",
      paddingTop: "3px",
      paddingBottom: "3px"
    }
  },
]

export const highlightAdminMenuItemList = [
  ...baseAdminMenuItemList,
  {
    id: 4, text: "Ghim nội dung", value: "HIGHLIGHT_POST", icon: pin_icon, tip: "Hiển thị ở trang chủ.",
    style: {
      height: "26px",
      paddingTop: "1px",
      paddingBottom: "5px"
    }
  },
]
export const wallPageAdminActions = [
  {
    id: 4, text: "Bỏ ghim", value: "UNHIGHLIGHT_POST", icon: unpin_icon,
    style: {
      height: "26px",
      paddingTop: "1px",
      paddingBottom: "5px"
    },
    permissions: ["Page.Highlight.Unhighlight"]
  },
  {
    id: 5, text: "Ghim lên đầu", value: "STICK_TO_TOP_POST", icon: stick_to_top,
    style: {
      height: "26px",
      paddingTop: "1px",
      paddingBottom: "5px"
    },
    permissions: ["Page.Highlight.StickToTop"]
  },
]

export const normalMenuItemList = [
  { id: 3, text: "Report", icon: report_icon, value: "REPORT_POST" },
]

export const wallPageAdminMenuItemList = [
  ...normalMenuItemList,
  ...wallPageAdminActions
]

export const unHighlightAdminMenuItemList = [
  ...baseAdminMenuItemList,
  ...wallPageAdminActions
]


//comment
export const commentMenuItems = [
  { id: 1, text: "Report", icon: report_icon, value: "REPORT_COMMENT" },
  { id: 2, text: "Xoá", icon: trash_icon, value: "DELETE_COMMENT" },
  { id: 1, text: "Chỉnh sửa", icon: edit_icon, value: "EDIT_COMMENT" },

]


export const DELAY_TIME = 700;
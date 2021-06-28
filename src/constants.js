import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'
import edit_icon from 'assets/icons/24x24/nb_gray_write_icon_24x24.png'
import report_icon from 'assets/icons/24x24/report_icon_24x24.png'

export const itemType = { approval: "APPROVAL", normal: "NORMAL", mySelf: "MYSELF", report: "REPORT", management: "MANAGEMENT" }
export const componentType = { document: "DOCUMENT", post: "POST" }
export const approvalStatus = { pending: "PENDING_APPROVAL", rejected: "REJECTED", waitingForFeedback: "PENDING_FIX" }
export const resolveType = { keep: "KEEP", delete: "DELETE" }
export const resolveStatus = { resolved: "RESOLVED", notResolved: "NOT_RESOLVED" }
export const exerciseResolveType = { fixed: "FIXED", inProgress: "IN_PROGRESS", rejected: "REJECTED" }
export const exerciseResolveStatus = { fixed: "FIXED", inProgress: "IN_PROGRESS", rejected: "REJECTED" }

export const courseContentType = { video: "VIDEO", artical: "ARTICAL", exercise: "EXERCISE" };
export const detailType = { preview: "PREVIEW", normal: "NORMAL" }
export const docReactionType = { like: "LIKE", dislike: "DISLIKE", none: "NONE" }

export const RECAPTCHA_CLIENT_SIDE_KEY = "6LcENcUaAAAAACyhhPZ8CXHOOMJ-c-TL5LrDxzcc";

export const userApproveStatusOptions = [
  { id: 1, name: "Tất cả", postState: "" },
  { id: 2, name: "Đã duyệt", postState: "APPROVED" },
  { id: 3, name: "Chưa duyệt", postState: "PENDING_APPROVAL" },
  { id: 4, name: "Cần xem lại", postState: "PENDING_FIX" }
];

export const resolveStateOptions = [
  { id: 1, name: "Tất cả", icon: report_icon, value: "REPORT_POST" },
  { id: 2, name: "Chưa xử lý", icon: report_icon, value: "REPORT_POST" },
  { id: 3, name: "Đã xử lý", icon: report_icon, value: "REPORT_POST" },
]

export const exerciseResolveStateOptions = [
  { id: 1, name: "Tất cả", icon: report_icon, value: "EXERCISE_REPORT_ALL" },
  { id: 2, name: "Đang chờ duyệt", icon: report_icon, value: "EXERCISE_REPORT_PENDING" },
  { id: 3, name: "Đang xử lý", icon: report_icon, value: "EXERCISE_REPORT_IN_PROGRESS" },
  { id: 4, name: "Không duyệt", icon: report_icon, value: "EXERCISE_REPORT_REJECTED" },
  { id: 5, name: "Đã xử lý", icon: report_icon, value: "EXERCISE_REPORT_FIXED" },
]

export const adminApproveStatusOptions = [
  { id: 1, name: "Tất cả", postState: "" },
  { id: 2, name: "Đã duyệt", postState: "APPROVED" },
  { id: 3, name: "Chưa duyệt", postState: "PENDING_APPROVAL" }
];

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

export const DELAY_TIME = 700;
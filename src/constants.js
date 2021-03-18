export const itemType = { approval: "APPROVAL", normal: "NORMAL", mySelf: "MY_SELF", report: "REPORT" }
export const componentType = { document: "DOCUMENT", post: "POST" }
export const approvalStatus = { pending: "PENDING_APPROVAL", rejected: "REJECTED", waitingForFeedback: "PENDING_FIX" }
export const resolveType = { keep: "KEEP", delete: "DELETE" }
export const resolveStatus = { resolved: "RESOLVED", notResolved: "NOT_RESOLVED" }
export const courseContentType = { video: "VIDEO", artical: "ARTICAL", exercise: "EXERCISE" };
export const detailType = { preview: "PREVIEW", normal: "NORMAL" }
export const docReactionType = { like: "LIKE", dislike: "DISLIKE", none: "NONE" }

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


export const publishedTimeOptions = [
  { id: 1, name: "Mới nhất", sort: "publishDtm,desc" },
  { id: 2, name: "Cũ nhất", sort: "publishDtm,asc" }
]

export const requestedTimeOptions = [
  { id: 1, name: "Mới nhất", sort: "publishDtm,desc" },
  { id: 2, name: "Cũ nhất", sort: "publishDtm,asc" }
]

export const DELAY_TIME = 700;
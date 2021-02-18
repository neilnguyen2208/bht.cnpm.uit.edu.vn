export const itemType = { approving: "APPROVING", normal: "NORMAL", mySelf: "MY_SELF" }
export const componentType = { document: "DOCUMENT", post: "POST" }
export const approvingStatus = { pending: "PENDING_APPROVAL", rejected: "REJECTED", waitingForFeedback: "PENDING_FIX" }
export const courseContentType = { video: "VIDEO", artical: "ARTICAL", exercise: "EXERCISE" };

export const approveStatusOptions = [
  { id: 1, name: "Tất cả", postState: "" },
  { id: 2, name: "Đã duyệt", postState: "APPROVED" },
  { id: 3, name: "Chưa duyệt", postState: "PENDING_APPROVAL" },
  { id: 4, name: "Cần xem lại", postState: "PENDING_FIX" }
];

export const DELAY_TIME = 700;
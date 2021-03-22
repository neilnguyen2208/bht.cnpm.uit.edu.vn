//#region import
import {
  Account,
  Document,
  Activity,
  Notification,
  Role,
  Category,
  Post,
  User,
  ContentManagement,
  Statistic
} from "utils/permissionUtils";
import Home from 'pages/common/Home/Home'
import AdminLayout from 'layouts/AdminSidebar'
//#endregion

export const logoRouter = { path: "/", exact: true, title: "Trang chủ", label: "", permission: [], component: Home };

export const headerMenuRouters = [
  { path: "/posts", exact: true, title: "Bài viết", label: "BÀI VIẾT", permission: [], },
  { path: "/documents", exact: true, title: "Tài liệu", label: "TÀI LIỆU", permission: [], },
  { path: "/courses", exact: true, title: "Khoá học", label: "KHOÁ HỌC", permission: [], },
  // { path: "/questions", exact: true, title: "Hỏi đáp", label: "HỎI ĐÁP", permission: [], },
  { path: "/admin/post-management", exact: true, title: "Quản lý", label: "QUẢN LÝ", permission: [ContentManagement.Admin], },
  { path: "/collab", exact: true, title: "Cộng tác viên", label: "CỘNG TÁC", permission: [ContentManagement.Collaborator], },
]

export const userRouters = [
  { path: "/user", exact: true, title: "Quản lý người dùng", label: "", permission: [] },
  { path: "/user/update-password", exact: true, title: "Cập nhật mật khẩu", label: "", permission: [] },
  { path: "/user/my-documents", exact: true, title: "Tài liệu của tôi", label: "", permission: [] },
  { path: "/user/my-posts", exact: true, title: "Bài viết của tôi", label: "", permission: [] },
  { path: "/user/notification", exact: true, title: "Thông báo", label: "", permission: [] },
  { path: "/create-post", exact: true, title: "Tạo bài viết", label: "", permision: [] },
  { path: "/upload-document", exact: true, title: "Upload Tài liệu", label: "", permision: [] }
]


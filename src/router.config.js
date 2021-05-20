//#region import
import {

  ContentManagement,
} from "utils/authUtils";
import Home from 'pages/common/Home/Home'
//#endregion

export const logoRouter = { path: "/", exact: true, title: "Trang chủ", label: "", permission: [], component: Home };

export const headerMenuRouters = [
  { id: 1, path: "/posts", exact: true, title: "Bài viết", label: "BÀI VIẾT", permission: [], },
  { id: 2,path: "/documents", exact: true, title: "Tài liệu", label: "TÀI LIỆU", permission: [], },
  { id: 3,path: "/courses", exact: true, title: "Khoá học", label: "KHOÁ HỌC", permission: [], },
  { id: 4,path: "/admin/post-management", exact: true, title: "Quản lý", label: "QUẢN LÝ", permission: [ContentManagement.Admin], },
  { id: 5,path: "/collab", exact: true, title: "Cộng tác viên", label: "CỘNG TÁC", permission: [ContentManagement.Collaborator], },
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


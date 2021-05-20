"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouters = exports.headerMenuRouters = exports.logoRouter = void 0;

var _authUtils = require("utils/authUtils");

var _Home = _interopRequireDefault(require("pages/common/Home/Home"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//#region import
//#endregion
var logoRouter = {
  path: "/",
  exact: true,
  title: "Trang chủ",
  label: "",
  permission: [],
  component: _Home["default"]
};
exports.logoRouter = logoRouter;
var headerMenuRouters = [{
  id: 1,
  path: "/posts",
  exact: true,
  title: "Bài viết",
  label: "BÀI VIẾT",
  permission: []
}, {
  id: 2,
  path: "/documents",
  exact: true,
  title: "Tài liệu",
  label: "TÀI LIỆU",
  permission: []
}, {
  id: 3,
  path: "/courses",
  exact: true,
  title: "Khoá học",
  label: "KHOÁ HỌC",
  permission: []
}, {
  id: 4,
  path: "/admin/post-management",
  exact: true,
  title: "Quản lý",
  label: "QUẢN LÝ",
  permission: [_authUtils.ContentManagement.Admin]
}, {
  id: 5,
  path: "/collab",
  exact: true,
  title: "Cộng tác viên",
  label: "CỘNG TÁC",
  permission: [_authUtils.ContentManagement.Collaborator]
}];
exports.headerMenuRouters = headerMenuRouters;
var userRouters = [{
  path: "/user",
  exact: true,
  title: "Quản lý người dùng",
  label: "",
  permission: []
}, {
  path: "/user/update-password",
  exact: true,
  title: "Cập nhật mật khẩu",
  label: "",
  permission: []
}, {
  path: "/user/my-documents",
  exact: true,
  title: "Tài liệu của tôi",
  label: "",
  permission: []
}, {
  path: "/user/my-posts",
  exact: true,
  title: "Bài viết của tôi",
  label: "",
  permission: []
}, {
  path: "/user/notification",
  exact: true,
  title: "Thông báo",
  label: "",
  permission: []
}, {
  path: "/create-post",
  exact: true,
  title: "Tạo bài viết",
  label: "",
  permision: []
}, {
  path: "/upload-document",
  exact: true,
  title: "Upload Tài liệu",
  label: "",
  permision: []
}];
exports.userRouters = userRouters;
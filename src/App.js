import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "pages/common/Home/Home";
import PostDetail from "pages/common/PostDetail/PostDetail";
import DocumentDetail from "pages/common/DocumentDetail/DocumentDetail";
import Header from "components/common/Header/Header";
import Footer from "components/common/Footer/Footer";
import AdminLayout from 'layouts/AdminSidebar'
import SearchPostByTag from "pages/common/SearchResult/SearchPostByTag";
import ProfilePost from "pages/user/AccountInformation/Profile_Post";
import ProfileDocument from "pages/user/AccountInformation/Profile_Document";

import MyDocuments from "pages/user/MyDocuments/MyDocuments";
import MyPosts from "pages/user/MyPosts/MyPosts";
import SearchTag from "pages/common/SearchResult/SearchTag";
import SearchPost from "pages/common/SearchResult/SearchPost";
import SearchDocument from "pages/common/SearchResult/SearchDocument";
import Exercise from "pages/common/ChapterDetail/Exercise"
import CoursesList from "pages/common/CoursesList/CoursesList"
import ChaptersList from "pages/common/HeadingsList/HeadingsList"
import PostsList from 'pages/common/PostsList/PostsList'
import PostApproving from 'pages/management/PostManagement/PostApproving'
import NotificationManagement from 'pages/management/NotificationManagement/NotificationManagement'
import CategoryManagement from 'pages/management/NotificationManagement/NotificationManagement'
import Statistic from 'pages/management/Statistic/Statistic'
import UserRoleManagement from 'pages/management/UserRoleManagement/UserRoleManagement'
import UserManagement from 'pages/management/UserManagement/UserManagement'
import PostManagement from 'pages/management/PostManagement/PostManagement'
import VerifyRegisterMail from 'pages/common/VerifyEmailPages/VerifyRegisterMail'
import SearchCourses from 'pages/common/SearchResult/SearchCourses'
import UploadDocument from 'pages/user/UploadDocument/UploadDocument'
import CreatePost from 'pages/user/CreatePost/CreatePost'
import ActivityManagement from 'pages/management/ActivityManagement/ActivityManagement'

import CoursesManagement from 'pages/management/CoursesManagement/CoursesManagement'

import MyNotification from 'pages/user/MyActivities/MyActivities'
import PostReportManagement from 'pages/management/PostManagement/PostReportManagement'
import SavedPosts from 'pages/user/MyPosts/SavedPosts'

import DocumentManagement from 'pages/management/DocumentManagement/DocumentManagement'
import DocumentReportManagement from "pages/management/DocumentManagement/DocumentReportManagement";
import DocumentsList from 'pages/common/DocumentsList/DocumentsList'
import DocumentApproving from 'pages/management/DocumentManagement/DocumentApproving'
import SearchDocumentByTag from 'pages/common/SearchResult/SearchDocumentByTag'
// import ForgotPassword from 'pages/authentication/ForgotPassword'
import VerifyMailForgotPassword from 'pages/common/VerifyEmailPages/VerifyMailForgotPassword'
import EmailManagement from 'pages/user/AccountInformation/EmailManagement'
import AccountManagement from "pages/user/AccountInformation/AccountManagement";
import Security from "pages/user/AccountInformation/Sercurity";

// modal
import ModalManager from 'components/common/Modal/ModalManager'
import ModalBLManager from 'components/common/ModalBL/ModalBLManager'
import ModalBigManager from 'components/common/Modal/ModalBigManager'

import RequireLoginRoute from 'components/base_components/RequireLoginRoute'
import Secured from 'components/base_components/Sercured.js'
import { Access } from "authentication/permission.config";
import DocPostDetailLoader from 'components/common/Loader/DocPostDetailLoader'

const App = () => {
    return (
        <div style={{ minWidth: "320px", width: "100%", background: "white" }}>
            <Router>
                <div id="header" style={{ height: "65px" }}></div>

                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />

                        <Route exact path="/posts" component={PostsList} />
                        <Route exact path="/documents" component={DocumentsList} />
                        <Route exact path="/post-content/:id" component={PostDetail} />
                        <Route exact path="/document-content/:id" component={DocumentDetail} />
                        <Route exact path="/courses" component={CoursesList} />
                        <Route exact path="/courses/:id" component={ChaptersList} />
                        <Route path="/search/posts" exact component={SearchPost} />
                        <Route path="/search/documents" exact component={SearchDocument} />
                        <Route path="/search/tags" exact component={SearchTag} />
                        <Route path="/search/courses" exact component={SearchCourses} />

                        {/* Search Tag */}
                        <Route path="/tags/posts/" exact component={SearchPostByTag} />
                        <Route path="/tags/documents/" exact component={SearchDocumentByTag} />

                        {/* user layout */}
                        <Route exact path="/user" component={ProfilePost} />
                        <Route exact path="/user/post" component={ProfilePost} />
                        <Route exact path="/user/document" component={ProfileDocument} />
                        <Route exact path="/user/email-management" component={EmailManagement} />
                        <Route exact path="/user/account-management" component={AccountManagement} />

                        <Route exact path="/user/my-documents" component={MyDocuments} />
                        <Route exact path="/user/my-posts" component={MyPosts} />
                        <Route exact path="/user/saved-posts" component={SavedPosts} />
                        <Route exact path="/create-post" component={CreatePost} />
                        <Route exact path="/user/notification" component={MyNotification} />
                        <Route exact path="/upload-document" component={UploadDocument} />
                        <Route exact path="/courses/:id/exercise" component={Exercise} />

                        {/* for admin */}
                        <RequireLoginRoute exact path="/admin" component={PostManagement} permissions={Access.Admin} />
                        <RequireLoginRoute exact path="/admin/post-management" component={PostManagement} permissions={Access.Admin} />
                        <RequireLoginRoute exact path="/admin/post-management/report" component={PostReportManagement} permissions={Access.Admin} />
                        <RequireLoginRoute exact path="/admin/post-management/approval" component={PostApproving} permissions={Access.Admin} />

                        <Route exact path="/admin/document-management/approval" component={DocumentApproving} />
                        <Route exact path="/admin/document-management" component={DocumentManagement} />
                        <Route exact path="/admin/document-management/report" component={DocumentReportManagement} />

                        <Route exact path="/admin/user-management" component={UserManagement} />
                        <Route exact path="/admin/page-notification" component={NotificationManagement} />
                        <Route exact path="/admin/category-management" component={CategoryManagement} />
                        <Route exact path="/admin/activity-management" component={ActivityManagement} />
                        <Route exact path="/admin/user-role-management" component={UserRoleManagement} />
                        <Route exact path="/admin/user-management/:id" component={AdminLayout} />
                        <Route exact path="/admin/statistic" component={Statistic} />
                        <Route exact path="/admin/courses-management" component={CoursesManagement} />

                        <Route exact path="/user/sercurity" component={Security} />


                        {/* verify email url */}
                        <Route exact path="/verify" component={VerifyRegisterMail} />
                        <Route exact path="/verify-forgot-password" component={VerifyMailForgotPassword} />
                        <Route exact path="/demo-detail-loader" component={DocPostDetailLoader} />
                        <Route exact path="/secured" component={Secured} />
                    </Switch>
                    <Footer />
                </div>
                <Header />
                <div>
                </div>
                <div>
                    <ModalBigManager />
                    <ModalManager />
                    <ModalBLManager />

                </div>
                <div className="App"></div>
            </Router >
        </div >
    );
}

export default App;




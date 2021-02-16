import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "pages/common/Home/Home";
import PostDetail from "pages/common/PostDetail/PostDetail";
import DocumentDetail from "pages/common/DocumentDetail/DocumentDetail";
import Login from "pages/common/Login/Login";
import Register from "pages/common/Register/Register";
import Header from "components/common/Header/Header";
import Footer from "components/common/Footer/Footer";
import SearchTagLayout from "layouts/SearchTagLayout";
import AdminLayout from 'layouts/AdminSidebar'
import SearchPostByTag from "pages/common/SearchResult/SearchPostByTag";
import AccountInformation from "pages/user/AccountInformation/AccountInformation";
import UpdatePassword from "pages/user/AccountInformation/UpdatePassword";
import MyDocumentsList from "pages/user/MyDocumentsList/MyDocumentsList";
import MyPostsList from "pages/user/MyPostsList/MyPostsList";
import SearchTag from "pages/common/SearchResult/SearchTag";
import SearchPost from "pages/common/SearchResult/SearchPost";
import SearchDocument from "pages/common/SearchResult/SearchDocument";
import Artical from "pages/common/ChapterDetail/Artical"
import Exercise from "pages/common/ChapterDetail/Exercise"
import Video from "pages/common/ChapterDetail/Video"
import CoursesList from "pages/common/CoursesList/CoursesList"
import ChaptersList from "pages/common/HeadingsList/HeadingsList"
import PostsList from 'pages/common/PostsList/PostsList'
import DocumentsList from 'pages/common/DocumentsList/DocumentsList'
import PostApproving from 'pages/management/PostApproving/PostApproving'
import DocumentApproving from 'pages/management/DocumentApproving/DocumentApproving'
import NotificationManagement from 'pages/management/NotificationManagement/NotificationManagement'
import CategoryManagement from 'pages/management/NotificationManagement/NotificationManagement'
import Statistic from 'pages/management/Statistic/Statistic'
import UserRoleManagement from 'pages/management/UserRoleManagement/UserRoleManagement'
import UserManagement from 'pages/management/UserManagement/UserManagement'
import PostManagement from 'pages/management/PostManagement/PostManagement'
import AdminSidebar from 'layouts/AdminSidebar'
import SearchCourses from 'pages/common/SearchResult/SearchCourses'
import UploadDocument from 'pages/user/UploadDocument/UploadDocument'
import CreatePost from 'pages/user/CreatePost/CreatePost'
import ActivityManagement from 'pages/management/ActivityManagement/ActivityManagement'
import DocumentManagement from 'pages/management/DocumentManagement/DocumentManagement'
import CoursesManagement from 'pages/management/CoursesManagement/CoursesManagement'
import ModalManager from 'components/common/Modal/ModalManager'
import MyNotification from 'pages/user/MyActivities/MyActivities'

const App = () => {
    return (
        <div style={{ minWidth: "320px", width: "100%", background: "white" }}>
            <ModalManager />
            <Router>
                <Header />
                <div id="header" style={{ height: "65px" }}></div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/posts" component={PostsList} />
                    <Route exact path="/documents" component={DocumentsList} />
                    <Route exact path="/posts/:id" component={PostDetail} />
                    <Route exact path="/documents/:id" component={DocumentDetail} />
                    <Route exact path="/courses" component={CoursesList} />
                    <Route exact path="/courses/:id" component={ChaptersList} />
                    <Route path="/search/posts" exact component={SearchPost} />
                    <Route path="/search/documents" exact component={SearchDocument} />
                    <Route path="/search/tags" exact component={SearchTag} />
                    <Route path="/search/courses" exact component={SearchCourses} />

                    {/* Search Tag */}
                    <Route path="/tags/:id/">
                        <SearchTagLayout>
                            <Switch>
                                <Route exact path="/tags/:id/post" component={SearchPostByTag} />
                            </Switch>
                        </SearchTagLayout>
                    </Route>

                    {/* user layout */}

                    <Route exact path="/user" component={AccountInformation} />
                    <Route exact path="/user/update-password" component={UpdatePassword} />
                    <Route exact path="/user/my-docs" component={MyDocumentsList} />
                    <Route exact path="/user/my-posts" component={MyPostsList} />
                    <Route exact path="/user/saved-posts" component={MyPostsList} />
                    <Route exact path="/create-post" component={CreatePost} />
                    <Route exact path="/user/notification" component={MyNotification} />
                    <Route exact path="/upload-doc" component={UploadDocument} />
                    <Route exact path="/courses/:id/artical" component={Artical} />
                    <Route exact path="/courses/:id/video" component={Video} />
                    <Route exact path="/courses/:id/exercise" component={Exercise} />

                    {/* for admin only */}

                    {/* Admin and collab page content admin */}
                    <Route exact path="/admin-sidebar" component={AdminSidebar} />

                    {/* for admin */}
                    <Route exact path="/admin/post-approving" component={PostApproving} />
                    <Route exact path="/admin/doc-approving" component={DocumentApproving} />
                    <Route exact path="/admin/post-management" component={PostManagement} />
                    <Route exact path="/admin/document-management" component={DocumentManagement} />
                    <Route exact path="/admin/user-management" component={UserManagement} />
                    <Route exact path="/admin/page-notification" component={NotificationManagement} />
                    <Route exact path="/admin/category-management" component={CategoryManagement} />
                    <Route exact path="/admin/activity-management" component={ActivityManagement} />
                    <Route exact path="/admin/user-role-management" component={UserRoleManagement} />
                    <Route exact path="/admin/user-management/:id" component={AdminLayout} />
                    <Route exact path="/admin/statistic" component={Statistic} />
                    <Route exact path="/admin/courses-management" component={CoursesManagement} />
                </Switch>
                <div className="App"></div>
                <Footer />
            </Router >
        </div >
    );
}

export default App;




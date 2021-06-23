import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "pages/common/Home/Home";
import PostDetail from "pages/common/PostDetail/PostDetail";
import DocumentDetail from "pages/common/DocumentDetail/DocumentDetail";
import Header from "components/common/Header/Header";
import Footer from "components/common/Footer/Footer";
import AdminLayout from 'layouts/AdminSidebar';
import SearchPostByTag from "pages/common/SearchResult/SearchPostByTag";
import ProfilePost from "pages/user/AccountInformation/Profile_Post";
import ProfileDocument from "pages/user/AccountInformation/Profile_Document";

import MyDocuments from "pages/user/MyDocuments/MyDocuments";
import MyPosts from "pages/user/MyPosts/MyPosts";
import SearchTag from "pages/common/SearchResult/SearchTag";
import SearchPost from "pages/common/SearchResult/SearchPost";
import SearchDocument from "pages/common/SearchResult/SearchDocument";
import CoursesList from "pages/common/CoursesList/CoursesList"
import CourseDetail from "pages/common/CourseDetail/CourseDetail"
import PostsList from 'pages/common/PostsList/PostsList';
import PostApproving from 'pages/management/PostManagement/PostApproving';
import NotificationManagement from 'pages/management/NotificationManagement/NotificationManagement';
import CategoryManagement from 'pages/management/NotificationManagement/NotificationManagement';
import Statistic from 'pages/management/Statistic/Statistic';
import PostManagement from 'pages/management/PostManagement/PostManagement';
import SearchCourses from 'pages/common/SearchResult/SearchCourses';
import UploadDocument from 'pages/user/UploadDocument/UploadDocument';
import CreatePost from 'pages/user/CreatePost/CreatePost';
import ActivityManagement from 'pages/management/ActivityManagement/ActivityManagement';
import CoursesManagement from 'pages/management/CoursesManagement/CoursesManagement';
import MyNotification from 'pages/user/MyActivities/MyActivities';
import PostReportManagement from 'pages/management/PostManagement/PostReportManagement';
import SavedPosts from 'pages/user/MyPosts/SavedPosts';

import DocumentManagement from 'pages/management/DocumentManagement/DocumentManagement';
import DocumentReportManagement from "pages/management/DocumentManagement/DocumentReportManagement";
import DocumentsList from 'pages/common/DocumentsList/DocumentsList';
import DocumentApproving from 'pages/management/DocumentManagement/DocumentApproving';
import SearchDocumentByTag from 'pages/common/SearchResult/SearchDocumentByTag';
import AccountManagement from "pages/user/AccountInformation/AccountManagement";
import PostCommentReport from 'pages/management/PostManagement/PostCommentReport';
import Exercise from 'pages/common/Exercise/Exercise';
import ExerciseQuestions from 'pages/common/Exercise/ExerciseQuestions';
import ExerciseReportManagement from 'pages/management/ExerciseManagement/ExerciseReportManagement';

// modal
import ModalManager from 'components/common/Modal/ModalManager';
import ModalBLManager from 'components/common/Modal/ModalBL/ModalBLManager'
import ModalBigManager from 'components/common/Modal/ModalBigManager';
import CommentModalManager from 'components/common/Modal/CommentModal/CommentModalManager';
import CommentModal from 'components/common/Modal/CommentModal/CommentModal';

import RequireLoginRoute from 'components/base_components/RequireLoginRoute';
import { Access, Post } from "authentication/permission.config";

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
                        <Route exact path="/course-content/:id" component={CourseDetail} />
                        <Route path="/search/posts" exact component={SearchPost} />
                        <Route path="/search/documents" exact component={SearchDocument} />
                        <Route path="/search/tags" exact component={SearchTag} />
                        <Route path="/search/courses" exact component={SearchCourses} />
                        <Route path="/search/courses" exact component={SearchCourses} />
                        <Route path="/courses/exercise/:id" exact component={Exercise} />
                        <Route path="/courses/exercise-content/:id" exact component={ExerciseQuestions} />



                        {/* Search Tag */}
                        <Route path="/tags/posts/" exact component={SearchPostByTag} />
                        <Route path="/tags/documents/" exact component={SearchDocumentByTag} />

                        {/* user layout */}
                        <Route exact path="/user/profile/:id" component={ProfilePost} />
                        <Route exact path="/user/posts/:id" component={ProfilePost} />
                        <Route exact path="/user/documents/:id" component={ProfileDocument} />
                        <Route exact path="/user/account-management" component={AccountManagement} />

                        <Route exact path="/user/my-documents" component={MyDocuments} />
                        <Route exact path="/user/my-posts" component={MyPosts} />
                        <Route exact path="/user/saved-posts" component={SavedPosts} />
                        <RequireLoginRoute exact path="/create-post" component={CreatePost} permissions={[Post.POST_PENDING_SELF_CREATE]} />
                        <Route exact path="/user/notification" component={MyNotification} />
                        <Route exact path="/upload-document" component={UploadDocument} />

                        {/* for admin */}
                        <RequireLoginRoute exact path="/admin" component={PostManagement} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/post-management" component={PostManagement} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/post-management/report" component={PostReportManagement} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/post-management/approval" component={PostApproving} permissions={[Access.Admin]} />

                        <Route exact path="/admin/document-management/approval" component={DocumentApproving} />
                        <Route exact path="/admin/document-management" component={DocumentManagement} />
                        <Route exact path="/admin/document-management/report" component={DocumentReportManagement} />

                        <Route exact path="/admin/page-notification" component={NotificationManagement} />
                        <Route exact path="/admin/category-management" component={CategoryManagement} />
                        <Route exact path="/admin/activity-management" component={ActivityManagement} />
                        <Route exact path="/admin/user-management/:id" component={AdminLayout} />
                        <Route exact path="/admin/statistic" component={Statistic} />
                        <Route exact path="/admin/courses-management" component={CoursesManagement} />
                        <Route exact path="/admin/courses-management/report" component={ExerciseReportManagement} />
                        <Route exact path="/admin/post-management/comment-report" component={PostCommentReport} />

                        {/* verify email url */}
                        {/* <Route exact path="/demo-detail-loader" component={DocPostDetailLoader} /> */}
                        <Route exact path="/demo-comment" component={CommentModal} />

                    </Switch>
                    <Footer />
                </div>
                <Header />
                <div>
                </div>
                <div>
                    <CommentModalManager />
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




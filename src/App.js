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
import SearchExercises from 'pages/common/SearchResult/SearchExercises';
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
import DocumentCommentReport from 'pages/management/DocumentManagement/DocumentCommentReport';

import Exercise from 'pages/common/Exercise/Exercise';
import ExerciseQuestions from 'pages/common/Exercise/ExerciseQuestions';
import ExerciseReportManagement from 'pages/management/ExerciseManagement/ExerciseReportManagement';
import CreateExercise from 'pages/user/CreateExercise/CreateExercise';
import EditExerciseQuestions from 'pages/user/CreateExercise/EditExerciseQuestions';
import ExerciseCommentReport from 'pages/management/ExerciseManagement/ExerciseCommentReport';
import SearchExercisesByTag from 'pages/common/SearchResult/SearchExercisesByTag';

// modal
import ModalManager from 'components/common/Modal/ModalManager';
import ModalBLManager from 'components/common/Modal/ModalBL/ModalBLManager'
import BigModalManager from 'components/common/Modal/BigModalManager';
import CommentModalManager from 'components/common/Modal/CommentModal/CommentModalManager';
import DocumentsSubjectList from 'pages/common/DocumentsList/DocumentsSubjectList';

//authen
import RequireLoginRoute from 'components/base_components/RequireLoginRoute';
import { Access, Post, Document } from "authentication/permission.config";

const App = () => {
    return (
        <div style={{ minWidth: "320px", width: "100%", background: "white" }}>
            <Router>
                <div id="header" style={{ height: "65px" }}></div>

                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />

                        <Route exact path="/posts" component={PostsList} />
                        <Route exact path="/documents" component={DocumentsSubjectList} />
                        <Route exact path="/subject-documents/:id" component={DocumentsList} />
                        <Route exact path="/post-content/:id" component={PostDetail} />
                        <Route exact path="/document-content/:id" component={DocumentDetail} />
                        <Route exact path="/courses" component={CoursesList} />
                        <Route exact path="/course-content/:id" component={CourseDetail} />
                        <Route path="/search/posts" exact component={SearchPost} />
                        <Route path="/search/documents" exact component={SearchDocument} />
                        <Route path="/search/tags" exact component={SearchTag} />
                        <Route path="/search/exercises" exact component={SearchExercises} />
                        <Route path="/courses/exercise/:id" exact component={Exercise} />
                        <Route path="/courses/exercise-content/:id" exact component={ExerciseQuestions} />

                        {/* Search Tag */}
                        <Route path="/tags/posts/" exact component={SearchPostByTag} />
                        <Route path="/tags/documents/" exact component={SearchDocumentByTag} />
                        <Route path="/tags/exercises/" exact component={SearchExercisesByTag} />

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
                        <RequireLoginRoute exact path="/upload-document" component={UploadDocument} permissions={[Document.DOC_PENDING_SELF_CREATE, Document.DOC_PENDING_SELF_UPLOAD]} />
                        <RequireLoginRoute exact path="/create-exercise" component={CreateExercise} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/edit-exercises/questions/:id" component={EditExerciseQuestions} permissions={[Access.Admin]} />
                        {/* <RequireLoginRoute exact path="/edit-exercises/questions:id" component={EditExerciseQuestions} permissions={[Access.Admin]} /> */}

                        {/* for admin */}
                        <RequireLoginRoute exact path="/admin" component={PostManagement} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/post-management" component={PostManagement} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/post-management/report" component={PostReportManagement} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/post-management/approval" component={PostApproving} permissions={[Access.Admin]} />

                        <RequireLoginRoute exact path="/admin/document-management/approval" component={DocumentApproving} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/document-management" component={DocumentManagement} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/document-management/report" component={DocumentReportManagement} permissions={[Access.Admin]} />

                        <RequireLoginRoute exact path="/admin/page-notification" component={NotificationManagement} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/category-management" component={CategoryManagement} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/activity-management" component={ActivityManagement} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/user-management/:id" component={AdminLayout} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/statistic" component={Statistic} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/courses-management" component={CoursesManagement} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/courses-management/report" component={ExerciseReportManagement} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/post-management/comment-report" component={PostCommentReport} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/document-management/comment-report" component={DocumentCommentReport} permissions={[Access.Admin]} />
                        <RequireLoginRoute exact path="/admin/courses-management/comment-report" component={ExerciseCommentReport} permissions={[Access.Admin]} />

                    </Switch>
                    <Footer />
                </div>
                <Header />
                <div>
                    <CommentModalManager />
                    <BigModalManager />
                    <ModalManager />
                    <ModalBLManager />

                </div>
                <div className="App"></div>
            </Router >
        </div >
    );
}

export default App;




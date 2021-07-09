import { combineReducers } from "redux";
import HomeReducer from "redux/reducers/homeReducer"
import DocumentReducer from "redux/reducers/documentReducer"
import PostReducer from "redux/reducers/postReducer"
import UserReducer from "redux/reducers/userReducer"
import PostCategoryReducer from "redux/reducers/postCategoryReducer"
import DocumentCategoryReducer from "redux/reducers/documentCategoryReducer"
import TagReducer from "redux/reducers/tagReducer"
import CourseReducer from "redux/reducers/courseReducer"
import CourseFacultyReducer from "redux/reducers/courseFacultyReducer"
import ExerciseCategoryReducer from "redux/reducers/exerciseCategoryReducer"
import CommonReducer from "redux/reducers/commonReducer"
import ModalReducer from "redux/reducers/modalReducer"
import DocumentSubjectReducer from "redux/reducers/documentSubjectReducer"
import AuthenticationReducer from "redux/reducers/authReducer"
import RoleReducer from "redux/reducers/roleReducer"
import postCommentReducer from "redux/reducers/postCommentReducer"
import documentCommentReducer from "redux/reducers/documentCommentReducer"
import exerciseCommentReducer from "redux/reducers/exerciseCommentReducer"

import ReportReducer from "redux/reducers/reportReducer"

var RootReducer = combineReducers({
    home: HomeReducer,
    user: UserReducer,
    post: PostReducer,
    document: DocumentReducer,
    postCategory: PostCategoryReducer,
    documentCategory: DocumentCategoryReducer,
    documentSubject: DocumentSubjectReducer,
    tag: TagReducer,
    course: CourseReducer,
    courseFaculty: CourseFacultyReducer,
    exerciseCategory: ExerciseCategoryReducer,
    common: CommonReducer,
    modal: ModalReducer,
    auth: AuthenticationReducer,
    role: RoleReducer,
    postComment: postCommentReducer,
    documentComment: documentCommentReducer,
    exerciseComment: exerciseCommentReducer,
    report: ReportReducer
});

export default RootReducer;
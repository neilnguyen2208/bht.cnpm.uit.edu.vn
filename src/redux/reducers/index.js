import { combineReducers } from "redux";
import HomeReducer from "redux/reducers/homeReducer"
import DocumentReducer from "redux/reducers/documentReducer"
import PostReducer from "redux/reducers/postReducer"
import UserReducer from "redux/reducers/userReducer"
import PostCategoryReducer from "redux/reducers/postCategoryReducer"
import DocumentCategoryReducer from "redux/reducers/documentCategoryReducer"
import TagReducer from "redux/reducers/tagReducer"
import CourseReducer from "redux/reducers/courseReducer"
import CourseCategoryReducer from "redux/reducers/courseCategoryReducer"
import CommonReducer from "redux/reducers/commonReducer"
import ModalReducer from "redux/reducers/modalReducer"
import DocumentSubjectReducer from "redux/reducers/documentSubjectReducer"
import AuthenticationReducer from "redux/reducers/authReducer"
import RoleReducer from "redux/reducers/roleReducer"
import CommentReducer from "redux/reducers/commentReducer"
import ReportReducer from "redux/reducers/reportReducer"

var RootReducer = combineReducers({
    home: HomeReducer,
    user: UserReducer,
    post: PostReducer,
    document: DocumentReducer,
    post_category: PostCategoryReducer,
    document_category: DocumentCategoryReducer,
    document_subject: DocumentSubjectReducer,
    tag: TagReducer,
    course: CourseReducer,
    course_category: CourseCategoryReducer,
    common: CommonReducer,
    modal: ModalReducer,
    auth: AuthenticationReducer,
    role: RoleReducer,
    comment: CommentReducer,
    report: ReportReducer
});

export default RootReducer;
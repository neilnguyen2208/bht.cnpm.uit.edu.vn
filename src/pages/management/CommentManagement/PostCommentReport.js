
import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';
//import for redux
import { getReportedPostComments } from 'redux/services/commentServices'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import AdminSidebar from 'layouts/AdminSidebar'
// import PostManagementNavbar from './PostManagementNavbar'
import PostCommentReportReactionbar from 'components/comment/PostReportedCommentReactionbar'
import store from 'redux/store/index'
import { closeModal, openBLModal } from 'redux/services/modalServices.js';
import { post_ResolveAPostCommentReset } from 'redux/actions/commentAction';
import PostReportedCommentInfo from 'components/comment/PostReportedCommentInfo'

class PostCommentReport extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.queryParamObject = {
            page: 1
        }
        setQueryParam(this.queryParamObject);

        this.searchParamObject = {
            page: getQueryParamByName('page')
        }

        this.props.getReportedPostComments(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam({ page: pageNumber })
        this.searchParamObject = {
            ...this.searchParamObject,
            page: getQueryParamByName('page'),
        }
        this.props.getReportedPostComments(this.searchParamObject);
        this.setState({});
    }

    reloadList = () => {
        //neu con 1 item thi phai goi ve trang truoc
        if (this.props.reportedCommentsList.length === 1 && this.searchParamObject.page > 1)
            this.searchParamObject = {
                ...this.searchParamObject,
                paginator: this.searchParamObject.page, //vl chua => do trong db luu page tu 0 con trong fe luu tu 1
            }
        setQueryParam(this.queryParamObject);

        this.props.getReportedPostComments(this.searchParamObject);
    }

    render() {

        if (this.props.isHaveResolved) {
            closeModal();
            closeModal();
            this.reloadList();
            store.dispatch(post_ResolveAPostCommentReset());
            openBLModal({ type: "success", text: "Xử lý bình luận thành công!" });
        }
        if (!this.props.isListLoading && this.props.reportedCommentsList) {
            this.reportedCommentsList = this.props.reportedCommentsList.map((reportedComment) => {
                return <div className="item-container">

                    <PostReportedCommentInfo
                        id={reportedComment.id}
                        commentId={reportedComment.commentID}
                        postId={reportedComment.postID}
                        postTitle={reportedComment.postTitle}
                        content={reportedComment.content}
                        reporters={reportedComment.reporters}
                        reportReasons={reportedComment.reportReasons}
                        feedbacks={reportedComment.feedbacks}
                        reportTime={reportedComment.reportTime}
                        resolvedTime={reportedComment.resolvedTime}
                        resolvedNote={reportedComment.resolvedTime}
                        resolvedBy={reportedComment.resolvedTime}
                        actionTaken={reportedComment.actionTaken}
                        authorAvatarURL={"https://ziclife.com/wp-content/uploads/2020/08/cute-profile-picture-32.jpg"}
                        authorID={""}
                        authorDisplayName={"Nguyễn Văn Đông"}

                    />

                    <PostCommentReportReactionbar id={reportedComment.id} />
                </div>
            })
        }

        return (
            <div className="left-sidebar-layout" >
                <AdminSidebar />
                <div className="content-layout">
                    <Titlebar title="QUẢN LÝ BÌNH LUẬN" />
                    <div className="content-container">
                        {/* <PostManagementNavbar /> */}

                        <div />
                        {!this.props.isListLoading ?
                            <div>
                                <div className="filter-container">
                                    <div className="sum-item-label mg-top-10px">
                                        <div className="mg-right-5px">Tổng số:</div>
                                        <div> {this.props.totalElements}</div>
                                    </div>
                                </div>
                                <>{this.reportedCommentsList}</>
                                <Paginator config={{
                                    changePage: (pageNumber) => this.onPageChange(pageNumber),
                                    pageCount: this.props.totalPages,
                                    currentPage: getQueryParamByName('page')
                                }}
                                />
                            </div>
                            :
                            <div>
                                {DocPostSummaryLoader()}
                                {DocPostSummaryLoader()}
                                {DocPostSummaryLoader()}
                            </div>
                        }
                    </div>
                </div >
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state.comment.reportedPostComments)
    return {
        //pending posts list
        reportedCommentsList: state.comment.reportedPostComments.data,
        isListLoading: state.comment.reportedPostComments.isLoading,
        totalPages: state.comment.reportedPostComments.totalPages,
        totalElements: state.comment.reportedPostComments.totalElements,

        //handle action resolve a report
        isHaveResolved: state.comment.isHaveResolved
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getReportedPostComments
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCommentReport));

import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType, resolveStateOptions } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';
//import for redux
import { getReportedExerciseComments } from 'redux/services/exerciseCommentServices'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import AdminSidebar from 'layouts/AdminSidebar'
// import ExerciseManagementNavbar from './ExerciseManagementNavbar'
import ReportedCommentReactionbar from 'components/course/ReportedCommentReactionbar'
import store from 'redux/store/index'
import { closeModal, openBLModal } from 'redux/services/modalServices.js';
import { post_ResolveAnExerciseCommentReset } from 'redux/actions/exerciseCommentAction';
import ReportedCommentInfo from 'components/course/ReportedCommentInfo'
import ExerciseManagementNavBar from './ExerciseManagementNavbar';
import Combobox from 'components/common/Combobox/Combobox';

class ExerciseCommentReport extends React.Component {
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

        this.props.getReportedExerciseComments(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam({ page: pageNumber })
        this.searchParamObject = {
            ...this.searchParamObject,
            page: getQueryParamByName('page'),
        }
        this.props.getReportedExerciseComments(this.searchParamObject);
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

        this.props.getReportedExerciseComments(this.searchParamObject);
    }

    onStateOptionChange = (selectedOption) => {
        setQueryParam({
            ...this.queryParamObject, "page": 1
        });

        //
        switch (selectedOption.id) {
            case 2:
                this.searchParamObject = {
                    ...this.searchParamObject,
                    isResolvedReport: false
                }
                break;
            case 3:
                this.searchParamObject = {
                    ...this.searchParamObject,
                    isResolvedReport: true
                }
                break;
            default:
                this.searchParamObject = {
                    page: "1"
                }
        }
        this.props.getReportedExerciseComments(this.searchParamObject);
        this.setState({});
    }

    render() {

        if (this.props.isHaveResolved) {
            closeModal();
            closeModal();
            this.reloadList();
            store.dispatch(post_ResolveAnExerciseCommentReset());
            openBLModal({ type: "success", text: "Xử lý bình luận thành công!" });
        }
        if (!this.props.isListLoading && this.props.reportedCommentsList) {
            this.reportedCommentsList = this.props.reportedCommentsList.map((reportedComment) => {
                return <div className="item-container">

                    <ReportedCommentInfo
                        id={reportedComment.id}
                        commentId={reportedComment.commentID}
                        postID={reportedComment.postID}
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
                        authorAvatarURL={reportedComment.author.avatarURL}
                        authorID={reportedComment.author.id}
                        authorDisplayName={reportedComment.author.displayName}

                    />

                    <ReportedCommentReactionbar id={reportedComment.id} />
                </div>
            })
        }

        return (
            <div className="left-sidebar-layout" >
                <AdminSidebar />
                <div className="content-layout">
                    <Titlebar title="QUẢN LÝ BÀI TẬP" />
                    <div className="content-container">
                        <ExerciseManagementNavBar />

                        <div />
                        <div className="filter-container j-c-space-between">
                            {!this.props.isListLoading ?
                                <div className="sum-item-label">
                                    <div className="mg-right-5px">Tổng số:</div>
                                    <div> {this.props.totalElements}</div>
                                </div> :
                                <div className="sum-item-label mg-top-10px">
                                    <div className="mg-right-5px">Tổng số:</div>
                                    <div> </div>
                                </div>
                            }
                            <div className="d-flex">
                                <div className="filter-label t-a-right mg-right-5px">Trạng thái xử lý:</div>
                                <div className="mg-left-5px">
                                    <Combobox
                                        options={resolveStateOptions}
                                        placeHolder="Tất cả"
                                        onOptionChanged={(selectedOption) => this.onStateOptionChange(selectedOption)}
                                        comboboxId="pcrmrsf-combobox" //post comment report management resolve state filter 
                                    ></Combobox>
                                </div>
                            </div>
                        </div>
                        {!this.props.isListLoading ?
                            <div>
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
    return {
        //pending posts list
        reportedCommentsList: state.exerciseComment.reportedExerciseComments.data,
        isListLoading: state.exerciseComment.reportedExerciseComments.isLoading,
        totalPages: state.exerciseComment.reportedExerciseComments.totalPages,
        totalElements: state.exerciseComment.reportedExerciseComments.totalElements,

        //handle action resolve a report
        isHaveResolved: state.exerciseComment.isHaveResolved
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getReportedExerciseComments
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExerciseCommentReport));
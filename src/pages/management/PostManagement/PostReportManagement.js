
import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';
//import for redux
import { getReportedPosts } from "redux/services/postServices";
import ReportInfo from 'components/post/ReportInfo'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import AdminSidebar from 'layouts/AdminSidebar'
import PostManagementNavbar from './PostManagementNavbar'
import ReportReactionbar from 'components/post/ReportReactionbar'
import store from 'redux/store/index'
import { post_ResolveAPostReset } from 'redux/actions/postAction'
import { closeModal, openBLModal } from 'redux/services/modalServices.js';
import Combobox from 'components/common/Combobox/Combobox';
import { resolveStateOptions } from 'constants.js'

class PostReportManagement extends React.Component {
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

        this.props.getReportedPosts(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam({ page: pageNumber })
        this.searchParamObject = {
            ...this.searchParamObject,
            page: getQueryParamByName('page'),
        }
        this.props.getReportedPosts(this.searchParamObject);
        this.setState({});
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
        this.props.getReportedPosts(this.searchParamObject);
        this.setState({});
    }

    reloadList = () => {
        //neu con 1 item thi phai goi ve trang truoc
        if (this.props.postsList.length === 1 && this.searchParamObject.page > 1)
            this.searchParamObject = {
                ...this.searchParamObject,
                paginator: this.searchParamObject.page, //vl chua => do trong db luu page tu 0 con trong fe luu tu 1
            }
        setQueryParam(this.queryParamObject);

        this.props.getReportedPosts(this.searchParamObject);
    }

    render() {

        if (this.props.isHaveResolved) {
            closeModal();
            closeModal();
            this.reloadList();
            store.dispatch(post_ResolveAPostReset());
            openBLModal({ type: "success", text: "Xử lý bài viết thành công!" });
        }
        if (!this.props.isListLoading && this.props.postsList) {
            this.postsList = this.props.postsList.map((item) => (
                <div className="item-container">
                    <ReportInfo
                        postID={item.id}
                        reporters={item.reporters}
                        author = {item.author}
                        reportReasons={item.reportReasons}
                        title={item.title}
                        content={item.content}
                        imageURL={item.postImageURL}
                        reportTime={item.reportTime}
                        resolvedTime={item.resolvedTime}
                        resolvedNote={item.resolvedNote}
                        actionTaken={item.actionTaken}
                        feedbacks={item.feedbacks}
                    />

                    <ReportReactionbar type={itemType.mySelf}
                        id={item.id} //report id, not post id
                    />
                </div>
            ))
        }

        return (
            <div className="left-sidebar-layout">
                <AdminSidebar />
                <div className="content-layout">
                    <Titlebar title="QUẢN LÝ BÀI VIẾT" />
                    <div className="content-container">
                        <PostManagementNavbar />

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
                                        comboboxId="prmrsf-combobox" //post report management resolve state filter 
                                    ></Combobox>
                                </div>
                            </div>
                        </div>

                        {!this.props.isListLoading ?
                            <>
                                <>{this.postsList}</>
                                <Paginator config={{
                                    changePage: (pageNumber) => this.onPageChange(pageNumber),
                                    pageCount: this.props.totalPages,
                                    currentPage: getQueryParamByName('page')
                                }}
                                />
                            </>
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
        postsList: state.post.reportedPosts.data,
        isListLoading: state.post.reportedPosts.isLoading,
        totalPages: state.post.reportedPosts.totalPages,
        totalElements: state.post.reportedPosts.totalElements,

        //handle action resolve a report
        isHaveResolved: state.post.isHaveResolved

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getReportedPosts
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostReportManagement));

import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';
//import for redux
import { getReportedPosts } from "redux/services/postServices";
import ReportInfo from 'components/post/ReportInfo'
import SummaryInfo from 'components/post/SummaryInfo'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import AdminSidebar from 'layouts/AdminSidebar'
import PostManagementNavbar from './PostManagementNavbar'
import ReportReactionbar from 'components/post/ReportReactionbar'

class PostReportManagement extends Component {
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

        this.searchParamObject = {
            ...this.searchParamObject,
            paginator: getQueryParamByName('page'),
        }
        this.props.getReportedPosts(this.searchParamObject);
        this.setState({});
    }

    //combobox
    onCategoryOptionChange = (selectedOption) => {
        this.searchParamObject = {
            ...this.searchParamObject,
            "category": selectedOption.id
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

        if (!this.props.isListLoading && this.props.postsList) {
            this.postsList = this.props.postsList.map((item) => (
                <div className="item-container">
                    <ReportInfo
                        id={item.id}
                        reporterName={item.reporter.name}
                        reporterID={item.reporter.id}
                        reporterAvatarURL={item.reporter.id}
                        reason={item.reason}

                        title={item.title}
                        content={item.content}
                        imageURL={item.postImageURL}

                        reportTime={item.reportTime}
                        resolvedTime={item.resolveTime}
                        resolvedNote={item.resolvedNote}
                        actionTaken={item.actionTaken}
                    />

                    <ReportReactionbar type={itemType.mySelf}
                        id={item.id}
                        reloadList={() => this.reloadList()} />
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
                        {!this.props.isListLoading ?
                            <>
                                <div className="filter-label d-flex mg-bottom-10px">
                                    <div className="mg-right-5px">Tổng số:</div>
                                    <div> {this.props.totalElements}</div>
                                </div>
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
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getReportedPosts
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostReportManagement));
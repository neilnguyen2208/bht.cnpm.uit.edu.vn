
import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';
//import for redux
import { getReportedDocuments } from "redux/services/documentServices";
// import ReportInfo from 'components/document/ReportInfo'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import AdminSidebar from 'layouts/AdminSidebar'
import DocumentManagementNavbar from './DocumentManagementNavbar'
// import ReportReactionbar from 'components/document/ReportReactionbar'
import store from 'redux/store/index'
// import { document_ResolveADocumentReset } from 'redux/actions/documentAction'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'
import { closeModal, openBLModal } from 'redux/actions/modalAction.js';

class DocumentReportManagement extends Component {
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

        //this.props.getReportedDocuments(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam({ page: pageNumber })
        this.searchParamObject = {
            ...this.searchParamObject,
            page: getQueryParamByName('page'),
        }
        //this.props.getReportedDocuments(this.searchParamObject);
        this.setState({});
    }

    reloadList = () => {
        //neu con 1 item thi phai goi ve trang truoc
        if (this.props.documentsList.length === 1 && this.searchParamObject.page > 1)
            this.searchParamObject = {
                ...this.searchParamObject,
                paginator: this.searchParamObject.page, //vl chua => do trong db luu page tu 0 con trong fe luu tu 1
            }
        setQueryParam(this.queryParamObject);

        //this.props.getReportedDocuments(this.searchParamObject);
    }

    render() {

        if (this.props.isHaveResolved) {
            store.dispatch(closeModal());
            store.dispatch(closeModal());
            this.reloadList();
            // store.dispatch(document_ResolveADocumentReset());
            store.dispatch(openBLModal({ icon: done_icon, text: "Xử lý bài viết thành công!" }))
        }
        if (!this.props.isListLoading && this.props.documentsList) {
            this.documentsList = this.props.documentsList.map((item) => (
                <div className="item-container">
                    {/* <ReportInfo
                        id={item.id}
                        reporterName={item.reporter.name}
                        reporterID={item.reporter.id}
                        reporterAvatarURL={item.reporter.id}
                        reason={item.reason}

                        title={item.title}
                        content={item.content}
                        imageURL={item.documentImageURL}

                        reportTime={item.reportTime}
                        resolvedTime={item.resolvedTime}
                        resolvedNote={item.resolvedNote}
                        actionTaken={item.actionTaken}
                    />

                    <ReportReactionbar type={itemType.mySelf}
                        id={item.id} //report id, not document id
                    // reloadList={() => this.reloadList()}

                    /> */}
                </div>
            ))
        }

        return (
            <div className="left-sidebar-layout">
                <AdminSidebar />
                <div className="content-layout">
                    <Titlebar title="QUẢN LÝ BÀI VIẾT" />
                    <div className="content-container">
                        <DocumentManagementNavbar />

                        <div />
                        {!this.props.isListLoading ?
                            <>
                                <div className="filter-label d-flex mg-bottom-10px">
                                    <div className="mg-right-5px">Tổng số:</div>
                                    <div> {this.props.totalElements}</div>
                                </div>
                                <>{this.documentsList}</>
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
        //pending documents list
        documentsList: state.document.reportedDocuments.data,
        isListLoading: state.document.reportedDocuments.isLoading,
        totalPages: state.document.reportedDocuments.totalPages,
        totalElements: state.document.reportedDocuments.totalElements,

        //handle action resolve a report
        isHaveResolved: state.document.isHaveResolved

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getReportedDocuments
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentReportManagement));
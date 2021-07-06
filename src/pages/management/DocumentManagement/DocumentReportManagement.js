
import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';
//import for redux
import { getReportedDocuments } from "redux/services/documentServices";
import ReportInfo from 'components/document/ReportInfo'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import AdminSidebar from 'layouts/AdminSidebar'
import DocumentManagementNavbar from './DocumentManagementNavbar'
import ReportReactionbar from 'components/document/ReportReactionbar'
import store from 'redux/store/index'
import { post_ResolveADocumentReset } from 'redux/actions/documentAction'
import { closeModal, openBLModal } from 'redux/services/modalServices.js';

class DocumentReportManagement extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.queryParamObject = {
            page: 1
        }
        setQueryParam(this.queryParamObject);

        this.searchParamObject = {
            paginator: getQueryParamByName('page')
        }

        this.props.getReportedDocuments(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam({ page: pageNumber })
        this.searchParamObject = {
            ...this.searchParamObject,
            page: getQueryParamByName('page'),
        }
        this.props.getReportedDocuments(this.searchParamObject);
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

        this.props.getReportedDocuments(this.searchParamObject);
    }

    render() {

        if (this.props.isHaveResolved) {
            closeModal();
            closeModal();
            this.reloadList();
            store.dispatch(post_ResolveADocumentReset());
            openBLModal({ type: "success", text: "Xử lý tài liệu thành công!" });
        }
        if (!this.props.isListLoading && this.props.documentsList) {
            this.documentsList = this.props.documentsList.map((item) => (
                <div className="item-container">
                    <ReportInfo
                        documentID={item.id}
                        // reporterName={item.reporter.name}
                        // reporterID={item.reporter.id}
                        // reporterAvatarURL={item.reporter.avatarURL}
                        reason={item.reason}

                        title={item.title}
                        content={item.content}
                        imageURL={item.documentImageURL}

                        reportTime={item.reportTime ? item.reportTime : "1994-11-05T13:15:30Z "}
                        
                        resolvedTime={item.resolvedTime}
                        resolvedNote={item.resolvedNote}
                        actionTaken={item.actionTaken}
                    />

                    <ReportReactionbar type={itemType.mySelf}
                        documentID={item.id} //report id, not document id
                        reloadList={() => this.reloadList()}

                    />
                </div>
            ))
        }

        return (
            <div className="left-sidebar-layout">
                <AdminSidebar />
                <div className="content-layout">
                    <Titlebar title="QUẢN LÝ TÀI LIỆU" />
                    <div className="content-container">
                        <DocumentManagementNavbar />

                        <div />
                        {!this.props.isListLoading ?
                            <>
                                <div className="sum-item-label mg-top-10px">
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
    getReportedDocuments, post_ResolveADocumentReset
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentReportManagement));
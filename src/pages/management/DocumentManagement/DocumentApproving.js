
import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';
import { NavLink } from 'react-router-dom'
//import for redux
import { getPendingDocuments } from "redux/services/documentServices";
import { getDocumentCategoriesHaveAll } from "redux/services/documentCategoryServices";
// import RequestInfo from 'components/document/RequestInfo'
// import SummaryInfo from 'components/document/SummaryInfo'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import AdminSidebar from 'layouts/AdminSidebar'
import DocumentManagementNavbar from './DocumentManagementNavbar'
// import RequestReactionbar from 'components/document/RequestReactionbar'
// import { document_ApproveADocumentReset, delete_RejectADocumentReset, delete_RejectAndFeedbackADocumentReset } from 'redux/actions/documentAction'
import { openBLModal, closeModal } from 'redux/actions/modalAction'
import store from 'redux/store/index'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'

class DocumentApproving extends Component {
    constructor(props) {
        super();
    }

    componentDidMount() {

        this.queryParamObject = {
            category: 0,
            page: 1
        }

        this.props.getDocumentCategoriesHaveAll();
        setQueryParam(this.queryParamObject);

        this.searchParamObject = {
            "paginator": 1,
            "category": 0,
        }

        this.props.getPendingDocuments(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam({ ...this.queryParamObject, page: pageNumber });
        this.searchParamObject = {
            ...this.searchParamObject,
            paginator: getQueryParamByName('page'),
        }
        this.props.getPendingDocuments(this.searchParamObject);
        this.setState({});
    }

    //combobox
    onCategoryOptionChange = (selectedOption) => {
        setQueryParam({ ...this.queryParamObject, paginator: 1, "category": selectedOption.id });
        this.searchParamObject = {
            ...this.searchParamObject,
            "category": selectedOption.id,
            paginator: 1
        }
        this.props.getPendingDocuments(this.searchParamObject);
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

        this.props.getPendingDocuments(this.searchParamObject);
    }

    render() {
        //combobox
        if (!this.props.isCategoryLoading && this.props.documentCategories.length !== 0) {
            this.comboboxGroup =
                <div className="filter-container">
                    <div className="d-flex">
                        <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                        <div className="mg-left-5px">
                            <ComboBox
                                selectedOptionID={getQueryParamByName('category') ? getQueryParamByName('category') : 0}
                                options={this.props.documentCategories}
                                onOptionChanged={(selectedOption) => this.onCategoryOptionChange(selectedOption)}
                                id="document-approval-category-filter-combobox"
                            ></ComboBox>
                        </div>
                    </div>
                </div>
        }
        else this.comboboxGroup = <div className="filter-container">
            <div className="timeline-item d-flex">
                <div className="animated-background" style={{ width: "240px", height: "20px" }}></div>
            </div>
        </div>

        if (!this.props.isListLoading && this.props.documentsList) {
            this.documentsList = this.props.documentsList.map((item) => (
                <div className="item-container" key={item.id}>
                    {/* <RequestInfo
                        id={item.id}
                        authorName={item.authorName}
                        authorID={item.authorID}
                        categoryName={item.categoryName}
                        categoryID={item.categoryID}
                        requestedTime={"20:20:20"}
                        requestedDate={"1/3/2021"}
                        title={item.title}
                    />
                    <SummaryInfo
                        type={itemType.approval}
                        id={item.id}
                        authorName={item.authorName}
                        authorID={item.authorID}
                        publishDtm={item.publishDtm}
                        categoryName={item.categoryName}
                        categoryID={item.categoryID}
                        title={item.title}
                        // summary={item.summary}
                        imageURL={item.imageURL}
                        readingTime={item.readingTime}
                        approveState={item.documentState}
                        popUpMenuPrefix="papu"   //stand for document approval popup 
                        authorAvatarURL={item.authorAvatarURL}
                        //
                        reloadList={() => this.reloadList()}
                        content={item.content}
                    />
                    <RequestReactionbar
                        id={item.id}
                        reloadList={() => this.reloadList()} /> */}
                </div>
            ))
        }

        if (!this.props.isCategoryLoading && this.props.documentCategories.length !== 0) {

            this.filter = this.props.documentCategories;
        }


        // if (this.props.isHaveApproved) {
        //     store.dispatch(closeModal());
        //     store.dispatch(document_ApproveADocumentReset());
        //     store.dispatch(openBLModal({ icon: done_icon, text: "Duyệt bài viết thành công!" }))
        //     this.reloadList();
        // }

        // if (this.props.isHaveRejectedAndFeedbacked) {
        //     store.dispatch(closeModal());
        //     store.dispatch(delete_RejectAndFeedbackADocumentReset());
        //     store.dispatch(openBLModal({ icon: done_icon, text: "Từ chối bài viết thành công!" }))
        //     this.reloadList();
        // }

        // if (this.props.isHaveRejected) {
        //     store.dispatch(closeModal());
        //     store.dispatch(delete_RejectADocumentReset());
        //     store.dispatch(openBLModal({ icon: done_icon, text: "Từ chối bài viết thành công!" }))
        //     this.reloadList();
        // }
        return (
            <div className="left-sidebar-layout">
                <AdminSidebar />
                <div className="content-layout">
                    <Titlebar title="QUẢN LÝ BÀI VIẾT" />
                    <div className="content-container">
                        <DocumentManagementNavbar />

                        {this.comboboxGroup}
                        {!this.props.isListLoading && this.props.documentsList ?
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
        documentsList: state.document.pendingDocuments.data,
        isListLoading: state.document.pendingDocuments.isLoading,
        totalPages: state.document.pendingDocuments.totalPages,
        totalElements: state.document.pendingDocuments.totalElements,

        //category
        documentCategories: state.document_category.categories.searchData,
        isCategoryLoading: state.document_category.categories.isLoading,

        //handle 3 actions
        isHaveApproved: state.document.isHaveApproved,
        isHaveRejected: state.document.isHaveRejected,
        isHaveRejectedAndFeedbacked: state.document.isHaveRejectedAndFeedbacked,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPendingDocuments,
    getDocumentCategoriesHaveAll
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentApproving));
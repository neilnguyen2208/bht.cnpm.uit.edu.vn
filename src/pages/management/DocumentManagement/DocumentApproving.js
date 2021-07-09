
import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';

//import for redux
import { getPendingDocuments } from "redux/services/documentServices";
import { getDocumentCategoriesHaveAll } from "redux/services/documentCategoryServices";
import RequestInfo from 'components/document/RequestInfo'
import SummaryInfo from 'components/document/SummaryInfo'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import AdminSidebar from 'layouts/AdminSidebar'
import DocumentManagementNavbar from './DocumentManagementNavbar'
import { getSubjectsListHaveAll } from "redux/services/subjectServices";

import RequestReactionbar from 'components/document/RequestReactionbar'
import { post_ApproveADocumentReset, delete_RejectADocumentReset, post_RejectAndFeedbackADocumentReset } from 'redux/actions/documentAction'
import { openBLModal, closeModal } from 'redux/services/modalServices'
import store from 'redux/store/index'
import { delete_APostReset } from 'redux/actions/postAction';

class DocumentApproving extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {

        this.queryParamObject = {
            category: 0,
            page: 1
        }

        this.props.getDocumentCategoriesHaveAll();
        this.props.getSubjectsListHaveAll();

        setQueryParam(this.queryParamObject);

        this.searchParamObject = {
            "page": 1,
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

    reloadList = () => {
        //neu con 1 item thi phai goi ve trang truoc
        if (this.props.documentsList.length === 1 && this.searchParamObject.page > 1)
            this.searchParamObject = {
                ...this.searchParamObject,
                paginator: this.searchParamObject.page,
            }
        setQueryParam(this.queryParamObject);

        this.props.getPendingDocuments(this.searchParamObject);

    }

    onSubjectOptionChange = (selectedOption) => {
        setQueryParam({ ...this.queryParamObject, page: 1, "subject": selectedOption.id });
        this.searchParamObject = {
            ...this.searchParamObject,
            "subject": selectedOption.id,
            page: 1
        }
        this.props.getPendingDocuments(this.searchParamObject);
        this.setState({});
    }

    onCategoryOptionChange = (selectedOption) => {
        setQueryParam({
            ...this.queryParamObject, "page": 1, "category": selectedOption.id
        });
        this.searchParamObject = {
            ...this.searchParamObject,
            "category": selectedOption.id,
            page: 1
        }
        this.props.getPendingDocuments(this.searchParamObject);
        this.setState({});
    }

    onFileCollapseIconClick = (fileId) => {
        let ele = document.getElementById("dcm-file-preview-" + fileId);
        let btnEle = document.getElementById("dcm-file-preview-btn-" + fileId);
        if (ele.style.display === "none") {
            ele.style.display = "block";
            btnEle.innerText = "Ẩn xem trước";
        }
        else
            if (ele.style.display === "block") {
                ele.style.display = "none";
                btnEle.innerText = "Xem trước";
            }
    }

    render() {
        //combobox

        if (!this.props.isCategoryLoading && this.props.documentCategories.length !== 0) {
            this.categoryCombobox =
                <div >
                    <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                    <div className="mg-left-5px">
                        <ComboBox
                            selectedOptionID={getQueryParamByName('category') ? getQueryParamByName('category') : 0}
                            options={this.props.documentCategories}
                            onOptionChanged={(selectedOption) => this.onCategoryOptionChange(selectedOption)}
                            comboboxId="document-approval-category-filter-combobox"
                        ></ComboBox>
                    </div>
                </div>

        }
        else this.categoryCombobox = <div className="filter-container">
            <div className="timeline-item d-flex">
                <div className="animated-background" style={{ width: "240px", height: "20px" }}></div>
            </div>
        </div>

        if (!this.props.isSubjectLoading)
            this.subjectCombobox = < div >
                <div className="filter-label t-a-right mg-right-5px">Môn học: </div>
                <div className="mg-left-5px">
                    <ComboBox
                        options={this.props.subjects}
                        placeHolder="Tất cả"
                        onOptionChanged={(selectedOption) => this.onSubjectOptionChange(selectedOption)}
                        comboboxId="my-document-list-subject-filter-combobox"
                    ></ComboBox>
                </div>
            </div >
        else this.categoryCombobox = <div className="filter-container">
            <div className="timeline-item d-flex">
                <div className="animated-background" style={{ width: "240px", height: "20px" }}></div>
            </div>
        </div>

        if (!this.props.isListLoading && this.props.documentsList) {
            this.documentsList = this.props.documentsList.map((item) => (
                <div className="item-container" key={item.id}>
                    <RequestInfo
                        documentID={item.id}
                        authorDisplayName={item.authorDisplayName}
                        authorID={item.authorID}
                        categoryName={item.categoryName}
                        categoryID={item.categoryID}
                        submitDtm={item.submitDtm}
                        title={item.title}
                    />

                    <SummaryInfo
                        type={itemType.mySelf}
                        documentID={item.id}
                        authorDisplayName={item.authorDisplayName}
                        authorID={item.authorID}
                        publishDtm={item.publishDtm}
                        useAction
                        availableActions={["update", "delete"]}
                        categoryName={item.categoryName}
                        categoryID={item.categoryID}
                        subjectName={item.subjectName}
                        subjectID={item.documentSubjectID}
                        title={item.title}
                        description={item.description}
                        imageURL={item.imageURL}
                        readingTime={item.readingTime}
                        approveState={item.docState}
                        popUpMenuPrefix="dapu"   //stand for document approving popup 
                        authorAvatarURL={item.authorAvatarURL}
                        docFileUploadDTOs={item.docFileUploadDTOs}
                        reloadList={() => this.reloadList()}
                    />
                    {item.docFileUploadDTOs.map(file => {
                        return <div key={file.id}>
                            <div className="file-name-container">
                                <div className="d-flex" style={{ lineHeight: "24px" }}>
                                    <strong style={{ marginRight: "5px" }}>{file.fileName ? file.fileName : "Tài liệu giải thuật nâng cao.pdf"}</strong> -
                                    <div style={{ marginLeft: "5px" }}> {Math.round(file.fileSize / 1048576 * 100) / 100 + "MB"}
                                    </div>
                                </div>
                                <div>
                                    <button className="white-button mg-left-5px" id={"dcm-file-preview-btn-" + file.id} onClick={() => this.onFileCollapseIconClick(file.id)}>Xem trước</button>
                                </div>
                            </div>

                            <div style={{ display: "none" }} id={"dcm-file-preview-" + file.id}>
                                <div className="d-flex">
                                    <iframe className="if-container"
                                        src={file.previewURL}
                                        title={`doc-if-${file.id}`}
                                        sandbox="allow-scripts allow-same-origin"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    })}
                    <RequestReactionbar
                        documentID={item.id}
                    />
                </div>
            ))
        }

        if (!this.props.isCategoryLoading && this.props.documentCategories.length !== 0) {

            this.filter = this.props.documentCategories;
        }


        if (this.props.isHaveApproved) {
            closeModal();
            store.dispatch(post_ApproveADocumentReset());
            openBLModal({ type: "success", text: "Duyệt tài liệu thành công!" });
            this.reloadList();
        }

        if (this.props.isHaveRejectedAndFeedbacked) {
            closeModal();
            store.dispatch(post_RejectAndFeedbackADocumentReset());
            openBLModal({ type: "success", text: "Từ chối tài liệu thành công!" });
            this.reloadList();
        }

        if (this.props.isHaveRejected) {
            closeModal();
            store.dispatch(delete_RejectADocumentReset());
            openBLModal({ type: "success", text: "Từ chối tài liệu thành công!" });
            this.reloadList();
        }
        if (this.props.isHaveDeleted) {
            closeModal();
            this.reloadList();
            store.dispatch(delete_APostReset());
            openBLModal({ type: "success", text: "Từ chối tài liệu thành công!" });
            this.reloadList();
        }

        return (
            <div className="left-sidebar-layout">
                <AdminSidebar />
                <div className="content-layout">
                    <Titlebar title="QUẢN LÝ TÀI LIỆU" />
                    <div className="content-container">
                        <DocumentManagementNavbar />

                        <div className="filter-container j-c-space-between">
                            {this.categoryCombobox}
                            {this.subjectCombobox}
                        </div>

                        {!this.props.isListLoading && this.props.documentsList ?
                            <>
                                <div className="sum-item-label">
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

        //subject
        subjects: state.documentSubject.subjects.searchData,
        isSubjectLoading: state.documentSubject.subjects.isLoading,

        //category
        documentCategories: state.documentCategory.categories.searchData,
        isCategoryLoading: state.documentCategory.categories.isLoading,

        //handle 3 actions
        isHaveApproved: state.document.isHaveApproved,
        isHaveRejected: state.document.isHaveRejected,
        isHaveRejectedAndFeedbacked: state.document.isHaveRejectedAndFeedbacked,
        // isHaveDeleted:
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPendingDocuments,
    getDocumentCategoriesHaveAll,
    getSubjectsListHaveAll,

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentApproving));